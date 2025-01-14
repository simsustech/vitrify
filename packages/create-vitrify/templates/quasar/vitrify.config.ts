import type { VitrifyConfig } from 'vitrify'
import { certificateFor } from 'devcert'
import { QuasarPreset, type QuasarConf } from 'vitrify'

const quasarConf: QuasarConf = {
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
      hooks: {
        onSetup: [new URL('src/setup.ts', import.meta.url)]
      },
      /*
       * Experimental
       */
      // unocss: {
      //   presets: [
      //     QuasarPreset({
      //       plugins: quasarConf['framework']['plugins']
      //     })
      //   ]
      // },
      sass: {
        variables: {
          $primary: '#000000'
        }
      },
      ssr: {
        serverModules: []
      }
    },
    quasar: quasarConf
  }
  if (mode === 'development') {
    config.server = {
      https: await certificateFor('vitrify.test')
    }
  }
  return config
}
