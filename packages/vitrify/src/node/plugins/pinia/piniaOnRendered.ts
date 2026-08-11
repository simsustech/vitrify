import type { OnAppRenderedHook } from '../../vitrify-config.js'

const piniaonAppRenderedHook: OnAppRenderedHook = async ({
  app,
  ssrContext
}) => {
  // SSR Server
  if (ssrContext?.initialState && ssrContext.pinia) {
    ssrContext.initialState.pinia = ssrContext.pinia.state.value
  }
}

export default piniaonAppRenderedHook
