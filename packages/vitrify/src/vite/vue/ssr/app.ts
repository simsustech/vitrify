import { createApp } from '../../../node/frameworks/vue/server.js'
import { getAppDir } from '../../../node/app-urls.js'
// import { setup } from 'virtual:fastify-setup'
import { onSetup, onRendered } from 'virtual:vitrify-hooks'
import { fastifySsrPlugin } from './fastify-ssr-plugin.js'
import type { ViteDevServer } from 'vite'

// const appDir = getPkgJsonDir(import.meta.url)
const getString = (str?: string) => str
let baseUrl = getString(__BASE_URL__)
const appDir = getAppDir()

export const setupApp = async () => {
  // const vitrifyDir = new URL('../', await resolve('vitrify', new URL(import.meta.url)))
  return createApp({
    onSetup,
    appDir,
    baseUrl,
    fastifyPlugin: fastifySsrPlugin,
    onRendered,
    // vitrifyDir,
    mode: import.meta.env.MODE
  })
}

export { onRendered }
