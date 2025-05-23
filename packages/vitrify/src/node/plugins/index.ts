import type { Plugin } from 'vite'
import { VitrifyConfig } from '../vitrify-config.js'

type VitrifyPluginReturnType =
  | {
      plugin: Plugin
      config?: Partial<VitrifyConfig>
    }
  | {
      plugins: Plugin[]
      config?: Partial<VitrifyConfig>
    }

export type VitrifyPlugin<Options> = ({
  ssr,
  pwa,
  mode,
  command,
  options
}: {
  ssr?: 'server' | 'client' | 'ssg' | 'fastify' | false
  pwa?: boolean
  mode?: 'production' | 'development'
  command?: 'build' | 'dev' | 'test'
  options: Options
}) => Promise<VitrifyPluginReturnType> | VitrifyPluginReturnType

export * from './quasar/index.js'
export * from './pinia/index.js'
