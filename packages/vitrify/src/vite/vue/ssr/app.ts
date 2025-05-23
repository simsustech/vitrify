import { createApp } from '../../../node/frameworks/vue/server.js'
import { getAppDir } from '../../../node/app-urls.js'
import { onSetup, onRendered, onTemplateRendered } from 'virtual:vitrify-hooks'
import { fastifySsrPlugin } from './fastify-ssr-plugin.js'

const getString = (str?: string) => str
const baseUrl = getString(__BASE_URL__)
const appDir = getAppDir()

export const setupApp = async () => {
  return createApp({
    onSetup,
    appDir,
    baseUrl,
    fastifyPlugin: fastifySsrPlugin,
    onRendered,
    onTemplateRendered,
    mode: import.meta.env.MODE
  })
}

export { default as vitrifyConfig } from 'virtual:vitrify-config'
export { onRendered, onTemplateRendered }
