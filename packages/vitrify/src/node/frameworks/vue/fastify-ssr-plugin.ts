import type {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import fastifyStatic from '@fastify/static'
import { readFileSync } from 'fs'
import { componentsModules, collectCss } from '../../helpers/collect-css-ssr.js'
import { appendToHead } from '../../helpers/utils.js'
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
  productName?: string
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
    // if (!options.vitrifyDir)
    //   throw new Error('Option vitrifyDir cannot be undefined')
    // if (!options.vite) throw new Error('Option vite cannot be undefined')
    // const { resolve } = await import('import-meta-resolve')
    // const cliDir = new URL('../', await resolve('vitrify', import.meta.url))
    options.appDir = options.appDir || new URL('../../..', import.meta.url)

    const { createVitrifyDevServer } = await import('vitrify/dev')
    const vite = await createVitrifyDevServer({
      appDir: options.appDir,
      ssr: 'ssr',
      framework: 'vue',
      base: options.baseUrl,
      host: options.host
    })
    // const { createServer, searchForWorkspaceRoot } = await import('vite')
    // const { baseConfig } = await import('vitrify')
    // const cliDir = options.vitrifyDir
    // const config = await baseConfig({
    //   ssr: 'server',
    //   command: 'dev',
    //   mode: 'development',
    //   appDir: options.appDir,
    //   publicDir: options.publicDir || new URL('public', options.appDir)
    // })

    // config.server = {
    //   middlewareMode: true,
    //   fs: {
    //     allow: [
    //       searchForWorkspaceRoot(process.cwd()),
    //       searchForWorkspaceRoot(options.appDir.pathname),
    //       searchForWorkspaceRoot(cliDir.pathname)
    //       // appDir.pathname,
    //     ]
    //   },
    //   watch: {
    //     // During tests we edit the files too fast and sometimes chokidar
    //     // misses change events, so enforce polling for consistency
    //     usePolling: true,
    //     interval: 100
    //   }
    // }
    // const vite = await createServer({
    //   configFile: false,
    //   ...config
    // })

    if (!('use' in fastify)) {
      const middie = (await import('@fastify/middie')).default
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

        const entryUrl = new URL('ssr/entry-server.ts', frameworkDir).pathname
        const render = (await vite!.ssrLoadModule(entryUrl)).render
        let manifest
        // TODO: https://github.com/vitejs/vite/issues/2282
        try {
          manifest = {}
        } catch (e) {
          manifest = {}
        }

        const cssModules = [entryUrl]
        // // @ts-ignore
        // if (options.vite?.config.vitrify!.globalCss)
        //   cssModules.push(...options.vite?.config.vitrify.globalCss)
        const matchedModules = componentsModules(cssModules, vite!)
        const css = collectCss({
          mods: matchedModules
        })

        const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

        if (!ssrContext.initialState) ssrContext.initialState = {}
        ssrContext.initialState.provide = provide

        let html = template
          .replace(`<!--app-html-->`, appHtml)
          .replace('<!--product-name-->', options.productName || 'Product name')
          .replace('<!--dev-ssr-css-->', css)
          .replace(
            '<!--initial-state-->',
            `<script>
            __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
            </script>`
          )

        html = appendToHead(preloadLinks, html)

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
      root: new URL('./dist/ssr/client', options.appDir).pathname,
      wildcard: false,
      index: false,
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

      let html = template.replace(`<!--app-html-->`, appHtml).replace(
        '<!--initial-state-->',
        `<script>
          __INITIAL_STATE__ = '${JSON.stringify(ssrContext.initialState)}'
          </script>`
      )

      html = appendToHead(preloadLinks, html)

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
