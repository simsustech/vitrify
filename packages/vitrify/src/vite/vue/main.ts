import App from 'src/App.vue'
import createRouter from 'src/router'
import {
  createSSRApp,
  createApp as createVueApp,
  h,
  onMounted as onMountedVue,
  getCurrentInstance
} from 'vue'
// import { Quasar, useQuasar } from 'quasar'
// import quasarPlugins from 'virtual:quasar-plugins'
// import bootFunctions from 'virtual:quasar-boot'
import { onBoot, onMounted } from 'virtual:vitrify-hooks'
// import bootFunctions from 'virtual:boot-functions'
// import onMountedHooks from 'virtual:on-mounted-hooks'
// import 'virtual:quasar-extras'
// import * as directives from 'quasar/directives'
import routes from 'src/router/routes'
import 'virtual:global-css'
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
        // onAppMounted()
        // const { proxy: { $q } } = getCurrentInstance()
        // $q.onSSRHydrated !== void 0 && $q.onSSRHydrated()
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
      next({ path: to.path.replace('.html', '') })
    }

    next()
  })

  // app.use(Quasar, {
  //   plugins: quasarPlugins,
  //   directives
  // }, ssrContext)

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
