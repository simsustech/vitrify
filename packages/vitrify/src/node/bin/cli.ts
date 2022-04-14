#!/usr/bin/env node
import cac from 'cac'
import { appDir as defaultAppDir, parsePath } from '../app-urls.js'
import { printHttpServerUrls } from '../helpers/logger.js'
import type { ViteDevServer } from 'vite'
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
  .action(async (options) => {
    const { build } = await import('./build.js')
    let prerender
    let appDir: URL
    if (options.appDir) {
      if (options.appDir.slice(-1) !== '/') options.appDir += '/'
      appDir = new URL(`file://${options.appDir}`)
    } else {
      appDir = defaultAppDir
    }

    const baseOutDir = parsePath(options.outDir) || new URL('dist/', appDir)

    const args: {
      base: string
      appDir?: URL
      publicDir?: URL
    } = {
      base: options.base,
      appDir,
      publicDir: parsePath(options.publicDir)
    }

    switch (options.mode) {
      case 'csr':
        await build({
          ...args,
          outDir: new URL('spa/', baseOutDir).pathname
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
        prerender = (
          await import(new URL('ssr/server/prerender.js', appDir).pathname)
        ).prerender
        prerender({
          outDir: new URL('static/', baseOutDir).pathname,
          templatePath: new URL('static/index.html', baseOutDir).pathname,
          manifestPath: new URL('static/ssr-manifest.json', baseOutDir)
            .pathname,
          entryServerPath: new URL('ssr/server/entry-server.mjs', baseOutDir)
            .pathname
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
  .option('--publicDir [publicDir]', 'Public directory')
  .action(async (options) => {
    let server: Server
    let vite: ViteDevServer
    if (options.host === true) {
      options.host = '0.0.0.0'
    }
    const { createServer } = await import('./dev.js')
    switch (options.mode) {
      case 'ssr':
        ;({ server, vite } = await createServer({
          mode: 'ssr',
          host: options.host,
          appDir: parsePath(options.appDir),
          publicDir: parsePath(options.publicDir)
        }))
        break
      default:
        ;({ server, vite } = await createServer({
          host: options.host,
          appDir: parsePath(options.appDir),
          publicDir: parsePath(options.publicDir)
        }))
        break
    }
    console.log('Dev server running at:')
    printHttpServerUrls(server, vite.config)
  })

cli.command('test').action(async (options) => {
  const { test } = await import('./test.js')

  let appDir: URL
  if (options.appDir) {
    if (options.appDir.slice(-1) !== '/') options.appDir += '/'
    appDir = new URL(`file://${options.appDir}`)
  } else {
    appDir = defaultAppDir
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
