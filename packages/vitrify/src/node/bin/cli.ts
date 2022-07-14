#!/usr/bin/env node
import cac from 'cac'
import { getAppDir, parsePath } from '../app-urls.js'
import { printHttpServerUrls } from '../helpers/logger.js'
import type {
  ConfigEnv,
  ResolvedConfig,
  UserConfig,
  UserConfigExport,
  ViteDevServer
} from 'vite'
import type { Server } from 'net'

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
    } = {
      base: options.base,
      appDir,
      publicDir: parsePath(options.publicDir, appDir),
      debug: options.debug
    }

    switch (options.mode) {
      case 'csr':
        await build({
          ...args,
          outDir: new URL('csr/', baseOutDir).pathname
        })
        break
      case 'fastify':
        await build({
          ssr: 'fastify',
          ...args,
          outDir: new URL('server/', baseOutDir).pathname
        })
        break
      case 'ssr':
        await build({
          ssr: 'client',
          ...args,
          outDir: new URL('ssr/client/', baseOutDir).pathname
        })
        await build({
          ssr: 'server',
          ...args,
          outDir: new URL('ssr/server/', baseOutDir).pathname
        })
        break
      case 'ssg':
        await build({
          ssr: 'client',
          ...args,
          outDir: new URL('static/', baseOutDir).pathname
        })
        await build({
          ssr: 'server',
          ...args,
          outDir: new URL('ssr/server/', baseOutDir).pathname
        })
        ;({ prerender, onRendered } = await import(
          new URL('ssr/server/prerender.mjs', baseOutDir).pathname
        ))

        prerender({
          outDir: new URL('static/', baseOutDir).pathname,
          templatePath: new URL('static/index.html', baseOutDir).pathname,
          manifestPath: new URL('static/ssr-manifest.json', baseOutDir)
            .pathname,
          entryServerPath: new URL('ssr/server/entry-server.mjs', baseOutDir)
            .pathname,
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
    { default: '127.0.0.1' }
  )
  .option('--appDir [appDir]', 'Application directory')
  .option('--app [app]', 'Fastify app instance path')
  .option('--publicDir [publicDir]', 'Public directory')
  .action(async (options) => {
    let server: Server
    let config: ResolvedConfig
    if (options.host === true) {
      options.host = '0.0.0.0'
    }
    const { createServer } = await import('./dev.js')
    const cwd = (await import('../app-urls.js')).getCwd()
    let app
    const appPath = parsePath(options.app, cwd)?.pathname
    if (appPath) {
      app = await import(appPath)
    }

    switch (options.mode) {
      case 'ssr':
        ;({ server, config } = await createServer({
          ssr: 'ssr',
          host: options.host,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
      case 'fastify':
        ;({ server, config } = await createServer({
          ssr: 'fastify',
          host: options.host,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
      default:
        ;({ server, config } = await createServer({
          host: options.host,
          appDir: parsePath(options.appDir, cwd),
          publicDir: parsePath(options.publicDir, cwd)
        }))
        break
    }
    console.log('Dev server running at:')
    printHttpServerUrls(server, config)
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
  await run(filePath.pathname)
})

// Default
cli.command('').action((command, options) => {
  cli.outputHelp()
})

cli.help()

cli.parse()
