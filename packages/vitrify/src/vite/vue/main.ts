import createRouter from 'src/router'
import { createSSRApp, createApp as createVueApp, ref } from 'vue'
import { onBoot } from 'virtual:vitrify-hooks'
import routes from 'src/router/routes'
import * as staticImports from 'virtual:static-imports'
import 'virtual:uno.css'

import RootComponent from './RootComponent.vue'
interface ssrContext {
  provide?: Record<string, unknown>
  [key: string]: unknown
}

function capitalizeFirstLetter(string: string) {
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
    // @ts-expect-error undefined
    if (window.__INITIAL_STATE__) {
      // @ts-expect-error undefined
      initialState = JSON.parse(window.__INITIAL_STATE__)
      provide = initialState.provide
    }
  }
  for (const key in provide) {
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

  for (const fn of onBoot) {
    await fn({ app, ssrContext, staticImports })
  }

  // @vitrify-pwa-only
  // @ts-expect-error undefined
  if (__IS_PWA__) {
    if (typeof window !== 'undefined') {
      const { registerPWA } = await import('./pwa.js')
      registerPWA(router)
    }
  }
  // @vitrify-pwa-only-end

  return { app, router, routes }
}
