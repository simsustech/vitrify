import type { VitrifyConfig } from 'vitrify'
import { certificateFor } from 'devcert'
import { QuasarPlugin, type QuasarPluginOptions } from 'vitrify/plugins'

const quasarConf: QuasarPluginOptions = {
  // extras: ['material-icons'],
  framework: {
    components: [
      // Deprecated
    ],
    iconSet: 'svg-material-icons',
    plugins: ['Dialog', 'Notify']
  }
  /*
   * Disable SASS if you use UnoCSS
   */
  // disableSass: true
}

export default async function ({ mode, command }): Promise<VitrifyConfig> {
  const config: VitrifyConfig = {
    vitrify: {
      plugins: [
        {
          plugin: QuasarPlugin,
          options: quasarConf
        }
      ],
      hooks: {
        onSetup: [new URL('src/setup.ts', import.meta.url)]
      },
      sass: {
        variables: {
          $primary: '#000000'
        }
      },
      ssr: {
        serverModules: []
      }
    }
  }
  if (mode === 'development') {
    config.server = {
      https: await certificateFor('vitrify.test')
    }
  }
  return config
}
