import type { LogLevel, InlineConfig } from 'vite'
import { ViteDevServer, mergeConfig } from 'vite'
import { searchForWorkspaceRoot } from 'vite'
import { baseConfig } from '../index.js'
import type { Server } from 'net'
import type { FastifyInstance } from 'fastify/types/instance'
import fastify from 'fastify'
import { fastifySsrPlugin } from '../frameworks/vue/fastify-ssr-plugin.js'
import type { ServerOptions } from 'https'

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

  console.log(searchForWorkspaceRoot(appDir.pathname))
  config.server = {
    https: config.server?.https,
    hmr: {
      protocol: config.server?.https ? 'wss' : 'ws',
      port: 24678
    },
    port,
    // middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    middlewareMode: ssr ? 'ssr' : false,
    fs: {
      strict: false, // https://github.com/vitejs/vite/issues/8175
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        searchForWorkspaceRoot(appDir.pathname),
        searchForWorkspaceRoot(cliDir.pathname),
        appDir.pathname
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
  publicDir
}: {
  port?: number
  logLevel?: LogLevel
  // mode?: 'csr' | 'ssr' | 'fastify'
  ssr?: 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )

  appDir = appDir || getAppDir()
  const cliDir = getCliDir()

  const vite = await createVitrifyDevServer({
    port,
    logLevel,
    ssr,
    framework,
    host,
    appDir,
    publicDir
  })

  let setup
  let server: Server

  console.log(`Development mode: ${ssr ? ssr : 'csr'}`)
  if (ssr) {
    const entryUrl =
      ssr === 'fastify'
        ? new URL('src/vite/fastify/entry.ts', cliDir).pathname
        : new URL(`src/vite/${framework}/ssr/entry-server.ts`, cliDir).pathname

    ;({ setup } = await vite.ssrLoadModule(entryUrl))

    const app = fastify({
      logger: true,
      https: vite.config.server.https as ServerOptions
    })
    if (process.env) process.env.MODE = 'development'
    if (setup) {
      await setup({
        fastify: app
      })
    }
    if (ssr === 'ssr') {
      await app.register(fastifySsrPlugin, {
        appDir,
        mode: 'development'
      })
    }
    await app.listen({
      port: Number(port || 3000),
      host
    })
    server = app.server
  } else {
    server = (await vite.listen()).httpServer as Server
  }
  return { server, config: vite.config }
}
