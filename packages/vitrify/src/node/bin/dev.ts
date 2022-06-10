import type { LogLevel, InlineConfig } from 'vite'
import { ViteDevServer, mergeConfig } from 'vite'
import { searchForWorkspaceRoot } from 'vite'
import { baseConfig } from '../index.js'
import type { Server } from 'net'
import type { FastifyInstance } from 'fastify/types/instance'
import fastify from 'fastify'
import { fastifySsrPlugin } from '../frameworks/vue/fastify-ssr-plugin.js'

export async function createVitrifyDevServer({
  port = 3000,
  logLevel = 'info',
  mode = 'csr',
  framework = 'vue',
  host,
  appDir,
  publicDir
}: {
  port?: number
  logLevel?: LogLevel
  mode?: 'csr' | 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )

  const cliDir = getCliDir()

  if (!appDir) appDir = getAppDir()
  let config: InlineConfig = {}
  let ssrMode: 'server' | 'fastify' | undefined
  if (mode === 'ssr') ssrMode = 'server'
  if (mode === 'fastify') ssrMode = 'fastify'
  config = await baseConfig({
    framework,
    ssr: ssrMode,
    command: 'dev',
    mode: 'development',
    appDir,
    publicDir
  })

  config.logLevel = logLevel
  config.server = {
    https: config.server?.https,
    port,
    // middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    middlewareMode: mode !== 'csr' ? 'ssr' : false,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        ...(Array.isArray(appDir)
          ? appDir.map((dir) => searchForWorkspaceRoot(dir.pathname))
          : [searchForWorkspaceRoot(appDir.pathname)]),
        searchForWorkspaceRoot(cliDir.pathname)
        // appDir.pathname,
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
  mode = 'csr',
  framework = 'vue',
  host,
  appDir,
  publicDir
}: {
  port?: number
  logLevel?: LogLevel
  mode?: 'csr' | 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )

  const cliDir = getCliDir()

  const vite = await createVitrifyDevServer({
    port,
    logLevel,
    mode,
    framework,
    host,
    appDir,
    publicDir
  })
  let entryUrl: string

  let setup
  let server: Server

  console.log(`Development mode: ${mode}`)
  if (['ssr', 'fastify'].includes(mode)) {
    const entryUrl =
      mode === 'fastify'
        ? new URL('src/vite/fastify/entry.ts', cliDir).pathname
        : new URL(`src/vite/${framework}/ssr/entry-server.ts`, cliDir).pathname

    ;({ setup } = await vite.ssrLoadModule(entryUrl))

    const app = fastify({
      https:
        typeof vite.config.server.https === 'object'
          ? vite.config.server.https
          : {}
    })
    if (setup) {
      await setup({
        fastify: app
      })
    }
    // await app.register(fastifySsrPlugin, {
    //   appDir,
    //   vitrifyDir: new URL('../..', import.meta.url),
    //   mode: 'development'
    // })
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
