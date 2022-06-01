import type { LogLevel, InlineConfig } from 'vite'
import { ViteDevServer, mergeConfig } from 'vite'
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
  publicDir,
  app
}: {
  port?: number
  logLevel?: LogLevel
  mode?: 'csr' | 'ssr' | 'fastify'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
  app?: FastifyInstance
}) {
  const { getAppDir, getCliDir, getCliViteDir, getCwd } = await import(
    '../app-urls.js'
  )
  const cwd = getCwd()
  const cliDir = getCliDir()
  const cliViteDir = getCliViteDir(cliDir)
  const frameworkDir = new URL(`${framework}/`, cliViteDir)

  if (!appDir) appDir = getAppDir()
  // const { fastifySsrPlugin } = await import(
  //   `../frameworks/${framework}/fastify-ssr-plugin.js`
  // )
  // const { createApp } = await import(`../frameworks/${framework}/server.ts`)

  let config: InlineConfig = {}
  let ssrMode: 'server' | 'fastify' | undefined
  if (mode === 'ssr') ssrMode = 'server'
  if (mode === 'fastify') ssrMode = 'fastify'
  config = await baseConfig({
    ssr: ssrMode,
    command: 'dev',
    mode: 'development',
    appDir,
    publicDir
  })
  // if (Array.isArray(appDir)) {
  //   const appConfigs = await Promise.all(
  //     appDir.map((dir) =>
  //       baseConfig({
  //         // ssr: mode === 'ssr' ? 'server' : undefined,
  //         ssr: ssrMode,
  //         command: 'dev',
  //         mode: 'development',
  //         appDir: dir
  //       })
  //     )
  //   )
  //   for (let appConfig of appConfigs) {
  //     config = mergeConfig(config, appConfig)
  //   }
  // } else {
  //   config = await baseConfig({
  //     ssr: ssrMode,
  //     command: 'dev',
  //     mode: 'development',
  //     appDir,
  //     publicDir
  //   })
  // }

  // console.log(
  //   ...(Array.isArray(appDir)
  //     ? appDir.map((dir) => searchForWorkspaceRoot(dir.pathname))
  //     : [searchForWorkspaceRoot(appDir.pathname)])
  // )
  config.logLevel = logLevel
  config.server = {
    https: config.server?.https,
    port,
    // middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    middlewareMode: ['ssr', 'fastify'].includes(mode) ? 'ssr' : undefined,
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
  const vite = await (
    await import('vite')
  ).createServer({
    configFile: false,
    ...config
  })

  let setupApp
  if (mode === 'fastify') {
    ;({ setup: setupApp } = await vite.ssrLoadModule(
      `../../vite/fastify/entry.ts`
    ))
  } else {
    ;({ setupApp } = await vite.ssrLoadModule(
      `../../vite/${framework}/ssr/app.ts`
    ))
  }

  let server: Server
  if (mode === 'ssr') {
    console.log('SSR mode')
    app = setupApp({
      vite,
      appDir
    }) as FastifyInstance
    // app = app || fastify()
    // if (Array.isArray(appDir)) {
    //   for (let dir of appDir) {
    //     const { productName = 'Product name' } = JSON.parse(
    //       readFileSync(new URL('package.json', dir).pathname, {
    //         encoding: 'utf-8'
    //       })
    //     )
    //     await app.register(fastifySsrPlugin, {
    //       appDir: dir,
    //       frameworkDir,
    //       vite,
    //       productName,
    //       mode: 'development'
    //     })
    //   }
    // } else {
    //   const { productName = 'Product name' } = JSON.parse(
    //     readFileSync(new URL('package.json', appDir).pathname, {
    //       encoding: 'utf-8'
    //     })
    //   )
    //   await app.register(fastifySsrPlugin, {
    //     // baseUrl: '/test/',
    //     appDir,
    //     frameworkDir,
    //     vite,
    //     productName,
    //     mode: 'development'
    //   })
    // }

    await app.listen({
      port: Number(port || 3000),
      host
    })
    server = app.server
  } else if (mode === 'fastify') {
    console.log(config.server.https)
    app = fastify({
      https: typeof config.server.https === 'object' ? config.server.https : {}
    })
    console.log('fastiffyy')
    setupApp({
      fastify: app,
      vite
    })
    await app.listen({
      port: Number(port || 3000),
      host
    })
    server = app.server
  } else {
    server = (await vite.listen()).httpServer as Server
  }
  return { server, vite }
}
