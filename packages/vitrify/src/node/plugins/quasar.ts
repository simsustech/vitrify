import type { Plugin } from 'vite'
import { fileURLToPath } from 'url'
import type {
  OnBootHook,
  OnMountedHook,
  VitrifyConfig
} from '../vitrify-config.js'
import type { VitrifyPlugin } from './index.js'
import { findDepPkgJsonPath } from 'vitefu'
export interface QuasarConf {
  ctx?: Record<string, any>
  css?: string[]
  boot?: string[]
  framework: {
    components?: string[]
    directives?: string[]
    plugins?: string[]
    lang?: string
    iconSet?: string
  }
  // animations: string[]
  extras?: string[]
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
        // globalCss?.push('@unocss/reset/normalize.css')

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
              // global: ['quasar/src/css/index.sass']
              global: [
                'quasar/src/css/helpers/string.sass',
                'quasar/src/css/helpers/math.sass',

                'quasar/src/css/variables.sass',
                'quasar/src/css/normalize.sass',

                // 'quasar/src/components/icon/QIcon.sass',

                // /* Composables */
                // 'quasar/src/composables/private.use-panel/use-panel.sass',

                // /* Components */
                // 'quasar/src/components/ajax-bar/QAjaxBar.sass',
                // 'quasar/src/components/avatar/QAvatar.sass',
                // 'quasar/src/components/badge/QBadge.sass',
                // 'quasar/src/components/banner/QBanner.sass',
                // 'quasar/src/components/bar/QBar.sass',
                // 'quasar/src/components/breadcrumbs/QBreadcrumbs.sass',
                // 'quasar/src/components/btn/QBtn.sass',
                // 'quasar/src/components/btn-dropdown/QBtnDropdown.sass',
                // 'quasar/src/components/btn-group/QBtnGroup.sass',
                // 'quasar/src/components/btn-toggle/QBtnToggle.sass',
                // 'quasar/src/components/card/QCard.sass',
                // 'quasar/src/components/carousel/QCarousel.sass',
                // 'quasar/src/components/chat/QChatMessage.sass',
                // 'quasar/src/components/checkbox/QCheckbox.sass',
                // 'quasar/src/components/chip/QChip.sass',
                // 'quasar/src/components/circular-progress/QCircularProgress.sass',
                // 'quasar/src/components/color/QColor.sass',
                // 'quasar/src/components/date/QDate.sass',
                // 'quasar/src/components/dialog/QDialog.sass',
                // 'quasar/src/components/editor/QEditor.sass',
                // 'quasar/src/components/expansion-item/QExpansionItem.sass',
                // 'quasar/src/components/fab/QFab.sass',
                // 'quasar/src/components/field/QField.sass',
                'quasar/src/components/file/QFile.sass',
                'quasar/src/components/form/QForm.sass',
                'quasar/src/components/img/QImg.sass',
                'quasar/src/components/inner-loading/QInnerLoading.sass',
                'quasar/src/components/input/QInput.sass',
                'quasar/src/components/intersection/QIntersection.sass',
                'quasar/src/components/item/QItem.sass',
                'quasar/src/components/knob/QKnob.sass',
                'quasar/src/components/layout/QLayout.sass',
                'quasar/src/components/linear-progress/QLinearProgress.sass',
                'quasar/src/components/menu/QMenu.sass',
                'quasar/src/components/option-group/QOptionGroup.sass',
                'quasar/src/components/pagination/QPagination.sass',
                'quasar/src/components/parallax/QParallax.sass',
                'quasar/src/components/popup-edit/QPopupEdit.sass',
                'quasar/src/components/pull-to-refresh/QPullToRefresh.sass',
                'quasar/src/components/radio/QRadio.sass',
                'quasar/src/components/rating/QRating.sass',
                'quasar/src/components/responsive/QResponsive.sass',
                'quasar/src/components/scroll-area/QScrollArea.sass',
                'quasar/src/components/select/QSelect.sass',
                'quasar/src/components/separator/QSeparator.sass',
                'quasar/src/components/skeleton/QSkeleton.sass',
                'quasar/src/components/slide-item/QSlideItem.sass',
                'quasar/src/components/slider/QSlider.sass',
                'quasar/src/components/space/QSpace.sass',
                'quasar/src/components/spinner/QSpinner.sass',
                'quasar/src/components/splitter/QSplitter.sass',
                'quasar/src/components/stepper/QStepper.sass',
                'quasar/src/components/tab-panels/QTabPanel.sass',
                'quasar/src/components/table/QTable.sass',
                'quasar/src/components/tabs/QTabs.sass',
                'quasar/src/components/time/QTime.sass',
                'quasar/src/components/timeline/QTimeline.sass',
                'quasar/src/components/toggle/QToggle.sass',
                'quasar/src/components/toolbar/QToolbar.sass',
                'quasar/src/components/tooltip/QTooltip.sass',
                'quasar/src/components/tree/QTree.sass',
                'quasar/src/components/uploader/QUploader.sass',
                'quasar/src/components/video/QVideo.sass',
                'quasar/src/components/virtual-scroll/QVirtualScroll.sass',

                /* Directives */
                'quasar/src/directives/ripple/Ripple.sass',
                'quasar/src/directives/morph/Morph.sass',

                /* Plugins */
                'quasar/src/plugins/bottom-sheet/component/BottomSheetComponent.sass',
                'quasar/src/plugins/dialog/component/DialogPluginComponent.sass',
                'quasar/src/plugins/loading/Loading.sass',
                'quasar/src/plugins/notify/Notify.sass',

                /* Core */
                'quasar/src/css/core/animations.sass',
                'quasar/src/css/core/colors.sass',
                'quasar/src/css/core/elevation.sass',
                'quasar/src/css/core/flex.sass',
                'quasar/src/css/core/helpers.sass',
                'quasar/src/css/core/mouse.sass',
                'quasar/src/css/core/orientation.sass',
                'quasar/src/css/core/positioning.sass',
                'quasar/src/css/core/size.sass',
                'quasar/src/css/core/touch.sass',
                'quasar/src/css/core/transitions.sass',
                'quasar/src/css/core/typography.sass',
                'quasar/src/css/core/visibility.sass',
                'quasar/src/css/core/dark.sass'
              ]
              // additionalData: [`@import 'quasar/src/css/index.sass'`]
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
