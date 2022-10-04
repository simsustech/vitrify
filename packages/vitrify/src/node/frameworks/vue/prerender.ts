import { promises as fs } from 'fs'
import type { OnRenderedHook } from 'src/node/vitrify-config.js'
import { routesToPaths } from '../../helpers/routes.js'

export const prerender = async ({
  outDir,
  templatePath,
  manifestPath,
  entryServerPath,
  onRendered
}: {
  outDir: string
  templatePath: string
  manifestPath: string
  entryServerPath: string
  onRendered: OnRenderedHook[]
}) => {
  const promises = []
  const template = (await fs.readFile(templatePath)).toString()
  const manifest = await fs.readFile(manifestPath)
  const { render, getRoutes } = await import(entryServerPath)
  const routes = await getRoutes()
  const paths = routesToPaths(routes).filter(
    (i) => !i.includes(':') && !i.includes('*')
  )
  const critters = new (await import('critters')).default({
    path: outDir,
    logLevel: 'warn',
    external: true,
    inlineFonts: true,
    preloadFonts: true,
    preload: 'swap'
  })
  for (const url of paths) {
    const filename =
      (url.endsWith('/') ? 'index' : url.replace(/^\//g, '')) + '.html'
    console.log(`Generating ${filename}`)
    const ssrContext = {
      req: { headers: {}, url },
      res: {}
    }
    const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

    let html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    if (onRendered?.length) {
      for (const ssrFunction of onRendered) {
        html = ssrFunction(html, ssrContext)
      }
    }

    html = await critters.process(html)

    promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
  }
  return Promise.all(promises)
}
