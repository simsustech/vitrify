import { createApp } from '../../../node/frameworks/vue/server.js'
import { getAppDir } from '../../../node/app-urls.js'
// import { setup } from 'virtual:fastify-setup'
import { onRendered, onSetup } from 'virtual:vitrify-hooks'
import { fastifyCsrPlugin } from './fastify-csr-plugin.js'
import type { ViteDevServer } from 'vite'
import * as imr from 'import-meta-resolve'
const { resolve } = imr
// const appDir = getPkgJsonDir(import.meta.url)
const getString = (str?: string) => str
let baseUrl = getString(__BASE_URL__)
const appDir = getAppDir()

export const setupApp = async () => {
  const vitrifyDir = new URL('../', await resolve('vitrify', import.meta.url))
  return createApp({
    onSetup,
    appDir,
    baseUrl,
    onRendered,
    fastifyPlugin: fastifyCsrPlugin,
    vitrifyDir,
    mode: import.meta.env.MODE
  })
}
