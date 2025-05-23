import createRouter from 'src/router'
import { App, createSSRApp, createApp as createVueApp, ref } from 'vue'
import { onBoot, onCreateApp } from 'virtual:vitrify-hooks'
import routes from 'src/router/routes'
import * as staticImports from 'virtual:static-imports'
import 'virtual:uno.css'

import RootComponent from './RootComponent.vue'

declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}

interface ssrContext {
  provide?: Record<string, unknown>
  [key: string]: unknown
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function createApp(
  ssr?: 'client' | 'server',
  ssrContext: ssrContext = {}
) {
  const initialState: Record<string, any> | null =
    !import.meta.env.SSR && window.__INITIAL_STATE__
      ? JSON.parse(window.__INITIAL_STATE__)
      : null

  // Delete for security reasons
  if (!import.meta.env.SSR && window.__INITIAL_STATE__)
    delete window.__INITIAL_STATE__

  let provide: Record<string, any> = {}
  if (import.meta.env.SSR) {
    if (ssrContext.provide) {
      provide = ssrContext?.provide
    }
  } else {
    if (initialState) {
      provide = initialState.provide
    }
  }

  let app: App

  if (ssr) {
    app = createSSRApp(RootComponent)
  } else {
    app = createVueApp(RootComponent)
  }

  const router = createRouter()
  app.use(router)

  const onCreateAppCtx = {}
  for (const fn of onCreateApp) {
    await fn({ app, router, initialState, ctx: onCreateAppCtx })
  }

  // Workaround to fix hydration errors when serving html files directly
  router.beforeEach((to, from, next) => {
    if (to.path.endsWith('.html')) {
      return next({ path: to.path.replace('.html', '') })
    }

    next()
  })

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
