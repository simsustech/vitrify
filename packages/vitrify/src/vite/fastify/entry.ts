import type { FastifyInstance } from 'fastify'
import { onSetup } from 'virtual:vitrify-hooks'

export const setup = ({ fastify }: { fastify: FastifyInstance }) => {
  if (onSetup?.length) {
    for (const setup of onSetup) {
      setup(fastify)
    }
  }
  return fastify
}
