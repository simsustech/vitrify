import type { OnAppRenderedHook } from '../../vitrify-config.js'
import { useQueryCache, serializeQueryCache } from '@pinia/colada'

const piniaColadaonAppRenderedHook: OnAppRenderedHook = async ({
  app,
  ssrContext
}) => {
  // SSR Server
  if (ssrContext?.initialState && ssrContext.pinia) {
    // Delete to prevent Non-POJO error
    if (ssrContext.initialState.pinia?._pc_query) {
      delete ssrContext.initialState.pinia._pc_query
    }
    ssrContext.initialState.piniaColada = app.runWithContext(() =>
      serializeQueryCache(useQueryCache())
    )
  }
}

export default piniaColadaonAppRenderedHook
