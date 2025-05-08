import type { FastifyInstance } from 'fastify'

/**
 * Only used in SSR/SSG
 */
export default async function (fastify: FastifyInstance) {
  fastify.log('Running setup function...')
  console.log('Running setup function...')
}
