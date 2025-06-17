import { build } from '../../src/node/bin/build.js'
import { test } from 'vitest'

test('create CSR app', async () => {
  await build({
    appDir: new URL('app/', import.meta.url),
    outDir: new URL('file:///tmp/vitrify/csr/').pathname
  })
})

test('create SSR/SSG app', async () => {
  await build({
    ssr: 'client',
    appDir: new URL('app/', import.meta.url),
    outDir: new URL('file:///tmp/vitrify/ssr/client/').pathname
  })
  await build({
    ssr: 'server',
    appDir: new URL('app/', import.meta.url),
    outDir: new URL('file:///tmp/vitrify/ssr/server/').pathname
  })
})

/**
 * Will just be an empty fastify server as there is no vitrify.config in the test app
 */
test('create fastify server app', async () => {
  await build({
    ssr: 'fastify',
    appDir: new URL('app/', import.meta.url),
    outDir: new URL('file:///tmp/vitrify/server/').pathname
  })
})
