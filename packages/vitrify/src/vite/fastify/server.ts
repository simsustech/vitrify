import Fastify from 'fastify'
import { setup } from './entry'

const fastify = Fastify()
await setup({ fastify })

fastify.listen({
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || '127.0.0.1'
})
