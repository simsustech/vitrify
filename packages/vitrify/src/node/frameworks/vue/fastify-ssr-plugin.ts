import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fastifyStatic from '@fastify/static'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import {
  addOrReplaceAppDiv,
  appendToBody,
  appendToHead
} from '../../helpers/utils.js'
import type { ViteDevServer } from 'vite'
import type { OnTemplateRenderedHook } from '../../vitrify-config.js'
import { getAppDir } from '../../app-urls.js'

type ProvideFn = (
  req: FastifyRequest,
  res: FastifyReply
) => Promise<Record<string, unknown | { value: unknown }>>

export interface FastifySsrOptions {
  baseUrl?: string
  provide?: ProvideFn
  vitrifyDir?: URL
  vite?: ViteDevServer
  // frameworkDir?: URL
  onTemplateRendered?: OnTemplateRenderedHook[]
  appDir?: URL
  publicDir?: URL
  mode?: string
  host?: string
}

const fastifySsrPlugin: FastifyPluginAsync<FastifySsrOptions> = async (
  fastify,
  options
) => {
  options.baseUrl = options.baseUrl || '/'
  options.mode = options.mode || process.env.MODE || import.meta.env.MODE
  options.appDir = options.appDir || new URL('../../..', import.meta.url)

  if (
    options.baseUrl.charAt(options.baseUrl.length - 1) !== '/' ||
    options.baseUrl.charAt(0) !== '/'
  )
    throw new Error('baseUrl should start and end with a /')
  if (options.mode === 'development') {
    options.vitrifyDir =
      options.vitrifyDir || (await import('vitrify')).vitrifyDir
    const frameworkDir = new URL('src/vite/vue/', options.vitrifyDir)

    options.appDir = options.appDir || new URL('../../..', import.meta.url)

    const { createVitrifyDevServer } = await import('vitrify/dev')
    const vite = await createVitrifyDevServer({
      appDir: options.appDir,
      ssr: 'ssr',
      framework: 'vue',
      base: options.baseUrl,
      host: options.host
    })

    if (!('use' in fastify)) {
      const middie = (await import('@fastify/middie')).default
      // @ts-expect-error undefined
      await fastify.register(middie)
    }
    fastify.use(vite.middlewares)

    fastify.get(`${options.baseUrl}*`, async (req, res) => {
      try {
        const url = req.raw.url?.replace(options.baseUrl!, '/')
        const provide = options.provide ? await options.provide(req, res) : {}

        let template = readFileSync(
          new URL('index.html', frameworkDir)
        ).toString()

        template = await vite.transformIndexHtml(url!, template)

        const entryUrl = fileURLToPath(
          new URL('ssr/entry-server.ts', frameworkDir)
        )
        const environment = vite.environments.ssr
        // @ts-expect-error missing type
        const { render } = await environment.runner.import(entryUrl)
        // const render = (await vite!.ssrLoadModule(entryUrl)).render
        let manifest
        // TODO: https://github.com/vitejs/vite/issues/2282
        try {
          manifest = {}
        } catch (e) {
          manifest = {}
        }

        const html = await renderHtml({
          request: req,
          reply: res,
          url: url ?? '/',
          provide,
          onTemplateRendered: options.onTemplateRendered,
          template,
          manifest,
          render
        })

        res.code(200)
        res.type('text/html')
        res.send(html)
        // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e: any) {
        console.error(e.stack)
        if (vite) vite.ssrFixStacktrace(e)
        res.code(500)
        res.send(e.stack)
      }
    })
  } else {
    options.appDir = options.appDir || new URL('../../..', import.meta.url)
    fastify.register(fastifyStatic, {
      root: fileURLToPath(new URL('./dist/ssr/client', options.appDir)),
      wildcard: false,
      index: false,
      preCompressed: true,
      prefix: options.baseUrl
    })

    fastify.get(`${options.baseUrl}*`, async (req, res) => {
      const url = req.raw.url?.replace(options.baseUrl!, '/')
      const provide = options.provide ? await options.provide(req, res) : {}

      const { template, manifest, render, onTemplateRendered } =
        await loadSSRAssets({
          distDir: new URL('./dist/', options.appDir)
        })

      const html = await renderHtml({
        request: req,
        reply: res,
        url: url ?? '/',
        provide,
        onTemplateRendered,
        template,
        manifest,
        render
      })

      res.code(200)
      res.type('text/html')
      res.send(html)
    })
  }
}

