#!/usr/bin/env node
import cac from 'cac'
import { fileURLToPath } from 'url'
import { getAppDir, parsePath } from '../app-urls.js'
import { printHttpServerUrls, exitLogs } from '../helpers/logger.js'
import type { ResolvedConfig, ViteDevServer } from 'vite'
import type { Server } from 'net'
import type { FastifyInstance } from 'fastify'

const cli = cac('vitrify')
cli
  .command('build')
  .option('-m, --mode [mode]', 'Build mode', { default: 'csr' })
  .option('--base [base]', 'Base public path')
  .option('--outDir [outDir]', 'Output directory')
  .option('--appDir [appDir]', 'App directory')
  .option('--publicDir [publicDir]', 'Public directory')
  .option('--productName [productName]', 'Product name')
  .option('--debug', 'Debug build')
  .action(async (options) => {
    const { build } = await import('./build.js')
    let appDir: URL
    let prerender
    let onRendered
    if (options.appDir) {
      if (options.appDir.slice(-1) !== '/') options.appDir += '/'
      appDir = new URL(`file://${options.appDir}`)
    } else {
      appDir = getAppDir()
    }

    const baseOutDir =
      parsePath(options.outDir, appDir) || new URL('dist/', appDir)

    const args: {
      base: string
      appDir?: URL
      publicDir?: URL
      debug?: boolean
      productName?: string
    } = {
      base: options.base,
      appDir,
      publicDir: parsePath(options.publicDir, appDir),
      debug: options.debug,
      productName: options.productName
    }

    switch (options.mode) {
      case 'csr':
        await build({
          ...args,
          outDir: fileURLToPath(new URL('csr/', baseOutDir))
        })
        break
      case 'fastify':
        await build({
          ssr: 'fastify',
          ...args,
          outDir: fileURLToPath(new URL('server/', baseOutDir))
        })
        break
      case 'ssr':
        await build({
          ssr: 'client',
          ...args,
          outDir: fileURLToPath(new URL('ssr/client/', baseOutDir))
        })
        await build({
          ssr: 'server',
          ...args,
          outDir: fileURLToPath(new URL('ssr/server/', baseOutDir))
        })
        break
      case 'ssg':
        await build({
          ssr: 'client',
          ...args,
          outDir: fileURLToPath(new URL('static/', baseOutDir))
        })
        await build({
          ssr: 'server',
          ...args,
          outDir: fileURLToPath(new URL('ssr/server/', baseOutDir))
        })
        ;({ prerender, onRendered } = await import(
          new URL('ssr/server/prerender.mjs', baseOutDir).pathname
        ))

        // ;({ prerender, onRendered } = await import(
        //   fileURLToPath(new URL('ssr/server/prerender.mjs', baseOutDir))
        // ))

        prerender({
          outDir: fileURLToPath(new URL('static/', baseOutDir)),
          templatePath: fileURLToPath(new URL('static/index.html', baseOutDir)),
          manifestPath: fileURLToPath(
            new URL('static/.vite/ssr-manifest.json', baseOutDir)
          ),
          entryServerPath: new URL('ssr/server/entry-server.mjs', baseOutDir),
          onRendered
        })
        break
      default:
        console.log('Invalid build mode')
        break
    }
  })

cli
  .command('dev')
  .option('-m, --mode [mode]', 'Development server mode', { default: 'csr' })
  .option(
    '--host [host]',
    'Specify which IP addresses the server should listen on',
    { default: 'localhost' }
  )
  .option('--port [port]', 'Specify which port the server should listen on', {
    default: '3000'
  })
  .option('--appDir [appDir]', 'Application directory')
  // .option('--app [app]', 'Fastify app instance path')
  .option('--publicDir [publicDir]', 'Public directory')
  .action(async (options) => {
    let server: Server
    let config: ResolvedConfig
    let vite: ViteDevServer
    if (options.host === true) {
      options.host = '0.0.0.0'
    }
    const { createServer } = await import('./dev.js')
    const cwd = (await import('../app-urls.js')).getCwd()
    let app: FastifyInstance | undefined

    switch (options.mode) {
      case 'ssr':
        ;({ server, config } = await createServer({
          ssr: 'ssr',
          host: options.host,
          port: options.port,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
      case 'fastify':
        ;({ app, server, config, vite } = await createServer({
          ssr: 'fastify',
          host: options.host,
          port: options.port,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
      default:
        ;({ server, config } = await createServer({
          host: options.host,
          port: options.port,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
    }
    console.log('Dev server running at:')
    printHttpServerUrls(server, config)
    for (const line of exitLogs) {
      config.logger.warn(line)
    }
  })

cli.command('test').action(async (options) => {
  const { test } = await import('./test.js')

  let appDir: URL
  if (options.appDir) {
    if (options.appDir.slice(-1) !== '/') options.appDir += '/'
    appDir = new URL(`file://${options.appDir}`)
  } else {
    appDir = getAppDir()
  }
  await test({
    appDir
  })
})

cli.command('run <file>').action(async (file, options) => {
  const { run } = await import('./run.js')
  const filePath = new URL(file, `file://${process.cwd()}/`)
  await run(fileURLToPath(filePath))
})

// Default
cli.command('').action((command, options) => {
  cli.outputHelp()
})

cli.help()

cli.parse()
