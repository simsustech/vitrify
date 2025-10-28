import type { VitrifyConfig } from 'vitrify'
import { getCertificate } from '@vitejs/plugin-basic-ssl'
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
    const certificate = await getCertificate(
      'node_modules/.vite/basic-ssl',
      '',
      ['vitrify.test']
    )
    config.server = {
      https: {
        cert: certificate,
        key: certificate
      }
    }
  }
  return config
}
