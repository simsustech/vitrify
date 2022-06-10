import type { FastifyInstance } from 'fastify'
import { onSetup } from 'virtual:vitrify-hooks'

export const setup = async ({ fastify }: { fastify: FastifyInstance }) => {
  if (onSetup?.length) {
    for (const setup of onSetup) {
      await setup(fastify)
    }
  }
  return fastify
}
