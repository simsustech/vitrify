// import type { OnAppCreatedHook, OnRenderedHook } from '../../vitrify-config.js'
import type { VitrifyPlugin } from '../index.js'

export type PiniaPluginOptions = {
  // Initialize Pinia Colada
  colada?: boolean
}

// const piniaOnAppCreated: OnAppCreatedHook = async ({
//   app,
//   ctx,
//   initialState,
//   ssrContext
// }) => {
//   const { createPinia } = await import('pinia')
//   const pinia = createPinia()
//   ctx.pinia = pinia
//   app.use(pinia)

//   // SSR Client
//   if (initialState?.pinia) pinia.state.value = initialState.pinia
//   // SSR Server
//   if (ssrContext) ssrContext.pinia = pinia
// }

// const piniaOnRenderedHook: OnRenderedHook = async ({ app, ssrContext }) => {
//   // SSR Server
//   if (ssrContext?.initialState && ssrContext.pinia) {
//     ssrContext.initialState.pinia = ssrContext.pinia.state.value
//   }
// }

// const piniaColadaonAppCreated: OnAppCreatedHook = async ({
//   app,
//   ctx,
//   initialState
// }) => {
//   if (ctx.pinia) {
//     const { PiniaColada, hydrateQueryCache, useQueryCache } = await import(
//       '@pinia/colada'
//     )
//     app.use(PiniaColada)

//     if (initialState?.piniaColada) {
//       app.runWithContext(() =>
//         hydrateQueryCache(
//           useQueryCache(ctx.pinia),
//           initialState.piniaColada || {}
//         )
//       )
//     }
//   }
// }

// const piniaColadaOnRenderedHook: OnRenderedHook = async ({
//   app,
//   ssrContext
// }) => {
//   // SSR Server
//   if (ssrContext?.initialState && ssrContext.pinia) {
//     const { useQueryCache, serializeQueryCache } = await import('@pinia/colada')

//     // Delete to prevent Non-POJO error
//     if (ssrContext.initialState.pinia?._pc_query) {
//       delete ssrContext.initialState.pinia._pc_query
//     }
//     ssrContext.initialState.piniaColada = app.runWithContext(() =>
//       serializeQueryCache(useQueryCache())
//     )
//   }
// }

export const PiniaPlugin: VitrifyPlugin<PiniaPluginOptions> = async ({
  ssr = false,
  pwa = false,
  options = {}
}) => {
  const piniaOnAppCreatedURL = new URL(
    './piniaOnAppCreated.js',
    import.meta.url
  )
  const piniaColadaonAppCreatedURL = new URL(
    './piniaColadaOnAppCreated.js',
    import.meta.url
  )
  const piniaOnRenderedURL = new URL('piniaOnRendered.js', import.meta.url)
  const piniaColadaOnRenderedURL = new URL(
    'piniaColadaOnRendered.js',
    import.meta.url
  )

  const onAppCreatedFiles = [piniaOnAppCreatedURL]
  const onRenderedFiles = [piniaOnRenderedURL]
  if (options.colada) {
    onAppCreatedFiles.push(piniaColadaonAppCreatedURL)
    onRenderedFiles.push(piniaColadaOnRenderedURL)
  }

  return {
    plugins: [],
    config: {
      vitrify: {
        ssr: {
          // serverModules: ['@pinia/colada']
        },
        hooks: {
          onAppCreatedFiles,
          onRenderedFiles
        }
      }
    }
  }
}
