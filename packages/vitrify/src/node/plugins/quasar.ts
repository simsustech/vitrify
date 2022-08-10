import type { Plugin } from 'vite'
import { resolvePackageData } from 'vite'
import Components from 'unplugin-vue-components/vite'
import type {
  OnBootHook,
  OnMountedHook,
  VitrifyConfig
} from '../vitrify-config.js'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import type { VitrifyPlugin } from './index.js'
export interface QuasarConf {
  ctx: Record<string, any>
  css: string[]
  boot: string[]
  framework: {
    components?: string[]
    directives?: string[]
    plugins?: string[]
    lang?: string
    iconSet?: string
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
  let quasarConf: QuasarConf
  return [
    Components({
      resolvers: [QuasarResolver()]
    }),
    {
      name: 'vite-plugin-quasar-transform',
      enforce: 'pre',
      transform: (code, id, options) => {
        code = code
          .replaceAll('__QUASAR_SSR__', ssr ? 'true' : 'false')
          .replaceAll(
            '__QUASAR_SSR_SERVER__',
            ssr ? '(import.meta.env.SSR === true)' : 'false'
          )
          .replaceAll(
            '__QUASAR_SSR_CLIENT__',
            ssr ? '(import.meta.env.SSR === false)' : 'false'
          )
          .replaceAll(
            '__QUASAR_SSR_PWA__',
            ssr && pwa ? '(import.meta.env.SSR === false)' : 'false'
          )

        return code
      }
    },
    {
      name: 'vite-plugin-quasar-setup',
      enforce: 'pre',
      config: async (config: VitrifyConfig, env): Promise<VitrifyConfig> => {
        const { vitrify: { urls } = {}, quasar } = config

        const globalCss = quasar?.extras?.map(
          (extra) => `@quasar/extras/${extra}/${extra}.css`
        )

        const localPackages = ['@quasar/extras', 'quasar']
        // const localPackages: string[] = []
        await (async () => {
          for (const val of localPackages) {
            const pkg = resolvePackageData(
              val,
              config.vitrify!.urls!.app!.pathname
            )
            if (pkg) urls!.packages![val] = new URL(`file://${pkg.dir}/`)
          }
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
            const directives = await import('virtual:quasar-directives')
            // @ts-ignore
            const { default: lang } = await import('virtual:quasar-lang')
            // @ts-ignore
            const { default: iconSet } = await import('virtual:quasar-iconSet')

            app.use(
              staticImports?.Quasar,
              {
                plugins: quasarPlugins,
                directives,
                lang,
                iconSet
              },
              ssrContext
            )
          }
        ]

        if (quasar) quasarConf = quasar
        if (!quasarConf.framework.lang && config.vitrify?.lang)
          quasarConf.framework.lang = config.vitrify.lang

        /**
         * Importing package.json is problematic
         */
        const version = '?'

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
              global: ['quasar/src/css/index.sass']
              // additionalData: [`@import 'quasar/src/css/index.sass'`]
            }
          },
          resolve: {
            alias: [
              {
                find: 'quasar/src/',
                replacement: new URL(
                  './src/',
                  config.vitrify!.urls!.packages!.quasar
                ).pathname
              }
            ]
          },
          optimizeDeps: {
            exclude: ['quasar']
          },
          define: {
            __DEV__: process.env.NODE_ENV !== 'production' || true,
            __QUASAR_VERSION__: `'${version}'`
          },
          ssr: {
            noExternal: ['quasar']
          }
        }
      }
    },
    {
      name: 'quasar-virtual-modules',
      enforce: 'pre',
      config: async (config, env) => ({
        resolve: {
          alias: [
            {
              find: new RegExp('^quasar$'),
              replacement: 'virtual:quasar'
            }
            // { find: new RegExp('^quasar$'), replacement: 'virtual:quasar' }
          ]
        }
      }),
      resolveId(id) {
        switch (id) {
          case 'virtual:quasar-plugins':
            return 'virtual:quasar-plugins'
          case 'virtual:quasar-directives':
            return 'virtual:quasar-directives'
          case 'virtual:quasar-lang':
            return 'virtual:quasar-lang'
          case 'virtual:quasar-iconSet':
            return 'virtual:quasar-iconSet'
          case 'virtual:quasar':
            return { id: 'virtual:quasar', moduleSideEffects: false }
          default:
            return
        }
      },
      load(id) {
        if (id === 'virtual:quasar-plugins') {
          return `export { ${plugins.join(',')} } from 'quasar'`
        } else if (id === 'virtual:quasar-directives') {
          return `export * from 'quasar/src/directives.js'`
        } else if (id === 'virtual:quasar-lang') {
          return `import lang from 'quasar/lang/${
            quasarConf?.framework?.lang || 'en-US'
          }';
          export default lang`
        } else if (id === 'virtual:quasar-iconSet') {
          return `import iconSet from 'quasar/icon-set/${
            quasarConf?.framework.iconSet || 'material-icons'
          }';
          export default iconSet`
        } else if (id === 'virtual:quasar') {
          return `export * from 'quasar/src/plugins.js';
          export * from 'quasar/src/components.js';
          export * from 'quasar/src/composables.js';
          export * from 'quasar/src/directives.js';
          export * from 'quasar/src/utils.js';
          export * from 'quasar/src/composables.js';
          export { default as Quasar } from 'quasar/src/install-quasar.js'`
        }
        return null
      }
    }
  ]
}

export default QuasarPlugin
