import { createApp } from '../main.js'
import type { Render } from '../../../node/vitrify-config.js'

const initializeApp = async (
  url: string,
  ssrContext: Record<string, unknown>
) => {
  const onTemplateRenderedList: (() => unknown)[] = []
  Object.assign(ssrContext, {
    // Quasar internals
    _modules: new Set(),
    _meta: {},
    onRendered: (fn: () => unknown) => {
      onTemplateRenderedList.push(fn)
    }
  })

  const { app, router, routes } = await createApp('server', ssrContext)

  router.push({ path: url })
  ssrContext.initialState = {}

  onTemplateRenderedList.forEach((fn) => {
    fn()
  })

  await router.isReady()

  return { app, router, routes }
}

export const getRoutes = async () =>
  (
    await initializeApp('/', {
      req: { headers: {}, url: '/' },
      res: {}
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

  const ctx: {
    modules?: Map<unknown, unknown>
    transports?: Record<string, unknown>
    __qMetaList: unknown[]
  } = {
    __qMetaList: []
  }
  const html = await renderToString(app, ctx)

  const preloadLinks = renderPreloadLinks(ctx.modules!, manifest)

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
