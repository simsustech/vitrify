import { promises as fs } from 'fs'
import { routesToPaths } from '../../helpers/routes.js'
import type { SsrFunction } from '../../vitrify-config.js'

export const prerender = async ({
  outDir,
  templatePath,
  manifestPath,
  entryServerPath,
  ssrFunctions
}: {
  outDir: string
  templatePath: string
  manifestPath: string
  entryServerPath: string
  ssrFunctions: SsrFunction[]
}) => {
  const promises = []
  const template = (await fs.readFile(templatePath)).toString()
  const manifest = await fs.readFile(manifestPath)
  const { render, getRoutes } = await import(entryServerPath)
  const routes = await getRoutes()
  const paths = routesToPaths(routes).filter(
    (i) => !i.includes(':') && !i.includes('*')
  )
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

    if (ssrFunctions?.length) {
      for (const ssrFunction of ssrFunctions) {
        html = ssrFunction(html, ssrContext)
      }
    }

    promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
  }
  return Promise.all(promises)
}
