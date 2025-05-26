import createRouter from 'src/router'
import { App, createSSRApp, createApp as createVueApp, ref } from 'vue'
import { onBoot, onAppCreated } from 'virtual:vitrify-hooks'
import routes from 'src/router/routes'
import * as staticImports from 'virtual:static-imports'
import 'virtual:uno.css'
import RootComponent from './RootComponent.vue'
import { parse } from 'devalue'
import type { SSRContext } from '../../node/vitrify-config'
import type { Pinia } from 'pinia'

declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function createApp(
  ssr?: 'client' | 'server',
  ssrContext?: SSRContext
) {
  let initialState: Record<string, any> | null = null

  if (!import.meta.env.SSR && window?.__INITIAL_STATE__) {
    initialState = window.__INITIAL_STATE__

    for (const key in initialState) {
      if (key === 'provide' || key === 'piniaColada') {
        initialState[key] = JSON.parse(initialState[key])
      } else {
        initialState[key] = parse(initialState[key], {
          PiniaColada_TreeMapNode: (data) => data
        })
      }
    }
  }

  // Delete for security reasons
  if (!import.meta.env.SSR && window.__INITIAL_STATE__)
    delete window.__INITIAL_STATE__

  let provide: Record<string, any> = {}
  if (import.meta.env.SSR) {
    if (ssrContext?.provide) {
      provide = ssrContext?.provide
    }
  } else {
    if (initialState) {
      provide = initialState.provide
    }
  }

  let app: App
  const ctx: {
    pinia?: Pinia
    [key: string]: unknown
  } = {}

  if (ssr) {
    app = createSSRApp(RootComponent)
  } else {
    app = createVueApp(RootComponent)
  }

  const router = createRouter()
  app.use(router)

  for (const fn of onAppCreated) {
    await fn({ app, router, ctx, initialState, ssrContext })
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
