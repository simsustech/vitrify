import type { Alias, UserConfig as ViteUserConfig, ViteDevServer } from 'vite'
import type { ComponentInternalInstance } from '@vue/runtime-core'
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions
} from 'fastify'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import type { Options as unpluginVueComponentsOptions } from 'unplugin-vue-components'
import type { UserConfig as UnoCSSUserConfig } from '@unocss/core'
import type { VitrifyPlugin } from './plugins/index.js'
import type { Router } from 'vue-router'
import type { App } from '@vue/runtime-core'
import type { Pinia } from 'pinia'
import type { _UseQueryEntryNodeValueSerialized } from '@pinia/colada'

export type SSRContext = {
  // Quasar requires req and res on SSRContext instead of request and reply
  req:
    | FastifyRequest
    | {
        headers: Record<string, unknown>
        url: string
      }
  res: FastifyReply | Record<string, unknown>
  provide: Record<string, unknown>
  initialState: {
    provide?: Record<string, unknown>
    pinia?: Record<string, unknown>
    piniaColada?: Record<string, _UseQueryEntryNodeValueSerialized>
    [key: string]: unknown
  }
  pinia?: Pinia
  // Quasar internals
  _modules: Set<unknown>
  _meta: Record<string, any>
  __qMetaList: unknown[]
  /**
   * Required for Quasar
   */
  onRenderedList: (() => unknown)[]
  onRendered: (fn: () => unknown) => void
  /**
   * Vue internals
   */
  modules?: Map<unknown, unknown>
  transports?: Record<string, unknown>
  [key: string]: unknown
}

export type OnAppCreatedHookFile = URL
export type OnAppCreatedHook = ({
  app,
  router,
  ctx,
  initialState,
  ssrContext,
  staticImports
}: {
  app: App
  router: Router
  ctx: {
    pinia?: Pinia
    [key: string]: unknown
  }
  initialState: {
    provide?: Record<string, unknown>
    pinia?: Record<string, unknown>
    piniaColada?: Record<string, _UseQueryEntryNodeValueSerialized>
    [key: string]: unknown
  }
  ssrContext?: SSRContext
  staticImports?: Record<string, any>
}) => Promise<void> | void

export type OnAppMountedHookFile = URL
export type OnAppMountedHook = ({
  instance
}: {
  instance: ComponentInternalInstance
}) => Promise<void> | void
export type StaticImports = Record<string, string[]>

export type OnSetupHookFile = URL
export type OnSetupHook = (
  fastify: FastifyInstance,
  options?: {
    vite?: ViteDevServer
  }
) => any

export type Render = (
  url: string,
  manifest: Record<string, unknown>,
  ssrContext: SSRContext,
  renderToString: (app: App, ctx?: Record<string, any>) => Promise<string>
) => Promise<{
  html: string
  preloadLinks: string
  app: App
}>

export type OnAppRenderedHookFile = URL
export type OnAppRenderedHook = ({
  app,
  ssrContext
}: {
  app: App
  ssrContext?: SSRContext
}) => Promise<void> | void

export type OnTemplateRenderedHookFile = URL
export type OnTemplateRenderedHook = ({
  html,
  ssrContext
}: {
  html: string
  ssrContext?: SSRContext
}) => Promise<string> | string

export interface VitrifyConfig extends ViteUserConfig {
  vitrify?: {
    lang?: string
    /**
     * Vitrify plugins
     */
    plugins?: VitrifyPluginConfig[]
    /**
     * Global CSS imports
     */
    globalCss?: string[]
    /**
     * Static imports in the app: packageName: [imports]
     */
    staticImports?: StaticImports
    hooks?: {
      /**
       * setup() is called directly after instantiating fastify. Use it to register your own plugins, routes etc.
       */
      onSetup?: OnSetupHookFile[]
      /**
       * Functions which run directly after initializing the application
       */
      onAppCreated?: OnAppCreatedHook[]
      /**
       * Functions which run directly after initializing the application
       */
      onAppCreatedFiles?: OnAppCreatedHookFile[]
      /**
       * Functions which run in the onMounted hook of the app
       */
      onAppMounted?: OnAppMountedHook[]
      /**
       * Files with functions which run in the onMounted hook of the app
       */
      onAppMountedFiles?: OnAppMountedHookFile[]
      /**
       * Functions which run after rendering the app (SSR)
       */
      onAppRendered?: OnAppRenderedHook[]
      /**
       * Files with functions which run after rendering the app (SSR)
       */
      onAppRenderedFiles?: OnAppRenderedHookFile[]
      /**
       * Functions which run after rendering the template (SSR)
       */
      onTemplateRendered?: OnTemplateRenderedHook[]
      /**
       * Files with functions which run after rendering the template (SSR)
       */
      onTemplateRenderedFiles?: OnTemplateRenderedHookFile[]
    }
    /**
     * Global SASS variables
     */
    sass?: {
      variables?: Record<string, string | undefined>
      global?: string[]
    }
    /**
     * Product name of the application. Will be used for the HTML title tag
     */
    productName?: string
    /**
     * URL's for common dev paths and packages, automatically generated
     */
    urls?: {
      app?: URL
      cli?: URL
      src?: URL
      cwd?: URL
      packages?: Record<string, URL>
    }
    /**
     * SSR specific configuration
     */
    ssr?: {
      /**
       * Packages which should not be bundled but installed on the server instead.
       */
      serverModules?: string[]
      fastify?: FastifyServerOptions
    }
    /**
     * Development only configuration
     */
    dev?: {
      alias?: Alias[]
    }
    /**
     * Files which should be a seperate chunk
     */
    manualChunks?: string[]
    /**
     * Enables vite-plugin-pwa
     */
    pwa?: Partial<VitePWAOptions>
    /**
     * UnoCSS Configuration
     */
    unocss?: UnoCSSUserConfig
    /**
     * unplugin-vue-components configuration
     */
    unpluginVueComponents?: unpluginVueComponentsOptions
  }
}

export type VitrifyCommands = 'build' | 'dev' | 'test'
export type VitrifyModes = 'production' | 'development'
export type VitrifyUIFrameworks = 'vue'
export type VitrifySSRModes = 'client' | 'server' | 'ssg' | 'fastify'

export type VitrifyConfigAsync = ({
  mode,
  command
}: {
  mode: VitrifyModes
  command: VitrifyCommands
}) => Promise<VitrifyConfig>

type VitrifyPluginConfig = {
  plugin: VitrifyPlugin<any>
  options: any
}

export const defineConfig = (config: VitrifyConfig) => config
