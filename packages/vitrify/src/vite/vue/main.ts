// import 'vitrify.sass'
import createRouter from 'src/router'
import {
  createSSRApp,
  createApp as createVueApp,
  h,
  onMounted as onMountedVue,
  getCurrentInstance,
  ref
} from 'vue'
import { onBoot, onMounted } from 'virtual:vitrify-hooks'
import routes from 'src/router/routes'
import * as staticImports from 'virtual:static-imports'
import App from 'src/App.vue'

import RootComponent from './RootComponent.vue'
interface ssrContext {
  ssr: boolean
  provide?: Record<string, unknown>
  [key: string]: unknown
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function createApp(
  ssr?: 'client' | 'server',
  ssrContext?: ssrContext
) {
  let app

  if (ssr) {
    app = createSSRApp(RootComponent)
  } else {
    app = createVueApp(RootComponent)
  }
  const router = createRouter()
  app.use(router)

  // Workaround to fix hydration errors when serving html files directly
  router.beforeEach((to, from, next) => {
    if (to.path.endsWith('.html')) {
      return next({ path: to.path.replace('.html', '') })
    }

    next()
  })

  let initialState: Record<string, any>
  let provide: Record<string, any> = {}
  if (import.meta.env.SSR) {
    if (ssrContext?.provide) {
      provide = ssrContext?.provide
    }
  } else {
    // @ts-ignore
    if (window.__INITIAL_STATE__) {
      // @ts-ignore
      initialState = JSON.parse(window.__INITIAL_STATE__)
      provide = initialState.provide
    }
  }
  for (let key in provide) {
    if (provide[key]?.value) {
      const refValue = ref(provide[key].value)
      app.provide(key, refValue)
      app.provide(
        `update${capitalizeFirstLetter(key)}`,
        (val: any) => (refValue.value = val)
      )
    } else {
      app.provide(key, provide[key])
    }
  }

  for (let fn of onBoot) {
    await fn({ app, ssrContext, staticImports })
  }

  // @vitrify-pwa-only
  if (__IS_PWA__) {
    if (typeof window !== 'undefined') {
      const { registerPWA } = await import('./pwa.js')
      registerPWA(router)
    }
  }
  // @vitrify-pwa-only-end

  return { app, router, routes }
}
