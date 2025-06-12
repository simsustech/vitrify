# Vitrify configuration

```ts
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
      onRendered?: OnRenderedHook[]
      /**
       * Files with functions which run after rendering the app (SSR)
       */
      onRenderedFiles?: OnRenderedHookFile[]
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
```

[source](https://github.com/simsustech/vitrify/blob/master/packages/vitrify/src/node/vitrify-config.ts)
