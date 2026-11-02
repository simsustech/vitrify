import { existsSync, promises as fs, mkdirSync } from 'fs'
import type { OnTemplateRenderedHook } from '../../vitrify-config.js'
import type { Options as BeastiesOptions } from 'beasties'
import { routesToPaths } from '../../helpers/routes.js'
import { renderHtml } from './fastify-ssr-plugin.js'
import type { RouteRecordRaw } from 'vue-router'
import { fileURLToPath } from 'url'

export const prerender = async ({
  outDir,
  template,
  manifest,
  render,
  routes,
  onTemplateRendered,
  base = '/',
  deferHydration = false,
  beastiesOptions
}: {
  outDir: string
  template: string
  manifest: Record<string, unknown>
  render: unknown
  routes: RouteRecordRaw[]
  onTemplateRendered: OnTemplateRenderedHook[]
  base?: string
  /**
   * The app boots on idle, so this page must not prefetch its own chunks.
   * Passed in rather than read from the loaded config: this module also runs
   * inside the app's own SSR bundle, which does not share the CLI's state.
   */
  deferHydration?: boolean
  /**
   * Overrides for `beasties`, which inlines the critical CSS of every page.
   * Passed in for the same reason as `deferHydration`: this module also runs
   * inside the app's own SSR bundle, which does not share the CLI's state.
   */
  beastiesOptions?: Partial<BeastiesOptions>
}) => {
  const promises = []
  const paths = routesToPaths(routes).filter(
    (i) => !i.includes(':') && !i.includes('*')
  )
  const beasties = new (await import('beasties')).default({
    path: outDir,
    publicPath: base,
    logLevel: 'info',
    external: true,
    fonts: true,
    compress: false,
    ...beastiesOptions
  })

  for (const url of paths) {
    const directoryUrl = new URL(
      url.split('/').slice(0, -1).join('/'),
      `file://${outDir}`
    )
    if (!existsSync(fileURLToPath(directoryUrl))) {
      mkdirSync(fileURLToPath(directoryUrl), { recursive: true })
    }

    const filename =
      (url.endsWith('/') ? 'index' : url.replace(/^\//g, '')) + '.html'
    console.log(`Generating ${filename}`)

    let html = await renderHtml({
      url,
      manifest,
      provide: {},
      render,
      req: { headers: {}, url },
      res: {},
      template,
      onTemplateRendered,
      deferHydration
    })
    html = await beasties.process(html)

    promises.push(fs.writeFile(outDir + filename, html, 'utf-8'))
  }
  return Promise.all(promises)
}
