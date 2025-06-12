import type { VitrifyConfig } from 'vitrify'
import { certificateFor } from 'devcert'

export default async function ({ mode, command }): Promise<VitrifyConfig> {
  const config: VitrifyConfig = {
    vitrify: {}
  }
  if (mode === 'development') {
    config.server = {
      https: await certificateFor('vitrify.test')
    }
  }
  return config
}
