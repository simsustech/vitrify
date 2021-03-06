import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import type { ViteDevServer } from 'vite'
import { getCliDir, getCliViteDir } from '../../app-urls.js'
import type { OnRenderedHook, OnSetupFile } from '../../vitrify-config.js'
import type { FastifyCsrPlugin } from './fastify-csr-plugin.js'
import type { FastifySsrPlugin } from './fastify-ssr-plugin.js'

export const createApp = ({
  onSetup,
  appDir,
  baseUrl,
  fastifyPlugin,
  onRendered,
  vitrifyDir,
  mode
}: {
  onSetup: OnSetupFile[]
  appDir: URL
  baseUrl?: string
  fastifyPlugin: FastifySsrPlugin | FastifyCsrPlugin
  onRendered: OnRenderedHook[]
  vitrifyDir?: URL
  mode: string
}) => {
  const app = fastify({
    logger: true
  })

  app.register(fastifyPlugin, {
    baseUrl,
    appDir,
    vitrifyDir,
    onRendered,
    mode
  })

  // if (onSetup?.length) {
  //   for (const setup of onSetup) {
  //     setup(app)
  //   }
  // }

  return app
}
