import type { VitrifyConfig } from 'vitrify'
import { getCertificate } from '@vitejs/plugin-basic-ssl'

export default async function ({ mode, command }): Promise<VitrifyConfig> {
  const config: VitrifyConfig = {
    vitrify: {}
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
