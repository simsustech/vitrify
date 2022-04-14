import { readFileSync } from 'fs'
import type { Plugin } from 'vite'
import Components from 'unplugin-vue-components/vite'
// import { prepareQuasarConf } from './quasar-conf-file.js'
import type {
  BootFunction,
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

// export interface Configuration {
//   ssr?: 'server' | 'client' | 'ssg' | false
// }

export const QuasarPlugin: VitrifyPlugin = async ({
  ssr = false,
  pwa = false
}): Promise<Plugin[]> => {
  // const extraPlugins: Plugin[] = []
  // const ctx = {
  //   prod: process.env.MODE === 'production',
  //   dev: process.env.MODE === 'development',
  //   mode: {
  //     ssr: !!ssr,
  //     pwa: !!pwa
  //   }
  // }

  // let bootFilePaths: Record<string, any> = {}
  // let components: string[] = []
  let plugins: string[] = []
  // let css: string[] = []
  let extras: string[] = []
  return [
    // {
    //   name: 'legacy-support',
    //   enforce: 'pre',
    //   transform (code, id) {
    //     /**
    //      * ESM does not resolve an import to .default when there are multiple exports. The following is required to make the VuePlugin import of QCalendar work.
    //      */
    //     if (code.includes('app.use(VuePlugin)')) {
    //       code = code.replace(/app\.use\(VuePlugin\)/g, `app.use(VuePlugin.install ? VuePlugin : VuePlugin.default)`)
    //     }
    //     return code
    //   }
    // },
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

        const bootFunctions: BootFunction[] = [
          async ({ app, ssrContext, staticImports }) => {
            // @ts-ignore
            // const quasarVuePlugin = (await import('quasar/vue-plugin')).default
            // @ts-ignore
            const quasarPlugins = await import('virtual:quasar-plugins')
            // @ts-ignore
            const directives = await import('quasar/directives')

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
            bootFunctions,
            ssrFunctions: [injectSsrContext],
            globalCss,
            staticImports: {
              quasar: ['Quasar']
            },
            hooks: {
              onMounted: onMountedHooks
            }
          }
        }
      }
    },
    {
      name: 'vite-plugin-quasar',
      enforce: 'post',
      // transformIndexHtml: {
      //   enforce: 'post',
      //   transform: (html) => {
      //     return html.replace(
      //       '<!--product-name-->',
      //       productName
      //     )
      //   }
      // },
      config: async (config: VitrifyConfig, env) => {
        // let appDir: URL
        // let cliDir: URL
        // let cwd: URL
        // let quasarDir: URL
        // let quasarConf: QuasarConf | undefined

        const { quasar: quasarConf, vitrify: { urls } = {} } = config

        const quasarPkgJsonPath = new URL(
          'package.json',
          urls?.packages?.quasar
        ).pathname
        const { version } = JSON.parse(
          readFileSync(quasarPkgJsonPath, { encoding: 'utf-8' })
        )

        // if (quasarConf?.boot) {
        //   bootFilePaths = (quasarConf.boot as (Record<string, any> | string)[])
        //     .filter(entry => {
        //       if (typeof entry === 'object') return (entry.server && (ssr === 'server'))
        //       else if (entry !== '') return true
        //     })
        //     .map(entry => {
        //       if (typeof entry === 'string') return entry
        //       else if (typeof entry === 'object') return entry.path
        //     })
        //     .reduce((acc, entry) => {
        //       if (entry[0] === '~') {
        //         const split = entry.substring(1).split('/')
        //         const name = split[0].replace(/[|&;$%@"<>()+,]/g, "");
        //         acc[name] = {
        //           path: new URL(`node_modules/${entry.substring(1)}`, urls?.app).pathname
        //         }
        //       } else {
        //         const name = entry.split('.')[0]
        //         acc[name] = {
        //           path: `src/boot/${entry}`
        //         }
        //       }
        //       return acc
        //     }, {})
        // }

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

        // css = (quasarConf?.css || []).map((v => {
        //   if (v[0] === '~') {
        //     return v.slice(1)
        //   }
        //   return v
        // })).map((v) => `@import '${v}'`)
        extras = quasarConf?.extras || []

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
              // ...extras.map(extra => ({
              //   find: `@quasar/extras/${extra}/${extra}.css`,
              //   replacement: new URL(`${extra}/${extra}.css`, urls?.packages?.['@quasar/extras']).pathname
              // })
              // ),
              {
                find: 'quasar',
                replacement: new URL('src/', urls?.packages?.quasar).pathname
              },
              {
                find: `@quasar/extras`,
                replacement: new URL('.', urls?.packages?.['@quasar/extras'])
                  .pathname
              }
              // { find: new RegExp('^quasar$'), replacement: new URL('src/index.all.js', urls?.packages?.quasar).pathname },
              // { find: new RegExp('^quasar$'), replacement: 'virtual:quasar' },
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
          css: {
            preprocessorOptions: {
              sass: {
                additionalData:
                  [
                    // ...extras.map(extra => `@import "@quasar/extras/${extra}/${extra}.css"`),
                    // ...extras.map(extra => `@import ${new URL(`${extra}/${extra}.css`, urls?.packages?.['@quasar/extras']).pathname}`) || [],
                    config.css?.preprocessorOptions?.sass?.additionalData,
                    `@import 'quasar/src/css/index.sass'`
                  ].join('\n') + '\n'
              }
            }
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
          export { default as Quasar } from 'quasar/src/vue-plugin.js'`
        }
        return null
      }
    }
  ]
}

export default QuasarPlugin
