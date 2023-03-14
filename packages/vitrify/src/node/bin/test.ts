import { startVitest } from 'vitest/node'
import { baseConfig } from '../index.js'
import { fileURLToPath } from 'url'
export async function test(opts: { appDir: URL }) {
  const config = await baseConfig({
    appDir: opts.appDir,
    command: 'test',
    mode: 'development'
  })

  await startVitest(
    'test',
    [],
    {
      root: fileURLToPath(opts.appDir),
      dir: fileURLToPath(opts.appDir),

      globals: true,
      environment: 'happy-dom'
    },
    config
  )
}
