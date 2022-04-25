import { readFileSync } from 'fs'
import type { Plugin } from 'vite'
import Components from 'unplugin-vue-components/vite'
// import { prepareQuasarConf } from './quasar-conf-file.js'
import type {
  BootFunction,
  OnBootHook,
  OnMountedHook,
  VitrifyConfig
} from '../vitrify-config.js'
// import { quasarDir as defaultQuasarDir } from '../app-urls.js'
// import { QuasarResolver } from '../resolver.js';
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import type { VitrifyPlugin } from './index.js'
import { getPkgJsonDir } from '../app-urls.js'
import { resolve } from 'import-meta-resolve'

export interface QuasarConf {
  ctx: Record<string, any>
  css: string[]
  boot: string[]
  framework: {
    components?: string[]
    directives?: string[]
    plugins?: string[]
  }
  animations: string[]
  extras: string[]
}

export const injectSsrContext = (
  html: string,
  ssrContext: Record<string, any>
) =>
  html
    .replace(/(<html[^>]*)(>)/i, (found, start, end) => {
      let matches

      matches = found.match(/\sdir\s*=\s*['"]([^'"]*)['"]/i)
      if (matches) {
        start = start.replace(matches[0], '')
      }

      matches = found.match(/\slang\s*=\s*['"]([^'"]*)['"]/i)
      if (matches) {
        start = start.replace(matches[0], '')
      }

      return `${start} ${ssrContext._meta.htmlAttrs || ''} ${end}`
    })
    .replace(
      /(<head[^>]*)(>)/i,
      (_, start, end) => `${start}${end}${ssrContext._meta.headTags || ''}`
    )
    .replace(
      /(<\/head>)/i,
      (_, tag) =>
        `${ssrContext._meta.resourceStyles || ''}${
          ssrContext._meta.endingHeadTags || ''
        }${tag}`
    )
    .replace(/(<body[^>]*)(>)/i, (found, start, end) => {
      let classes = ssrContext._meta.bodyClasses || ''

      const matches = found.match(/\sclass\s*=\s*['"]([^'"]*)['"]/i)

      if (matches) {
        if (matches[1].length > 0) {
          classes += ` ${matches[1]}`
        }
        start = start.replace(matches[0], '')
      }

      return `${start} class="${classes.trim()}" ${
        ssrContext._meta.bodyAttrs || ''
      }${end}${ssrContext._meta.bodyTags || ''}`
    })

