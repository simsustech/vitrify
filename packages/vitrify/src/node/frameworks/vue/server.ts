import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import type { OnRenderedHook } from '../../vitrify-config.js'
import { fastifySsrPlugin } from './fastify-ssr-plugin.js'

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
