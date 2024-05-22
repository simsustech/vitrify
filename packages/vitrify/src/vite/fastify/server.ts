import Fastify from 'fastify'
import { setup, vitrifyConfig } from './entry'

const fastify = Fastify({
  logger: true,
  ...vitrifyConfig.vitrify?.ssr.fastify
})
await setup({ fastify })

fastify.listen({
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || 'localhost'
})
