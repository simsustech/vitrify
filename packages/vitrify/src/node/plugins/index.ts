import type { Plugin } from 'vite'

export type VitrifyPlugin = ({
  ssr,
  mode,
  command
}: {
  ssr?: 'server' | 'client' | 'ssg' | false
  pwa?: boolean
  mode?: 'production' | 'development'
  command?: 'build' | 'dev' | 'test'
}) => Promise<Plugin | Plugin[]> | Plugin | Plugin[]
