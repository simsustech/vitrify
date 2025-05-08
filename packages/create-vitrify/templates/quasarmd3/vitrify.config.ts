import type { VitrifyConfig } from 'vitrify'
import { QuasarPlugin, type QuasarPluginOptions } from 'vitrify/plugins'
import { certificateFor } from 'devcert'
import QuasarComponentsPlugin from '@simsustech/quasar-components/vite-plugin'
import { QuasarPreset } from 'unocss-preset-quasar'
import { MaterialDesign3 } from 'unocss-preset-quasar/styles'
import { loadEnv } from 'vite'

const iconifyJsonIconSet = {
  name: 'iconify-json-mdi',
  type: {
    positive: 'i-mdi-check-circle',
    negative: 'i-mdi-alert',
    info: 'i-mdi-information',
    warning: 'i-mdi-exclamation'
  },
  arrow: {
    up: 'i-mdi-arrow-up',
    right: 'i-mdi-arrow-right',
    down: 'i-mdi-arrow-down',
    left: 'i-mdi-arrow-left',
    dropdown: 'i-mdi-menu-down'
  },
  chevron: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right'
  },
  colorPicker: {
    spectrum: 'i-mdi-gradient-vertical',
    tune: 'i-mdi-tune',
    palette: 'i-mdi-palette-swatch'
  },
  pullToRefresh: {
    icon: 'i-mdi-refresh'
  },
  carousel: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right',
    up: 'i-mdi-chevron-up',
    down: 'i-mdi-chevron-down',
    navigationIcon: 'i-mdi-circle'
  },
  chip: {
    remove: 'i-mdi-close-circle',
    selected: 'i-mdi-check'
  },
  datetime: {
    arrowLeft: 'i-mdi-chevron-left',
    arrowRight: 'i-mdi-chevron-right',
    now: 'i-mdi-clock-outline',
    today: 'i-mdi-calendar-today'
  },
  editor: {
    bold: 'i-mdi-format-bold',
    italic: 'i-mdi-format-italic',
    strikethrough: 'i-mdi-format-strikethrough-variant',
    underline: 'i-mdi-format-underline',
    unorderedList: 'i-mdi-format-list-bulleted',
    orderedList: 'i-mdi-format-list-numbered',
    subscript: 'i-mdi-format-subscript',
    superscript: 'i-mdi-format-superscript',
    hyperlink: 'i-mdi-link',
    toggleFullscreen: 'i-mdi-fullscreen',
    quote: 'i-mdi-format-quote-close',
    left: 'i-mdi-format-align-left',
    center: 'i-mdi-format-align-center',
    right: 'i-mdi-format-align-right',
    justify: 'i-mdi-format-align-justify',
    print: 'i-mdi-printer',
    outdent: 'i-mdi-format-indent-decrease',
    indent: 'i-mdi-format-indent-increase',
    removeFormat: 'i-mdi-format-clear',
    formatting: 'i-mdi-format-color-text',
    fontSize: 'i-mdi-format-size',
    align: 'i-mdi-format-align-left',
    hr: 'i-mdi-minus',
    undo: 'i-mdi-undo',
    redo: 'i-mdi-redo',
    heading: 'i-mdi-format-size',
    heading1: 'i-mdi-format-header-1',
    heading2: 'i-mdi-format-header-2',
    heading3: 'i-mdi-format-header-3',
    heading4: 'i-mdi-format-header-4',
    heading5: 'i-mdi-format-header-5',
    heading6: 'i-mdi-format-header-6',
    code: 'i-mdi-code-tags',
    size: 'i-mdi-format-size',
    size1: 'i-mdi-numeric-1-box',
    size2: 'i-mdi-numeric-2-box',
    size3: 'i-mdi-numeric-3-box',
    size4: 'i-mdi-numeric-4-box',
    size5: 'i-mdi-numeric-5-box',
    size6: 'i-mdi-numeric-6-box',
    size7: 'i-mdi-numeric-7-box',
    font: 'i-mdi-format-font',
    viewSource: 'i-mdi-code-tags'
  },
  expansionItem: {
    icon: 'i-mdi-chevron-down',
    denseIcon: 'i-mdi-menu-down'
  },
  fab: {
    icon: 'i-mdi-plus',
    activeIcon: 'i-mdi-close'
  },
  field: {
    clear: 'i-mdi-close-circle',
    error: 'i-mdi-alert-circle'
  },
  pagination: {
    first: 'i-mdi-chevron-double-left',
    prev: 'i-mdi-chevron-left',
    next: 'i-mdi-chevron-right',
    last: 'i-mdi-chevron-double-right'
  },
  rating: {
    icon: 'i-mdi-star'
  },
  stepper: {
    done: 'i-mdi-check',
    active: 'i-mdi-pencil',
    error: 'i-mdi-alert'
  },
  tabs: {
    left: 'i-mdi-chevron-left',
    right: 'i-mdi-chevron-right',
    up: 'i-mdi-chevron-up',
    down: 'i-mdi-chevron-down'
  },
  table: {
    arrowUp: 'i-mdi-arrow-up',
    warning: 'i-mdi-alert',
    firstPage: 'i-mdi-chevron-double-left',
    prevPage: 'i-mdi-chevron-left',
    nextPage: 'i-mdi-chevron-right',
    lastPage: 'i-mdi-chevron-double-right'
  },
  tree: {
    icon: 'i-mdi-play'
  },
  uploader: {
    done: 'i-mdi-check',
    clear: 'i-mdi-close',
    add: 'i-mdi-plus-box',
    upload: 'i-mdi-cloud-upload',
    removeQueue: 'i-mdi-notification-clear-all',
    removeUploaded: 'i-mdi-check-all'
  }
}

const quasarConf: QuasarPluginOptions = {
  framework: {
    plugins: ['Dialog', 'Notify', 'Loading', 'Meta'],
    iconSet: iconifyJsonIconSet
  },
  /*
   * Disable SASS if you use UnoCSS
   */
  disableSass: true
}

export default async function ({ mode, command }): Promise<VitrifyConfig> {
  const env = loadEnv(mode, process.cwd(), '')
  const config: VitrifyConfig = {
    plugins: [QuasarComponentsPlugin()],
    vitrify: {
      plugins: [
        {
          plugin: QuasarPlugin,
          options: quasarConf
        }
      ],
      lang: env.VITE_LANG,
      productName: 'Quasar MD3',
      hooks: {
        onSetup: []
      },
      ssr: {
        serverModules: []
      },
      unocss: {
        presets: [
          QuasarPreset({
            style: MaterialDesign3,
            sourceColor: env.VITE_SOURCE_COLOR,
            plugins: quasarConf['framework']['plugins'],
            iconSet: quasarConf['framework']['iconSet']
          })
        ],
        content: {
          pipeline: {
            include: [/@simsustech\/quasar-components/]
          }
        }
      }
    }
  }
  if (mode === 'development') {
    config.server = {
      https: await certificateFor('vitrify.local')
    }
  }
  return config
}
