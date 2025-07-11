import type { FastifyInstance } from 'fastify'

/**
 * Only used in SSR/SSG
 */
export default async function (fastify: FastifyInstance) {
  console.log('Running setup function....')

  fastify.get('/', (request, reply) => {
    reply.send('Hello world!')
  })
}
