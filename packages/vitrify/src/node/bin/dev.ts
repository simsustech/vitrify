import type { ViteDevServer, LogLevel } from 'vite'
import { searchForWorkspaceRoot } from 'vite'
import { baseConfig } from '../index.js'
import type { Server } from 'net'
import type { FastifyInstance } from 'fastify/types/instance'
import fastify from 'fastify'
import { readFileSync } from 'fs'

export async function createServer({
  port = 3000,
  logLevel = 'info',
  mode = 'csr',
  framework = 'vue',
  host,
  appDir,
  publicDir
}: {
  port?: number
  logLevel?: LogLevel
  mode?: 'csr' | 'ssr'
  framework?: 'vue'
  host?: string
  appDir?: URL
  publicDir?: URL
}) {
  const { appDir: tempAppDir, cliDir } = await import('../app-urls.js')
  const cwd = appDir || tempAppDir
  if (!appDir) appDir = tempAppDir
  const { fastifySsrPlugin } = await import(
    `../${framework}/fastify-ssr-plugin.js`
  )

  /**
   * @type {import('vite').ViteDevServer}
   */
  const config = await baseConfig({
    ssr: mode === 'ssr' ? 'server' : undefined,
    command: 'dev',
    mode: 'development',
    appDir,
    publicDir
  })
  config.logLevel = logLevel
  config.server = {
    port,
    middlewareMode: mode === 'ssr' ? 'ssr' : undefined,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        searchForWorkspaceRoot(cliDir.pathname)
        // appDir.pathname,
      ]
    },
    watch: {
      // During tests we edit the files too fast and sometimes chokidar
      // misses change events, so enforce polling for consistency
      usePolling: true,
      interval: 100
    },
    host
  }
  const vite = await (
    await import('vite')
  ).createServer({
    configFile: false,
    ...config
  })
  const { productName = 'Product name' } = JSON.parse(
    readFileSync(new URL('package.json', appDir).pathname, {
      encoding: 'utf-8'
    })
  )

  let app: ViteDevServer | FastifyInstance
  let server: Server
  if (mode === 'ssr') {
    console.log('SSR mode')
    app = fastify()
    await app.register(fastifySsrPlugin, {
      appDir,
      cliDir,
      vite,
      productName
    })
    // await app.register(middie)
    // app.use(vite.middlewares)

    // app.get('*', async (req, res) => {
    //   try {
    //     // const url = req.originalUrl
    //     const url = req.raw.url
    //     let template
    //     let render
    //     const ssrContext = {
    //       req,
    //       res
    //     }
    //     // always read fresh template in dev
    //     // template = readFileSync(resolve('index.html'), 'utf-8')
    //     template = readFileSync(new URL('index.html', cliDir)).toString()

    //     // template = await vite.transformIndexHtml(url, template)
    //     const entryUrl = new URL('ssr/entry-server.ts', cliDir).pathname
    //     render = (await vite.ssrLoadModule(entryUrl)).render
    //     let manifest
    //     // TODO: https://github.com/vitejs/vite/issues/2282
    //     try {
    //       manifest = {}
    //     } catch (e) {
    //       manifest = {}
    //     }

    //     const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)
    //     const html = template
    //       .replace(`<!--preload-links-->`, preloadLinks)
    //       .replace(`<!--app-html-->`, appHtml)
    //       .replace('<!--product-name-->', productName)

    //     res.code(200)
    //     res.type('text/html')
    //     res.send(html)
    //     // res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    //   } catch (e: any) {
    //     console.error(e.stack)
    //     vite && vite.ssrFixStacktrace(e)
    //     res.code(500)
    //     res.send(e.stack)
    //   }
    // })
    await app.listen(port || 3000, host)
    server = app.server
  } else {
    server = (await vite.listen()).httpServer as Server
  }
  return { server, vite }
}
