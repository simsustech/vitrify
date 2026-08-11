import type { OnAppCreatedHook } from '../../vitrify-config.js'
import { PiniaColada, hydrateQueryCache, useQueryCache } from '@pinia/colada'

const piniaColadaonAppCreated: OnAppCreatedHook = async ({
  app,
  ctx,
  initialState
}) => {
  if (ctx.pinia) {
    app.use(PiniaColada)

    if (initialState?.piniaColada) {
      app.runWithContext(() =>
        hydrateQueryCache(
          useQueryCache(ctx.pinia),
          initialState.piniaColada || {}
        )
      )
    }
  }
}

export default piniaColadaonAppCreated
