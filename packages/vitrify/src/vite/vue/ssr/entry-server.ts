import { createApp } from '../main.js'
import type { Render, SSRContext } from '../../../node/vitrify-config.js'

const initializeApp = async (url: string, ssrContext: SSRContext) => {
  const { app, router, routes } = await createApp('server', ssrContext)

  router.push({ path: url })

  await router.isReady()

  return { app, router, routes }
}

export const getRoutes = async () =>
  (
    await initializeApp('/', {
      req: { headers: {}, url: '/' },
      res: {},
      provide: {},
      initialState: {},
      stringifyReducers: {},
      onTemplateRenderedInternal: [],
      _modules: new Set(),
      _meta: {},
      __qMetaList: [],
      onRenderedList: [],
      onRendered: (fn: () => unknown) => {
        return
      }
    })
  ).routes

export const render: Render = async (
  url,
  manifest,
  ssrContext,
  renderToString
) => {
  if (!renderToString)
    renderToString = (await import('vue/server-renderer')).renderToString
  const { app, router } = await initializeApp(url, ssrContext)

  const html = await renderToString(app, ssrContext)

  const preloadLinks = renderPreloadLinks(ssrContext.modules!, manifest)

  return { html, preloadLinks, app }
}

function renderPreloadLinks(
  modules: Map<unknown, unknown>,
  manifest: Record<string, unknown>
) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else if (file.endsWith('.svg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/svg+xml">`
  } else {
    // TODO
    return ''
  }
}
