import HelloWorld from './components/HelloWorld.vue'

import { loadLang } from './lang.js'

function install(app: any, options: { lang: string }) {
  loadLang(options?.lang || 'en-us')
  app.component(HelloWorld.name, HelloWorld)
}

export { install }
