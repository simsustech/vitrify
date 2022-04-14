import { createApp } from '../../../node/vue/server.js'
import { appDir } from '../../../node/app-urls.js'
import { setup } from 'virtual:fastify-setup'

// const appDir = getPkgJsonDir(import.meta.url)
const getString = (str?: string) => str
let baseUrl = getString(__BASE_URL__)

const app = createApp({
  setup,
  appDir,
  baseUrl
})

app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1')
