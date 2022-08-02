import type { FastifyInstance } from 'fastify'
import { onSetup } from 'virtual:vitrify-hooks'
export { default as vitrifyConfig } from 'virtual:vitrify-config'

export const setup = async ({ fastify }: { fastify: FastifyInstance }) => {
  if (onSetup?.length) {
    for (const setup of onSetup) {
      await setup(fastify)
    }
  }
  return fastify
}
