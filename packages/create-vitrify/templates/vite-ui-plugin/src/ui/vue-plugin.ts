const components = import.meta.glob('./components/*.vue')

import { loadLang } from './lang'

function install(app: any, options: { lang: string }) {
  loadLang(options?.lang || 'en-us')
  for (const path in components) {
    components[path]().then((mod) => {
      // @ts-ignore
      app.component(mod.name, mod)
    })
  }
}

export { install }
