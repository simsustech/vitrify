import type {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import fastifyStatic from '@fastify/static'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { componentsModules, collectCss } from '../../helpers/collect-css-ssr.js'
import {
  addOrReplaceAppDiv,
  addOrReplaceTitle,
  appendToBody,
  appendToHead
} from '../../helpers/utils.js'
import type { ViteDevServer } from 'vite'
import type { OnRenderedHook } from '../../vitrify-config.js'
export interface FastifySsrOptions {
  baseUrl?: string
  provide?: (
    req: FastifyRequest,
    res: FastifyReply
  ) => Promise<Record<string, unknown | { value: unknown }>>
  vitrifyDir?: URL
  vite?: ViteDevServer
  // frameworkDir?: URL
  onRendered?: OnRenderedHook[]
  appDir?: URL
  publicDir?: URL
  mode?: string
  host?: string
}

const fastifySsrPlugin: FastifyPluginCallback<FastifySsrOptions> = async (
  fastify,
  options,
  done
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
      // @ts-ignore
      await fastify.register(middie)
    }
    fastify.use(vite.middlewares)

    fastify.get(`${options.baseUrl}*`, async (req, res) => {
      try {
        const url = req.raw.url?.replace(options.baseUrl!, '/')
        const provide = options.provide ? await options.provide(req, res) : {}

        const ssrContext: Record<string, any> = {
          req,
          res,
          provide
        }

        let template = readFileSync(
          new URL('index.html', frameworkDir)
        ).toString()

        template = await vite.transformIndexHtml(url!, template)

        const entryUrl = fileURLToPath(
          new URL('ssr/entry-server.ts', frameworkDir)
        )
        const render = (await vite!.ssrLoadModule(entryUrl)).render
        let manifest
        // TODO: https://github.com/vitejs/vite/issues/2282
        try {
          manifest = {}
        } catch (e) {
          manifest = {}
        }

        // const cssModules = [entryUrl]
        // const matchedModules = componentsModules(cssModules, vite!)
        // const css = collectCss({
        //   mods: matchedModules
        // })

        const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

        if (!ssrContext.initialState) ssrContext.initialState = {}
        ssrContext.initialState.provide = provide

        const initialStateScript = `
        <script>
        __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
        </script>`
        const renderHtml = (html: string) => {
          return appendToHead(
            preloadLinks,
            appendToBody(initialStateScript, addOrReplaceAppDiv(appHtml, html))
          )
        }

        let html = renderHtml(template)
        // let html = template
        //   .replace(`<!--app-html-->`, appHtml)
        //   .replace('<!--product-name-->', options.productName || 'Product name')
        //   // .replace('<!--dev-ssr-css-->', css)
        //   .replace(
        //     '<!--initial-state-->',
        //     `<script>
        //     __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
        //     </script>`
        //   )

        // html = appendToHead(preloadLinks, html)

        if (options.onRendered?.length) {
          for (const ssrFunction of options.onRendered) {
            html = ssrFunction(html, ssrContext)
          }
        }

        res.code(200)
        res.type('text/html')
        res.send(html)
        // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e: any) {
        console.error(e.stack)
        vite && vite.ssrFixStacktrace(e)
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
      const ssrContext: Record<string, any> = {
        req,
        res,
        provide
      }

      const template = readFileSync(
        fileURLToPath(new URL('./dist/ssr/client/index.html', options.appDir))
      ).toString()
      const manifest = JSON.parse(
        readFileSync(
          new URL('./dist/ssr/client/ssr-manifest.json', options.appDir)
        ).toString()
      )
      const render = (
        await import(
          fileURLToPath(
            new URL('./dist/ssr/server/entry-server.mjs', options.appDir)
          )
        )
      ).render

      const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

      if (!ssrContext.initialState) ssrContext.initialState = {}
      ssrContext.initialState.provide = provide

      const initialStateScript = `
      <script>
      __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
      </script>`
      const renderHtml = (html: string) => {
        return appendToHead(
          preloadLinks,
          appendToBody(initialStateScript, addOrReplaceAppDiv(appHtml, html))
        )
      }

      let html = renderHtml(template)

      // let html = template.replace(`<!--app-html-->`, appHtml).replace(
      //   '<!--initial-state-->',
      //   `<script>
      //     __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
      //     </script>`
      // )

      // html = appendToHead(preloadLinks, html)

      if (options.onRendered?.length) {
        for (const ssrFunction of options.onRendered) {
          html = ssrFunction(html, ssrContext)
        }
      }

      res.code(200)
      res.type('text/html')
      res.send(html)
    })
  }

  done()
}

export { fastifySsrPlugin }
export type FastifySsrPlugin = typeof fastifySsrPlugin
