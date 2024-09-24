#!/usr/bin/node --experimental-specifier-resolution=node
import { baseConfig } from '../index.js'
import { build as viteBuild } from 'vite'

export async function build(opts: {
  ssr?: 'client' | 'server' | 'ssg' | 'fastify'
  base?: string
  outDir: string
  appDir?: URL
  publicDir?: URL
  debug?: boolean
  productName?: string
}) {
  const config = await baseConfig({
    command: 'build',
    mode: 'production',
    ssr: opts?.ssr,
    appDir: opts.appDir,
    publicDir: opts.publicDir,
    base: opts.base,
    debug: opts.debug,
    productName: opts.productName
  })

  config.build = {
    ...config.build,
    // minify: !opts.debug,
    minify: false,
    outDir: opts.outDir,
    emptyOutDir: !!opts.outDir
  }

  // if (opts.base) {
  //   config.define = {
  //     ...config.define,
  //     __BASE_URL__: `'${opts.base}'`
  //   }
  // }

  return viteBuild({
    configFile: false,
    // base: opts.base,
    // logLevel: 'silent',
    ...config
  })
}
