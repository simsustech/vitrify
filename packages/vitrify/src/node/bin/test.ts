import { startVitest } from 'vitest/node'
import { baseConfig } from '../index.js'
export async function test(opts: { appDir: URL }) {
  const config = await baseConfig({
    appDir: opts.appDir,
    command: 'test',
    mode: 'development'
  })

  await startVitest(
    [],
    {
      root: opts.appDir.pathname,
      dir: opts.appDir.pathname,

      globals: true,
      environment: 'happy-dom'
      // include: [
      //   `${opts.appDir.pathname}**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`
      // ]
    },
    config
  )
}
