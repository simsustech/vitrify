import type { FastifyInstance } from 'fastify'
import { hooks } from 'virtual:vitrify-hooks'
export { default as vitrifyConfig } from 'virtual:vitrify-config'

export const setup = async ({ fastify }: { fastify: FastifyInstance }) => {
  if (hooks.onSetup?.length) {
    for (const setup of hooks.onSetup) {
      await setup(fastify)
    }
  }
  return fastify
}

export { hooks }