const renderTemplate = ({
  template,
  initialStateScript,
  appHtml,
  preloadLinks
}: {
  template: string
  initialStateScript: string
  appHtml: string
  preloadLinks: string
}) => {
  return appendToHead(
    preloadLinks,
    appendToBody(initialStateScript, addOrReplaceAppDiv(appHtml, template))
  )
}

const renderHtml = async (options: {
  url: string
  request: FastifyRequest | { headers: Record<string, unknown>; url: string }
  reply: FastifyReply | Record<string, unknown>
  provide: Record<string, unknown>
  onTemplateRendered?: OnTemplateRenderedHook[]
  template: string
  manifest: Record<string, unknown>
  render: any
}) => {
  const ssrContext: Record<string, any> = {
    req: options.request,
    res: options.reply,
    provide: options.provide
  }

  const onTemplateRendered = options.onTemplateRendered ?? []

  console.log(ssrContext)

  const {
    html: appHtml,
    preloadLinks,
    app
  } = await options.render(options.url, options.manifest, ssrContext)

  console.log(ssrContext)
  // if (!ssrContext.initialState) ssrContext.initialState = {}
  ssrContext.initialState.provide = options.provide

  const initialStateScript = `
  <script>
  __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
  </script>`

  let html = renderTemplate({
    template: options.template,
    appHtml,
    initialStateScript,
    preloadLinks
  })

  if (onTemplateRendered?.length) {
    for (const ssrFunction of onTemplateRendered) {
      html = ssrFunction({ html, ssrContext })
    }
  }

  return html
}

const loadSSRAssets = async (
  {
    mode,
    distDir
  }: {
    mode?: 'ssr' | 'ssg'
    distDir?: URL
  } = {
    mode: 'ssr'
  }
) => {
  const appDir = getAppDir(new URL(import.meta.url))
  const baseOutDir = distDir || new URL('dist/', appDir)

  let templatePath, manifestPath, entryServerPath
  const onTemplateRenderedPath = fileURLToPath(
    new URL('ssr/server/virtual_vitrify-hooks.mjs', baseOutDir)
  )
  if (mode === 'ssg') {
    templatePath = fileURLToPath(new URL('static/index.html', baseOutDir))
    manifestPath = fileURLToPath(
      new URL('static/.vite/ssr-manifest.json', baseOutDir)
    )
    entryServerPath = fileURLToPath(
      new URL('ssr/server/entry-server.mjs', baseOutDir)
    )
  } else {
    templatePath = fileURLToPath(new URL('ssr/client/index.html', baseOutDir))
    manifestPath = fileURLToPath(
      new URL('ssr/client/.vite/ssr-manifest.json', baseOutDir)
    )
    entryServerPath = fileURLToPath(
      new URL('ssr/server/entry-server.mjs', baseOutDir)
    )
  }
  try {
    const template = readFileSync(templatePath).toString()
    const manifest = JSON.parse(readFileSync(manifestPath).toString())
    const entryServer = await import(entryServerPath)
    const { render, getRoutes } = entryServer
    const onTemplateRendered = (await import(onTemplateRenderedPath))
      .onTemplateRendered

    return {
      template,
      manifest,
      render,
      getRoutes,
      onTemplateRendered
    }
  } catch (e) {
    console.error(e)
    throw new Error('Unable to load SSR asset files')
  }
}

export { fastifySsrPlugin, renderHtml, loadSSRAssets }
export type FastifySsrPlugin = typeof fastifySsrPlugin
