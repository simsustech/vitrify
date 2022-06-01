// import { createApp } from '../../../node/frameworks/vue/server.js'
// import { getAppDir } from '../../../node/app-urls.js'
// import { setup } from 'virtual:fastify-setup'
// import { onRendered, onSetup } from 'virtual:vitrify-hooks'
// import { fastifySsrPlugin } from './fastify-ssr-plugin.js'
import { setupApp } from './app.js'
// import * as staticImports from 'virtual:static-imports'
// const appDir = getPkgJsonDir(import.meta.url)
// const getString = (str?: string) => str
// let baseUrl = getString(__BASE_URL__)
// const appDir = getAppDir()

// const app = createApp({
//   onSetup,
//   appDir,
//   baseUrl,
//   onRendered,
//   fastifySsrPlugin,
//   mode: import.meta.env.MODE
// })

const app = await setupApp()

app.listen({
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || '127.0.0.1'
})
