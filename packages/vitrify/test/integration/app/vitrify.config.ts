import type { VitrifyConfig } from 'vitrify'

export default async function ({ mode, command }): Promise<VitrifyConfig> {
  const config: VitrifyConfig = {
    vitrify: {}
  }
  return config
}