export const QuasarPlugin: VitrifyPlugin = async ({
  ssr = false,
  pwa = false
}): Promise<Plugin[]> => {
  let plugins: string[] = []
  return [
    Components({
      resolvers: [QuasarResolver()]
    }),
    {
      name: 'vite-plugin-quasar-setup',
      enforce: 'pre',
      config: async (config: VitrifyConfig, env): Promise<VitrifyConfig> => {
        const { vitrify: { urls } = {}, quasar } = config

        const globalCss = quasar?.extras.map(
          (extra) => `@quasar/extras/${extra}/${extra}.css`
        )

        const localPackages = ['@quasar/extras', 'quasar']
        await (async () => {
          for (const val of localPackages)
            urls!.packages![val] = getPkgJsonDir(
              new URL(await resolve(val, urls!.app!.href))
            )
        })()

        const onMountedHooks: OnMountedHook[] = [
          async (instance) => {
            // @ts-ignore
            const {
              proxy: { $q }
            } = instance
            $q.onSSRHydrated !== void 0 && $q.onSSRHydrated()
          }
        ]

        const onBootHooks: OnBootHook[] = [
          async ({ app, ssrContext, staticImports }) => {
            // @ts-ignore
            const quasarPlugins = await import('virtual:quasar-plugins')
            // @ts-ignore
            const directives = await import('quasar/src/directives.js')

            app.use(
              staticImports.Quasar,
              {
                plugins: quasarPlugins,
                directives
              },
              ssrContext
            )
          }
        ]

        return {
          vitrify: {
            urls,
            globalCss,
            staticImports: {
              quasar: ['Quasar']
            },
            hooks: {
              onBoot: onBootHooks,
              onMounted: onMountedHooks,
              onRendered: [injectSsrContext]
            },
            sass: {
              additionalData: [`@import 'quasar/src/css/index.sass'`]
            }
          }
        }
      }
    },
    {
      name: 'vite-plugin-quasar',
      enforce: 'post',
      config: async (config: VitrifyConfig, env) => {
        const { quasar: quasarConf, vitrify: { urls } = {} } = config

        const quasarPkgJsonPath = new URL(
          'package.json',
          urls?.packages?.quasar
        ).pathname
        const { version } = JSON.parse(
          readFileSync(quasarPkgJsonPath, { encoding: 'utf-8' })
        )

        /**
         * All components should have been auto-imported
         */
        if (quasarConf?.framework?.plugins) {
          if (!quasarConf.framework) quasarConf.framework = {}
          quasarConf.framework.plugins = [
            ...new Set(quasarConf.framework.plugins)
          ]
          plugins = quasarConf?.framework.plugins
        }

        return {
          resolve: {
            alias: [
              {
                find: 'quasar/wrappers',
                replacement: new URL('quasar-wrappers.ts', urls?.cli).pathname
              },
              {
                find: 'quasar/vue-plugin',
                replacement: new URL(
                  'src/vue-plugin.js',
                  urls?.packages?.quasar
                ).pathname
              },
              {
                find: 'quasar/plugins',
                replacement: new URL('src/plugins.js', urls?.packages?.quasar)
                  .pathname
              },
              {
                find: 'quasar/components',
                replacement: new URL(
                  'src/components.js',
                  urls?.packages?.quasar
                ).pathname
              },
              {
                find: 'quasar/composables',
                replacement: new URL(
                  'src/composables.js',
                  urls?.packages?.quasar
                ).pathname
              },

              {
                find: 'quasar/directives',
                replacement: new URL(
                  'src/directives.js',
                  urls?.packages?.quasar
                ).pathname
              },
              {
                find: 'quasar/src',
                replacement: new URL('src/', urls?.packages?.quasar).pathname
              },
              {
                find: 'quasar',
                replacement: new URL('src/', urls?.packages?.quasar).pathname
              },
              {
                find: `@quasar/extras`,
                replacement: new URL('.', urls?.packages?.['@quasar/extras'])
                  .pathname
              }
            ]
          },
          define: {
            __DEV__: process.env.NODE_ENV !== 'production' || true,
            __QUASAR_VERSION__: `'${version}'`,
            __QUASAR_SSR__: !!ssr,
            __QUASAR_SSR_SERVER__: ssr === 'server',
            __QUASAR_SSR_CLIENT__: ssr === 'client',
            __QUASAR_SSR_PWA__: ssr === 'client' && pwa
          },
          ssr: {
            noExternal: ['quasar']
          }
        }
      }
    },
    {
      name: 'quasar-virtual-modules',
      enforce: 'post',
      config: async (config, env) => ({
        resolve: {
          alias: [
            { find: new RegExp('^quasar$'), replacement: 'virtual:quasar' }
          ]
        }
      }),
      resolveId(id) {
        switch (id) {
          case 'virtual:quasar-plugins':
            return 'virtual:quasar-plugins'
          case 'virtual:quasar':
            return { id: 'virtual:quasar', moduleSideEffects: false }
          default:
            return
        }
      },
      load(id) {
        if (id === 'virtual:quasar-plugins') {
          return `export { ${plugins.join(',')} } from 'quasar'`
        } else if (id === 'virtual:quasar') {
          return `export * from 'quasar/src/plugins.js';
          export * from 'quasar/src/components.js';
          export * from 'quasar/src/composables.js';
          export * from 'quasar/src/directives.js';
          export * from 'quasar/src/utils.js';
          export { default as Quasar } from 'quasar/src/install-quasar.js'`
        }
        return null
      }
    }
  ]
}

export default QuasarPlugin
