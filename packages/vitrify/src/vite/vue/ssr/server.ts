import { createApp } from '../../../node/frameworks/vue/server.js'
import { getAppDir } from '../../../node/app-urls.js'
import { setup } from 'virtual:fastify-setup'
import ssrFunctions from 'virtual:ssr-functions'

// const appDir = getPkgJsonDir(import.meta.url)
const getString = (str?: string) => str
let baseUrl = getString(__BASE_URL__)
const appDir = getAppDir()

const app = createApp({
  setup,
  appDir,
  baseUrl,
  ssrFunctions
})

app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1')
