import { createApp } from '../../../node/frameworks/vue/server.js'
import { getAppDir } from '../../../node/app-urls.js'
// import { setup } from 'virtual:fastify-setup'
import { onSetup } from 'virtual:vitrify-hooks'
import { fastifyCsrPlugin } from './fastify-csr-plugin'

// const appDir = getPkgJsonDir(import.meta.url)
const getString = (str?: string) => str
const baseUrl = getString(__BASE_URL__)
const appDir = getAppDir()

export const setupApp = async () => {
  // const vitrifyDir = new URL('../', await resolve('vitrify', new URL(import.meta.url)))
  return createApp({
    onSetup,
    appDir,
    baseUrl,
    fastifyPlugin: fastifyCsrPlugin,
    // vitrifyDir,
    mode: import.meta.env.MODE
  })
}
