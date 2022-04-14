#!/usr/bin/node --experimental-specifier-resolution=node
import { baseConfig } from '../index.js'
// import { promises as fs } from 'fs'
// import { routesToPaths } from '../helpers/routes.js'
import { build as viteBuild } from 'vite'
// import { SsrFunction } from '../vitrify-config.js'

// export const prerender = async ({
//   outDir,
//   templatePath,
//   manifestPath,
//   entryServerPath,
//   injectSsrContext
// }: {
//   outDir: string
//   templatePath: string
//   manifestPath: string
//   entryServerPath: string
//   injectSsrContext: SsrFunction
// }) => {
//   let template
//   let manifest
//   const promises = []
//   template = (await fs.readFile(templatePath)).toString()
//   manifest = await fs.readFile(manifestPath)
//   let { render, getRoutes } = await import(entryServerPath)
//   const routes = await getRoutes()
//   const paths = routesToPaths(routes).filter(
//     (i) => !i.includes(':') && !i.includes('*')
//   )
//   for (let url of paths) {
//     const filename =
//       (url.endsWith('/') ? 'index' : url.replace(/^\//g, '')) + '.html'
//     console.log(`Generating ${filename}`)
//     const ssrContext = {
//       req: { headers: {}, url },
//       res: {}
//     }
//     const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

//     let html = template
//       .replace(`<!--preload-links-->`, preloadLinks)
//       .replace(`<!--app-html-->`, appHtml)

//     html = injectSsrContext(html, ssrContext)

//     promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
//   }
//   return Promise.all(promises)
// }

export async function build(opts: {
  ssr?: 'client' | 'server' | 'ssg'
  base?: string
  outDir?: string
  appDir?: URL
  publicDir?: URL
}) {
  const config = await baseConfig({
    command: 'build',
    mode: 'production',
    ssr: opts?.ssr,
    appDir: opts.appDir,
    publicDir: opts.publicDir
  })

  config.build = {
    ...config.build,
    minify: false,
    outDir: opts.outDir,
    emptyOutDir: !!opts.outDir
  }

  if (opts.base) {
    config.define = {
      ...config.define,
      __BASE_URL__: `'${opts.base}'`
    }
  }

  return viteBuild({
    configFile: false,
    base: opts.base,
    // logLevel: 'silent',
    ...config
  })
}
