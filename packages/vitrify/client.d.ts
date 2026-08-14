/// <reference types="vite/client" />

// Vitrify-specific global constants.
// Replaced at build time via Vite `define`, see `baseConfig()` in `src/node/index.ts`.

declare const __BASE_URL__: string
declare const __HOST__: string
declare const __IS_PWA__: boolean
declare const __DEBUG__: string

// Defined by the Vitrify Quasar plugin
declare const __QUASAR_VERSION__: string
declare const __DEV__: boolean

// Vitrify virtual modules.
// See the "Virtual module system" section of the README for details.

declare module 'virtual:vitrify-hooks' {
  import type { App, ComponentInternalInstance } from 'vue'
  import type { Router } from 'vue-router'

  export const hooks: {
    /**
     * Runs directly after instantiating Fastify (server only)
     */
    onSetup: ((fastify: unknown, options?: { vite?: unknown }) => unknown)[]
    /**
     * Runs directly after initializing the application (client and server)
     */
    onAppCreated: (({
      app,
      router,
      ctx,
      initialState,
      ssrContext,
      staticImports
    }: {
      app: App
      router: Router
      ctx: Record<string, unknown>
      initialState: Record<string, unknown>
      ssrContext?: unknown
      staticImports?: Record<string, unknown>
    }) => Promise<void> | void)[]
    /**
     * Runs in the onMounted hook of the application (client only)
     */
    onAppMounted: (({
      instance
    }: {
      instance: ComponentInternalInstance
    }) => Promise<void> | void)[]
    /**
     * Runs after rendering the application (SSR only)
     */
    onAppRendered: (({
      app,
      ssrContext
    }: {
      app: App
      ssrContext?: unknown
    }) => Promise<void> | void)[]
    /**
     * Runs after rendering the HTML template (SSR only)
     */
    onTemplateRendered: (({
      html,
      ssrContext
    }: {
      html: string
      ssrContext?: unknown
    }) => Promise<string> | string)[]
  }
}

declare module 'virtual:static-imports' {
  // Re-exports configured via `vitrify.staticImports`.
  // The named exports are dynamic, so use a namespace import.
}

declare module 'virtual:vitrify-config' {
  // Full vitrify config serialized as JSON, available at runtime.
  const config: Record<string, unknown>
  export default config
}

// Quasar virtual modules (present when the Vitrify Quasar plugin is enabled)

declare module 'virtual:quasar' {
  export * from 'quasar'
  export const installQuasar: (
    app: unknown,
    options?: unknown,
    ssrContext?: unknown
  ) => unknown
}

declare module 'virtual:quasar-plugins' {
  // Only the user-selected Quasar plugins; the named exports are dynamic.
}

declare module 'virtual:quasar-directives' {
  export * from 'quasar'
}

declare module 'virtual:quasar-lang' {
  const lang: {
    isoName: string
    nativeName: string
    [key: string]: unknown
  }
  export default lang
}

declare module 'virtual:quasar-iconSet' {
  const iconSet: Record<string, unknown> | null
  export default iconSet
}

declare module 'virtual:quasar-iconMapFn' {
  const iconMapFn:
    | ((name: string, iconSet?: unknown, meta?: unknown) => string)
    | null
  export default iconMapFn
}
