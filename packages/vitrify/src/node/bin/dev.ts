import type { ViteDevServer, LogLevel } from 'vite'
import { searchForWorkspaceRoot } from 'vite'
import { baseConfig } from '../index.js'
import type { Server } from 'net'
import type { FastifyInstance } from 'fastify/types/instance'
import fastify from 'fastify'
import { readFileSync } from 'fs'

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
  mode?: 'csr' | 'ssr'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
}) {
  const { getAppDir, getCliDir, getCwd } = await import('../app-urls.js')
  const cwd = getCwd()
  const cliDir = getCliDir()
  if (!appDir) appDir = getAppDir()
  const { fastifySsrPlugin } = await import(
    `../frameworks/${framework}/fastify-ssr-plugin.js`
  )

  /**
   * @type {import('vite').ViteDevServer}
   */
  const config = await baseConfig({
    ssr: mode === 'ssr' ? 'server' : undefined,
    command: 'dev',
    mode: 'development',
    appDir,
    publicDir
  })
  config.logLevel = logLevel
  config.server = {
    port,
    middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        searchForWorkspaceRoot(appDir.pathname),
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
  const vite = await (
    await import('vite')
  ).createServer({
    configFile: false,
    ...config
  })
  const { productName = 'Product name' } = JSON.parse(
    readFileSync(new URL('package.json', appDir).pathname, {
      encoding: 'utf-8'
    })
  )

  let app: ViteDevServer | FastifyInstance
  let server: Server
  if (mode === 'ssr') {
    console.log('SSR mode')
    app = fastify()
    await app.register(fastifySsrPlugin, {
      appDir,
      cliDir,
      vite,
      productName
    })

    await app.listen(port || 3000, host)
    server = app.server
  } else {
    server = (await vite.listen()).httpServer as Server
  }
  return { server, vite }
}
