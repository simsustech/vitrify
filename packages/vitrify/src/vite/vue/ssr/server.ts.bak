import fastify, { FastifyInstance } from 'fastify'
import { readFileSync } from 'fs'
import fastifyStatic from 'fastify-static'
import { resolve } from 'path'
import sensible from 'fastify-sensible'
import { injectSsrContext } from '../src/helpers/ssr.js'
import { setup } from 'virtual:fastify-setup'
export const createApp = ({
  setup
}: {
  setup: (fastify: FastifyInstance) => any
}) => {
  const app = fastify({
    logger: true
  })

  app.register(sensible)

  setup(app)

  app.register(fastifyStatic, {
    root: resolve('../client'),
    wildcard: false,
    index: false
  })

  app.get('*', async (req, res) => {
    const url = req.raw.url

    let template
    let render
    let manifest
    const ssrContext = {
      req,
      res
    }
    template = readFileSync(resolve('../client/index.html')).toString()
    manifest = JSON.parse(readFileSync(resolve('../client/ssr-manifest.json')).toString())
    render = (await import(resolve('./entry-server.mjs'))).render

    const [appHtml, preloadLinks] = await render(url, manifest, ssrContext)

    let html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)
      .replace('<!--initial-state-->', ssrContext.initialState)
    html = injectSsrContext(html, ssrContext)

    res.code(200)
    res.type('text/html')
    res.send(html)
  })

  return app
}

const app = createApp({
  setup
})

app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1')