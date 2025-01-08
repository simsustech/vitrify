import { existsSync, promises as fs, mkdirSync } from 'fs'
import type { OnRenderedHook } from 'src/node/vitrify-config.js'
import { routesToPaths } from '../../helpers/routes.js'
import { appendToHead, addOrReplaceAppDiv } from '../../helpers/utils.js'

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
  const manifest = JSON.parse((await fs.readFile(manifestPath)).toString())
  const { render, getRoutes } = await import(entryServerPath)
  const routes = await getRoutes()
  const paths = routesToPaths(routes).filter(
    (i) => !i.includes(':') && !i.includes('*')
  )
  const beasties = new (await import('beasties')).default({
    path: outDir,
    logLevel: 'warn',
    external: true,
    inlineFonts: true,
    preloadFonts: true
  })

  for (const url of paths) {
    const directoryUrl = new URL(
      url.split('/').slice(0, -1).join('/'),
      `file://${outDir}`
    )
    if (!existsSync(directoryUrl.pathname)) {
      mkdirSync(directoryUrl.pathname, { recursive: true })
    }

    const filename =
      (url.endsWith('/') ? 'index' : url.replace(/^\//g, '')) + '.html'
    console.log(`Generating ${filename}`)
    const ssrContext = {
      req: { headers: {}, url },
      res: {}
    }
    const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

    let html = addOrReplaceAppDiv(appHtml, template)
    html = appendToHead(preloadLinks, html)

    if (onRendered?.length) {
      for (const ssrFunction of onRendered) {
        html = ssrFunction(html, ssrContext)
      }
    }

    html = await beasties.process(html)

    promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
  }
  return Promise.all(promises)
}
