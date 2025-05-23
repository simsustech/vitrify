import { existsSync, promises as fs, mkdirSync } from 'fs'
import type { OnTemplateRenderedHook } from 'src/node/vitrify-config.js'
import { routesToPaths } from '../../helpers/routes.js'
import { renderHtml } from './fastify-ssr-plugin.js'
import { type RouteRecordRaw } from 'vue-router'

export const prerender = async ({
  outDir,
  template,
  manifest,
  render,
  routes,
  onTemplateRendered
}: {
  outDir: string
  template: string
  manifest: Record<string, unknown>
  render: unknown
  routes: RouteRecordRaw[]
  onTemplateRendered: OnTemplateRenderedHook[]
}) => {
  const promises = []
  const paths = routesToPaths(routes).filter(
    (i) => !i.includes(':') && !i.includes('*')
  )
  const beasties = new (await import('beasties')).default({
    path: outDir,
    logLevel: 'info',
    external: true,
    fonts: true,
    compress: false
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

    let html = await renderHtml({
      url,
      manifest,
      provide: {},
      render,
      request: { headers: {}, url },
      reply: {},
      template,
      onTemplateRendered
    })
    html = await beasties.process(html)

    promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
  }
  return Promise.all(promises)
}
