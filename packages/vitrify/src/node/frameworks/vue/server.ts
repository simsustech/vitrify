import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import type { OnRenderedHook, SsrFunction } from '../../vitrify-config.js'
// import { setup } from 'virtual:fastify-setup'
import { fastifySsrPlugin } from './fastify-ssr-plugin.js'
// import { getPkgJsonDir } from '../app-urls.js'

export const createApp = ({
  setup,
  appDir,
  baseUrl,
  onRenderedHooks
}: {
  setup: (fastify: FastifyInstance) => any
  appDir: URL
  baseUrl?: string
  onRenderedHooks?: OnRenderedHook[]
}) => {
  const app = fastify({
    logger: true
  })

  app.register(fastifySsrPlugin, {
    baseUrl,
    appDir,
    onRenderedHooks
  })

  setup(app)

  return app
}

// const app = createApp({
//   setup
// })

// app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1')
