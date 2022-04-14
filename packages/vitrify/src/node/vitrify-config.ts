import { FastifyInstance } from 'fastify'
import { UserConfig } from 'vite'
import type { QuasarConf } from './plugins/quasar.js'
import type { ComponentInternalInstance } from '@vue/runtime-core'

export type BootFunction = ({
  app,
  ssrContext,
  staticImports
}: {
  app: any
  ssrContext: Record<string, unknown>
  staticImports: Record<string, any>
}) => Promise<void> | void
export type OnMountedHook = (
  instance: ComponentInternalInstance
) => Promise<void> | void
export type StaticImports = Record<string, string[]>
export type SsrFunction = (
  html: string,
  ssrContext: Record<string, any>
) => string

export interface VitrifyConfig extends UserConfig {
  vitrify?: {
    /**
     * Global CSS imports
     */
    globalCss?: string[]
    /**
     * Functions which run after initializing the app
     */
    bootFunctions?: BootFunction[]
    /**
     * Functions which run on the server after rendering the app
     */
    ssrFunctions?: SsrFunction[]
    /**
     * Static imports in the app: packageName: [imports]
     */
    staticImports?: StaticImports
    hooks?: {
      /**
       * Functions which run in the onMounted hook of the app
       */
      onMounted: OnMountedHook[]
    }
    /**
     * Global SASS variables
     */
    sassVariables?: Record<string, string>
    fastify?: {
      /**
       * setup() is called directly after instantiating fastify. Use it to register your own plugins, routes etc.
       */
      setup: (fastify: FastifyInstance) => any
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
  }
  quasar?: QuasarConf
}

export const defineConfig = (config: VitrifyConfig) => config
