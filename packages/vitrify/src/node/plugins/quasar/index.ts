import { fileURLToPath } from 'url'
import type {
  OnAppMountedHook,
  OnTemplateRenderedHook,
  VitrifyConfig,
  OnAppCreatedHook
} from '../../vitrify-config.js'
import type { VitrifyPlugin } from '../index.js'
import { findDepPkgJsonPath } from 'vitefu'
import {
  type QuasarFonts,
  type QuasarComponents,
  type QuasarDirectives,
  type QuasarIconSets,
  type QuasarPlugins,
  type GlobalQuasarIconMapFn,
  type QuasarIconSet
} from 'quasar'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

export interface QuasarPluginOptions {
  framework: {
    components?: (keyof QuasarComponents)[]
    directives?: (keyof QuasarDirectives)[]
    plugins?: (keyof QuasarPlugins)[]
    lang?: string
    iconSet?: QuasarIconSets | QuasarIconSet
    iconMapFn?: GlobalQuasarIconMapFn
  }
  extras?: (QuasarIconSets | QuasarFonts)[]
  disableSass?: boolean
}

export const injectSsrContext: OnTemplateRenderedHook = ({
  html,
  ssrContext
}) =>
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

      return `${start} ${ssrContext?._meta.htmlAttrs || ''} ${end}`
    })
    .replace(
      /(<head[^>]*)(>)/i,
      (_, start, end) => `${start}${end}${ssrContext?._meta.headTags || ''}`
    )
    .replace(
      /(<\/head>)/i,
      (_, tag) =>
        `${ssrContext?._meta.resourceStyles || ''}${
          ssrContext?._meta.endingHeadTags || ''
        }${tag}`
    )
    .replace(/(<body[^>]*)(>)/i, (found, start, end) => {
      let classes = ssrContext?._meta.bodyClasses || ''

      const matches = found.match(/\sclass\s*=\s*['"]([^'"]*)['"]/i)

      if (matches) {
        if (matches[1].length > 0) {
          classes += ` ${matches[1]}`
        }
        start = start.replace(matches[0], '')
      }

      return `${start} class="${classes.trim()}" ${
        ssrContext?._meta.bodyAttrs || ''
      }${end}${ssrContext?._meta.bodyTags || ''}`
    })

export const QuasarPlugin: VitrifyPlugin<QuasarPluginOptions> = async ({
  ssr = false,
  pwa = false,
  options
}) => {
  let plugins: string[] = []
  const quasarConf: QuasarPluginOptions = options
  return {
    plugins: [
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
          const { vitrify: { urls } = {} } = config

          // if (quasar) quasarConf = quasar
          if (!quasarConf.framework.lang && config.vitrify?.lang)
            quasarConf.framework.lang = config.vitrify.lang

          const globalCss = quasarConf?.extras?.map(
            (extra) => `@quasar/extras/${extra}/${extra}.css`
          )

          const localPackages = ['@quasar/extras', 'quasar']
          // const localPackages: string[] = []
          await (async () => {
            for (const val of localPackages) {
              const pkgDir = await findDepPkgJsonPath(
                val,
                fileURLToPath(config.vitrify!.urls!.app!)
              )
              if (pkgDir) urls!.packages![val] = new URL(`file://${pkgDir}`)
            }
          })()

          const onAppMountedHooks: OnAppMountedHook[] = [
            async ({ instance }) => {
              const {
                proxy: { $q }
              } = instance
              if ($q.onSSRHydrated !== void 0) $q.onSSRHydrated()
            }
          ]

          const onAppCreatedHooks: OnAppCreatedHook[] = [
            async ({ app, ssrContext, staticImports }) => {
              // @ts-expect-error undefined
              const quasarPlugins = await import('virtual:quasar-plugins')
              // @ts-expect-error undefined
              const directives = await import('virtual:quasar-directives')
              // @ts-expect-error undefined
              const { default: lang } = await import('virtual:quasar-lang')
              const { default: iconSet } = await import(
                // @ts-expect-error undefined
                'virtual:quasar-iconSet'
              )
              const { default: iconMapFn } = await import(
                // @ts-expect-error undefined
                'virtual:quasar-iconMapFn'
              )

              app.use(
                staticImports?.Quasar,
                {
                  plugins: quasarPlugins,
                  directives,
                  lang,
                  iconSet,
                  config: {
                    iconMapFn
                  }
                },
                ssrContext
              )
            }
          ]

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
                onAppCreated: onAppCreatedHooks,
                onAppMounted: onAppMountedHooks,
                onTemplateRendered: [injectSsrContext]
              },
              sass: quasarConf.disableSass
                ? undefined
                : {
                    global: ['quasar/src/css/index.sass']
                  }
            },
            resolve: {
              alias: [
                {
                  find: 'quasar/src/',
                  replacement: fileURLToPath(
                    new URL('./src/', config.vitrify!.urls!.packages!.quasar)
                  )
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
            case 'virtual:quasar-iconMapFn':
              return 'virtual:quasar-iconMapFn'
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
            return `${
              typeof quasarConf.framework.iconSet === 'string'
                ? `import iconSet from 'quasar/icon-set/${
                    quasarConf?.framework.iconSet || 'material-icons'
                  }';
          export default iconSet`
                : `export default ${
                    quasarConf.framework.iconSet
                      ? JSON.stringify(quasarConf.framework.iconSet)
                      : null
                  }`
            }`
          } else if (id === 'virtual:quasar-iconMapFn') {
            return `export default ${
              quasarConf?.framework.iconMapFn?.toString() ?? null
            }`
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
    ],
    config: {
      vitrify: {
        unpluginVueComponents: {
          resolvers: [QuasarResolver()]
        }
      }
    }
  }
}
