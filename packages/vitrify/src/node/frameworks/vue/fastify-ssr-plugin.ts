import type {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import fastifyStatic from 'fastify-static'
import { readFileSync } from 'fs'
import type { ViteDevServer } from 'vite'
import type { OnRenderedHook } from '../../vitrify-config.js'

export interface FastifySsrOptions {
  baseUrl?: string
  provide?: (
    req: FastifyRequest,
    res: FastifyReply
  ) => Promise<Record<string, unknown>>
  vite?: ViteDevServer
  cliDir?: URL
  appDir?: URL
  productName?: string
  onRenderedHooks?: OnRenderedHook[]
}

const fastifySsrPlugin: FastifyPluginCallback<FastifySsrOptions> = async (
  fastify,
  options,
  done
) => {
  if (import.meta.env.MODE === 'development') {
    if (!options.vite) throw new Error('Option vite cannot be undefined')
    const middie = (await import('middie')).default
    await fastify.register(middie)
    fastify.use(options.vite.middlewares)

    fastify.get('*', async (req, res) => {
      try {
        const url = req.raw.url
        const ssrContext = {
          req,
          res
        }
        const template = readFileSync(
          new URL('index.html', options.cliDir)
        ).toString()

        const entryUrl = new URL('ssr/entry-server.ts', options.cliDir).pathname
        const render = (await options.vite!.ssrLoadModule(entryUrl)).render
        let manifest
        // TODO: https://github.com/vitejs/vite/issues/2282
        try {
          manifest = {}
        } catch (e) {
          manifest = {}
        }

        const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)
        const html = template
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace(`<!--app-html-->`, appHtml)
          .replace('<!--product-name-->', options.productName || 'Product name')

        res.code(200)
        res.type('text/html')
        res.send(html)
        // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e: any) {
        console.error(e.stack)
        options.vite && options.vite.ssrFixStacktrace(e)
        res.code(500)
        res.send(e.stack)
      }
    })
  } else {
    options.baseUrl = options.baseUrl || '/'
    fastify.register(fastifyStatic, {
      root: new URL('./dist/ssr/client', options.appDir).pathname,
      wildcard: false,
      index: false,
      prefix: options.baseUrl
    })

    fastify.get(`${options.baseUrl}*`, async (req, res) => {
      const url = req.raw.url
      const provide = options.provide ? await options.provide(req, res) : {}
      const ssrContext: Record<string, any> = {
        req,
        res,
        provide
      }

      const template = readFileSync(
        new URL('./dist/ssr/client/index.html', options.appDir).pathname
      ).toString()
      const manifest = JSON.parse(
        readFileSync(
          new URL('./dist/ssr/client/ssr-manifest.json', options.appDir)
        ).toString()
      )
      const render = (
        await import(
          new URL('./dist/ssr/server/entry-server.mjs', options.appDir).pathname
        )
      ).render

      const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

      if (!ssrContext.initialState) ssrContext.initialState = {}
      ssrContext.initialState.provide = provide

      let html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      if (options.onRenderedHooks?.length) {
        for (const ssrFunction of options.onRenderedHooks) {
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
