import type { Alias, UserConfig as ViteUserConfig, ViteDevServer } from 'vite'
import type { ComponentInternalInstance } from '@vue/runtime-core'
import type { Options } from 'beasties'
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
import type { InlineConfig as VitestInlineConfig } from 'vitest/node'

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

/**
 * Analytics injected into the served HTML at build time.
 *
 * Only Umami for now: it is the one tool that stores nothing on the visitor's
 * device, so a site can carry it without a consent banner. The shape is an
 * object with an optional `umami` key rather than a bare Umami option, because
 * the next tool (a consent-gated one) needs a place to live that is visibly a
 * different thing.
 */
export interface VitrifyAnalyticsConfig {
  umami?: {
    /** The website id from the Umami dashboard. Empty means: inject nothing. */
    websiteId?: string
    /**
     * The instance, as an origin (`https://analytics.example.com`) or a bare
     * host (`analytics.example.com`, which is read as https).
     */
    host: string
    /**
     * Hostnames that count as visits, emitted as `data-domains`.
     *
     * Without it Umami records whatever host it was served from — so a preview
     * deployment and a staging host both look like real traffic.
     */
    domains?: string[]
    /** Honour the browser's Do Not Track setting. Defaults to true. */
    doNotTrack?: boolean
    /** Script name, for a self-hosted instance that renamed it. Default `script.js`. */
    scriptName?: string
  }
}

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
    /**
     * Boot the client app after the page has loaded, instead of while its HTML
     * is still being parsed.
     *
     * Every page vitrify prerenders is real HTML: the text, links, images and
     * forms are in the markup before any JavaScript runs. Fetching the entry and
     * its chunks during parsing nonetheless competes for bandwidth with the
     * stylesheet and the fonts, and Lighthouse's mobile simulation charges that
     * to First Contentful Paint — measured on a prerendered site 2026-11-02:
     * 375 KiB preloaded, FCP 2.7 s, performance 67; with the entry deferred,
     * FCP 1.2 s, performance 99.
     *
     * Enabled, the built HTML carries no module `<script>` and no
     * `modulepreload` links; an inline bootstrap imports the entry on `load`
     * (and an idle callback). Hydration then happens shortly after the page is
     * readable instead of before it is — anything that only works after
     * hydration (a dialog, a menu) responds a moment later, so turn this off for
     * an app whose above-the-fold UI is client-only.
     *
     * Off by default: it changes when the app boots.
     */
    deferHydration?: boolean
    /**
     * Overrides for `beasties`, the inliner that turns each prerendered page's
     * critical CSS into a `<style>` element.
     *
     * The default inlines the rules the page needs and leaves the stylesheet
     * linked; `inlineThreshold` is the knob that changes that. Raising it to the
     * size of the whole sheet inlines everything, which removes a request from
     * the critical path at the cost of HTML that no longer caches on its own.
     */
    beasties?: Partial<Options>
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
     * Named code splitting chunks, e.g. `{ typst: ['@myriaddreamin/typst'] }`.
     */
    chunks?: Record<string, string[]>
    /**
     * Enables vite-plugin-pwa
     */
    pwa?: Partial<VitePWAOptions>
    /**
     * Analytics injected into `index.html` at build time.
     *
     * Declared here rather than written into a component so the tag exists in
     * the *served HTML*: a tag added from an `onMounted` runs only after the
     * client bundle has executed, so the first page view of a visitor on a slow
     * connection — and every crawler — is unmeasured. It is also the one place
     * where "no id, no tag" is enforced once, instead of every app re-checking
     * it in its own code.
     */
    analytics?: VitrifyAnalyticsConfig
    /**
     * UnoCSS Configuration
     */
    unocss?: UnoCSSUserConfig<any>
    /**
     * unplugin-vue-components configuration
     */
    unpluginVueComponents?: unpluginVueComponentsOptions
  }
  /**
   * Vitest configuration. Passed to `startVitest` when running `vitrify test`.
   * Merged over vitrify's defaults (root/dir, globals, environment).
   */
  test?: VitestInlineConfig
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
