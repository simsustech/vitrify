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
  minify?: boolean
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
    // Minify by default; `--debug` (or an explicit `minify: false`) opts out.
    minify: opts.minify ?? !opts.debug,
    outDir: opts.outDir,
    emptyOutDir: !!opts.outDir
  }

  return viteBuild({
    configFile: false,
    // base: opts.base,
    // logLevel: 'silent',
    ...config
  })
}
