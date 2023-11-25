import type { LogLevel, InlineConfig, ViteDevServer } from 'vite'
import { searchForWorkspaceRoot } from 'vite'
import { baseConfig } from '../index.js'
import type { Server } from 'net'
import fastify from 'fastify'
import type { FastifyServerOptions } from 'fastify'
import { fastifySsrPlugin } from '../frameworks/vue/fastify-ssr-plugin.js'
import type { OnRenderedHook, VitrifyConfig } from '../vitrify-config.js'
import isPortReachable from 'is-port-reachable'
import { exitLogs } from '../helpers/logger.js'
import { fileURLToPath } from 'url'
import type { FastifyInstance } from 'fastify'

declare module 'vite' {
  interface ViteDevServer {
    fastifyRestart: () => Promise<void>
  }
}

const getFirstOpenPort = async (portNumber: number): Promise<number> => {
  if (!(await isPortReachable(portNumber, { host: 'localhost' }))) {
    return portNumber
  }
  return getFirstOpenPort(portNumber + 1)
}

export async function createVitrifyDevServer({
  port = 3000,
  logLevel = 'info',
  // mode = 'csr',
  ssr,
  framework = 'vue',
  host,
  appDir,
  publicDir,
  base
}: {
  port?: number
  logLevel?: LogLevel
  // mode?: 'csr' | 'ssr' | 'fastify'
  ssr?: 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
  base?: string
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )

  const cliDir = getCliDir()

  if (!appDir) appDir = getAppDir()
  let config: InlineConfig = {}
  let ssrMode: 'server' | 'fastify' | undefined
  if (ssr === 'ssr') ssrMode = 'server'
  if (ssr === 'fastify') ssrMode = 'fastify'
  config = await baseConfig({
    framework,
    ssr: ssrMode,
    command: 'dev',
    mode: 'development',
    appDir,
    publicDir,
    base
  })

  config.logLevel = logLevel

  config.define = {
    ...config.define,
    __HOST__: `'${host}'`
  }

  const wsPort = await getFirstOpenPort(24678)
  if (config.server?.https) {
    exitLogs.push(
      `[warning] HTTPS mode enabled. Visit https://{hostname}:${wsPort} to enable a security exception for HMR.`
    )
  }
  config.server = {
    https: config.server?.https,
    hmr: {
      protocol: config.server?.https ? 'wss' : 'ws',
      port: wsPort
    },
    port,
    // middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    middlewareMode: ssr ? true : false,
    fs: {
      strict: false, // https://github.com/vitejs/vite/issues/8175
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        searchForWorkspaceRoot(fileURLToPath(appDir)),
        searchForWorkspaceRoot(fileURLToPath(cliDir)),
        fileURLToPath(appDir)
      ]
    },
    watch: {
      // During tests we edit the files too fast and sometimes chokidar
      // misses change events, so enforce polling for consistency
      usePolling: true,
      interval: 100
    },
    host
  }
  if (ssr) config.appType = 'custom'

  const vitrifyDevServer = await (
    await import('vite')
  ).createServer({
    configFile: false,
    ...config
  })

  return vitrifyDevServer
}

export async function createServer({
  port = 3000,
  logLevel = 'info',
  // mode = 'csr',
  ssr,
  framework = 'vue',
  host,
  appDir,
  publicDir,
  vite
}: {
  port?: number
  logLevel?: LogLevel
  // mode?: 'csr' | 'ssr' | 'fastify'
  ssr?: 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
  vite?: ViteDevServer
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )

  appDir = appDir || getAppDir()
  const cliDir = getCliDir()

  if (!vite) {
    vite = await createVitrifyDevServer({
      port,
      logLevel,
      ssr,
      framework,
      host,
      appDir,
      publicDir
    })
  }

  let setup
  let app: FastifyInstance | undefined
  let server: Server
  let onRendered: OnRenderedHook[]
  let vitrifyConfig: VitrifyConfig

  console.log(`Development mode: ${ssr ? ssr : 'csr'}`)
  if (ssr) {
    const entryUrl =
      ssr === 'fastify'
        ? fileURLToPath(new URL('src/vite/fastify/entry.ts', cliDir))
        : fileURLToPath(new URL(`src/vite/${framework}/ssr/app.ts`, cliDir))

    ;({ setup, onRendered, vitrifyConfig } = await vite.ssrLoadModule(entryUrl))
    app = fastify({
      logger: {
        level: process.env.DEBUG
          ? 'debug'
          : process.env.PINO_LOG_LEVEL || 'info'
      },
      https: vite.config.server.https,
      ...vitrifyConfig.vitrify?.ssr?.fastify
    } as FastifyServerOptions)
    if (process.env) process.env.MODE = 'development'
    if (setup) {
      await setup({
        fastify: app
      })
    }
    if (ssr === 'ssr') {
      await app.register(fastifySsrPlugin, {
        appDir,
        mode: 'development',
        onRendered,
        host
      })
    }
    await app.listen({
      port: Number(port || 3000),
      host
    })
    server = app.server

    if (ssr === 'fastify') {
      vite.fastifyRestart = async function () {
        if (vite && app) {
          await app.ready()
          await app.close()
          ;({ app, server, vite } = await createServer({
            ssr: 'fastify',
            host: host,
            appDir,
            publicDir,
            vite
          }))
        }
      }
    }
  } else {
    server = (await vite.listen()).httpServer as Server
  }
  return { app, server, config: vite.config, vite }
}
