import type { Alias, UserConfig } from 'vite'
import type { QuasarConf } from './plugins/quasar.js'
import type { ComponentInternalInstance } from '@vue/runtime-core'
import type { FastifyServerOptions } from 'fastify'
import { ComponentResolver } from 'unplugin-vue-components'

export type BootFunction = ({
  app,
  ssrContext,
  staticImports
}: {
  app: any
  ssrContext: Record<string, unknown>
  staticImports: Record<string, any>
}) => Promise<void> | void
export type OnBootHook = ({
  app,
  ssrContext,
  staticImports
}: {
  app: any
  ssrContext: Record<string, unknown>
  staticImports?: Record<string, any>
}) => Promise<void> | void
export type OnMountedHook = (
  instance: ComponentInternalInstance
) => Promise<void> | void
export type StaticImports = Record<string, string[]>
export type SsrFunction = (
  html: string,
  ssrContext: Record<string, any>
) => string
export type OnRenderedHook = (
  html: string,
  ssrContext: Record<string, any>
) => string
// export type OnSetupHook = (
//   fastify: FastifyInstance,
//   staticImports?: Record<string, any>
// ) => any
export type OnSetupFile = URL
export interface VitrifyConfig extends UserConfig {
  vitrify?: {
    lang?: string
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
      onSetup?: OnSetupFile[]
      /**
       * Functions which run in the onMounted hook of the app
       */
      onMounted?: OnMountedHook[]
      /**
       * Functions which run after initializing the app
       */
      onBoot?: OnBootHook[]
      /**
       * Functions which run after rendering the app (SSR)
       */
      onRendered?: OnRenderedHook[]
    }
    /**
     * Global SASS variables
     */
    sass?: {
      variables?: Record<string, string>
      additionalData?: string[]
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
  }
  quasar?: QuasarConf
}

export type VitrifyConfigAsync =
  | VitrifyConfig
  | ((mode: string, command: string) => Promise<VitrifyConfig>)

export const defineConfig = (config: VitrifyConfig) => config
