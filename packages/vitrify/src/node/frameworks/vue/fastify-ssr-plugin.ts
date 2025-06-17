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
import type {
  OnAppRenderedHook,
  OnTemplateRenderedHook,
  SSRContext
} from '../../vitrify-config.js'
import { getAppDir } from '../../app-urls.js'
import { stringify } from 'devalue'
import stringifyObject from 'stringify-object'

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
  onAppRendered?: OnAppRenderedHook[]
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
          req,
          res,
          url: url ?? '/',
          provide,
          onAppRendered: options.onAppRendered,
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

      const { template, manifest, render, onAppRendered, onTemplateRendered } =
        await loadSSRAssets({
          distDir: new URL('./dist/', options.appDir)
        })

      const html = await renderHtml({
        req,
        res,
        url: url ?? '/',
        provide,
        onAppRendered,
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
  req: FastifyRequest | { headers: Record<string, unknown>; url: string }
  res: FastifyReply | Record<string, unknown>
  provide: Record<string, unknown>
  onAppRendered?: OnAppRenderedHook[]
  onTemplateRendered?: OnTemplateRenderedHook[]
  template: string
  manifest: Record<string, unknown>
  render: any
}) => {
  const ssrContextonAppRendered: (() => unknown)[] = []
  const ssrContext: SSRContext = {
    req: options.req,
    res: options.res,
    provide: options.provide,
    initialState: {},
    _modules: new Set(),
    _meta: {},
    __qMetaList: [],
    onRenderedList: ssrContextonAppRendered,
    onRendered: (fn: () => unknown) => {
      ssrContextonAppRendered.push(fn)
    }
  }

  const onAppRendered = options.onAppRendered ?? []
  const onTemplateRendered = options.onTemplateRendered ?? []

  const {
    html: appHtml,
    preloadLinks,
    app
  } = await options.render(options.url, options.manifest, ssrContext)

  if (ssrContextonAppRendered?.length) {
    for (const ssrFunction of ssrContextonAppRendered) {
      await ssrFunction()
    }
  }

  if (onAppRendered?.length) {
    for (const ssrFunction of onAppRendered) {
      await ssrFunction({ app, ssrContext })
    }
  }

  // if (!ssrContext.initialState) ssrContext.initialState = {}
  ssrContext.initialState.provide = options.provide

  const ssrContextInitialStateStringified: Record<
    keyof SSRContext['initialState'],
    string
  > = {}
  for (const key in ssrContext.initialState) {
    if (key === 'provide') {
      ssrContextInitialStateStringified[key] = JSON.stringify(
        ssrContext.initialState.provide
      )
    } else if (key === 'piniaColada') {
      ssrContextInitialStateStringified[key] = JSON.stringify(
        ssrContext.initialState.piniaColada
      )
    } else {
      ssrContextInitialStateStringified[key] = stringify(
        ssrContext.initialState[key]
      )
    }
  }

  const initialStateScript = `
  <script>
  __INITIAL_STATE__ = ${stringifyObject(ssrContextInitialStateStringified)}
  </script>`

  let html = renderTemplate({
    template: options.template,
    appHtml,
    initialStateScript,
    preloadLinks
  })

  if (onTemplateRendered?.length) {
    for (const ssrFunction of onTemplateRendered) {
      html = await ssrFunction({ html, ssrContext })
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
  const vitrifyHooksPath = fileURLToPath(
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
    const { onTemplateRendered, onAppRendered } = await import(vitrifyHooksPath)

    return {
      template,
      manifest,
      render,
      getRoutes,
      onAppRendered,
      onTemplateRendered
    }
  } catch (e) {
    console.error(e)
    throw new Error('Unable to load SSR asset files')
  }
}

export { fastifySsrPlugin, renderHtml, loadSSRAssets }
export type FastifySsrPlugin = typeof fastifySsrPlugin
