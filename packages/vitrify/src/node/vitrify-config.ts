import type { Alias, UserConfig as ViteUserConfig, ViteDevServer } from 'vite'
import type { QuasarConf } from './plugins/quasar.js'
import type { ComponentInternalInstance } from '@vue/runtime-core'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { ComponentResolver } from 'unplugin-vue-components'
import type { UserConfig as UnoCSSUserConfig } from '@unocss/core'

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
export type OnSetupHook = (
  fastify: FastifyInstance,
  options?: {
    vite?: ViteDevServer
  }
) => any
export type OnSetupFile = URL
export interface VitrifyConfig extends ViteUserConfig {
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
  }
  quasar?: QuasarConf
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

export const defineConfig = (config: VitrifyConfig) => config
