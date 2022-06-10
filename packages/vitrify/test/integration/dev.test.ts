import { test } from 'vitest'
import { createServer } from '../../src/node/bin/dev.js'

test('create CSR dev server', async () => {
  const { server } = await createServer({
    appDir: new URL('app/', import.meta.url),
    port: 3001
  })
  server.close()
})

test('create SSR dev server', async () => {
  const { server } = await createServer({
    appDir: new URL('app/', import.meta.url),
    port: 3002,
    mode: 'ssr'
  })
  server.close()
})
