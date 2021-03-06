import type {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import fastifyStatic from '@fastify/static'
import type { ViteDevServer } from 'vite'

export interface FastifySsrOptions {
  baseUrl?: string
  provide?: (
    req: FastifyRequest,
    res: FastifyReply
  ) => Promise<Record<string, unknown>>
  vitrifyDir?: URL
  vite?: ViteDevServer
  // frameworkDir?: URL
  appDir?: URL
  publicDir?: URL
  productName?: string
  mode?: string
}

const fastifyCsrPlugin: FastifyPluginCallback<FastifySsrOptions> = async (
  fastify,
  options,
  done
) => {
  options.vitrifyDir =
    options.vitrifyDir || (await import('vitrify')).vitrifyDir
  const frameworkDir = new URL('src/vite/vue/', options.vitrifyDir)
  options.baseUrl = options.baseUrl || '/'
  options.mode = options.mode || process.env.MODE || import.meta.env.MODE
  options.appDir = options.appDir || new URL('../../..', import.meta.url)

  if (
    options.baseUrl.charAt(options.baseUrl.length - 1) !== '/' ||
    options.baseUrl.charAt(0) !== '/'
  )
    throw new Error('baseUrl should start and end with a /')
  if (options.mode === 'development') {
    options.appDir = options.appDir || new URL('../..', import.meta.url)

    const { createVitrifyDevServer } = await import('vitrify/dev')
    const vite = await createVitrifyDevServer({
      appDir: options.appDir,
      framework: 'vue',
      base: options.baseUrl
    })

    console.log('Dev mode')
    if (!('use' in fastify)) {
      const middie = (await import('@fastify/middie')).default
      await fastify.register(middie)
    }
    fastify.use(vite.middlewares)
  } else {
    options.appDir = options.appDir || new URL('../../..', import.meta.url)
    fastify.register(fastifyStatic, {
      root: new URL('./dist/csr', options.appDir).pathname,
      wildcard: false,
      index: false,
      prefix: options.baseUrl
    })
  }
  done()
}

export { fastifyCsrPlugin }
export type FastifyCsrPlugin = typeof fastifyCsrPlugin
