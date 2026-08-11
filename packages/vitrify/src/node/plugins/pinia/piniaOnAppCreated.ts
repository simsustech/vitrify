import type { OnAppCreatedHook } from '../../vitrify-config.js'
import { createPinia } from 'pinia'

export type PiniaPluginOptions = {
  // Initialize Pinia Colada
  colada?: boolean
}

const piniaOnAppCreated: OnAppCreatedHook = async ({
  app,
  ctx,
  initialState,
  ssrContext
}) => {
  const pinia = createPinia()
  ctx.pinia = pinia
  app.use(pinia)
  console.log('pinia initialized')

  // SSR Client
  if (initialState?.pinia) pinia.state.value = initialState.pinia
  // SSR Server
  if (ssrContext) ssrContext.pinia = pinia
}

export default piniaOnAppCreated
