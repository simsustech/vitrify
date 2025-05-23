import type { OnCreateAppHook, OnRenderedHook } from '../../vitrify-config.js'
import { VitrifyPlugin } from '../index.js'

export type PiniaPluginOptions = unknown

const piniaOnCreateApp: OnCreateAppHook = async ({
  app,
  initialState,
  ssrContext
}) => {
  const { createPinia } = await import('pinia')
  const pinia = createPinia()
  app.use(pinia)

  // SSR
  if (initialState?.pinia) pinia.state.value = initialState.pinia
  if (ssrContext) ssrContext.pinia = pinia
}

const piniaOnRenderedHook: OnRenderedHook = ({ app, ssrContext }) => {
  // SSR
  if (ssrContext?.initialState) {
    ssrContext.initialState.pinia = ssrContext.pinia.state.value
  }
}

export const PiniaPlugin: VitrifyPlugin<PiniaPluginOptions> = async ({
  ssr = false,
  pwa = false,
  options
}) => {
  return {
    plugins: [],
    config: {
      vitrify: {
        hooks: {
          onCreateApp: [piniaOnCreateApp],
          onRendered: [piniaOnRenderedHook]
        }
      }
    }
  }
}
