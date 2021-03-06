// import 'vitrify.css'
import 'vitrify.sass'
import App from 'src/App.vue'
import createRouter from 'src/router'
import {
  createSSRApp,
  createApp as createVueApp,
  h,
  onMounted as onMountedVue,
  getCurrentInstance
} from 'vue'
import { onBoot, onMounted } from 'virtual:vitrify-hooks'
import routes from 'src/router/routes'
import * as staticImports from 'virtual:static-imports'

interface ssrContext {
  ssr: boolean
  provide?: Record<string, unknown>
  [key: string]: unknown
}

export async function createApp(
  ssr?: 'client' | 'server',
  ssrContext?: ssrContext
) {
  let app
  const RootComponent = {
    name: 'AppWrapper',
    setup(props) {
      const instance = getCurrentInstance()

      onMountedVue(async () => {
        for (let fn of onMounted) {
          await fn(instance, staticImports)
        }
      })

      return () => h(App, props)
    }
  }
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

  let provide: Record<string, unknown> = {}
  if (import.meta.env.SSR) {
    if (ssrContext?.provide) {
      provide = ssrContext?.provide
    }
  } else {
    // @ts-ignore
    provide = window.__INITIAL_STATE__?.provide
  }
  for (let key in provide) {
    app.provide(key, provide[key])
  }

  for (let fn of onBoot) {
    await fn({ app, ssrContext, staticImports })
  }

  return { app, router, routes }
}
