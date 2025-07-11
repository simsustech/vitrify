import fastify from 'fastify'
import type {
  OnTemplateRenderedHook,
  OnSetupHook,
  OnAppRenderedHook
} from '../../vitrify-config.js'
import type { FastifyCsrPlugin } from './fastify-csr-plugin.js'
import type { FastifySsrPlugin } from './fastify-ssr-plugin.js'

export const createApp = ({
  onSetup,
  appDir,
  baseUrl,
  fastifyPlugin,
  onAppRendered,
  onTemplateRendered,
  vitrifyDir,
  mode
}: {
  onSetup: OnSetupHook[]
  appDir: URL
  baseUrl?: string
  fastifyPlugin: FastifySsrPlugin | FastifyCsrPlugin
  onAppRendered?: OnAppRenderedHook[]
  onTemplateRendered?: OnTemplateRenderedHook[]
  vitrifyDir?: URL
  mode: string
}) => {
  const app = fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger'
      },
      level: process.env.DEBUG ? 'debug' : process.env.PINO_LOG_LEVEL || 'info'
    }
  })

  app.register(fastifyPlugin, {
    baseUrl,
    appDir,
    vitrifyDir,
    onAppRendered,
    onTemplateRendered,
    mode
  })

  if (onSetup?.length) {
    for (const setup of onSetup) {
      setup(app)
    }
  }

  return app
}
