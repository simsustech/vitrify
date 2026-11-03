import { readFile, readdir } from 'node:fs/promises'
import { build } from '../../src/node/bin/build.js'
import { expect, test } from 'vitest'

/**
 * A content hash: exactly 8 base64url characters before the extension.
 *
 * Exactly 8, not "8 or more", because a natural name can otherwise pass for a
 * hash — `_plugin-vue_export-helper.mjs` matched the open-ended version. Rolldown
 * emits 8; the length is the only thing that separates a hash from a hyphenated
 * word.
 */
const HASHED = /-[A-Za-z0-9_-]{8}\.mjs$/

test('create CSR app', async () => {
  await build({
    appDir: new URL('app/', import.meta.url),
    outDir: new URL('file:///tmp/vitrify/csr/').pathname
  })

  /*
   * Client output carries a content hash.
   *
   * Without it every chunk keeps its name across builds — `vendor.mjs`,
   * `index.mjs` — while the contents change, which leaves no safe
   * `Cache-Control`: `immutable` on an unhashed name serves stale code, and
   * `no-cache` re-validates every chunk on every page view. A stale chunk beside
   * new HTML breaks hydration in a way that is not reproducible on demand.
   */
  const files = await readdir(new URL('file:///tmp/vitrify/csr/'))
  const chunks = files.filter((file) => file.endsWith('.mjs'))

  expect(chunks.length).toBeGreaterThan(0)
  for (const chunk of chunks) expect(chunk, chunk).toMatch(HASHED)

  const html = await readFile(
    new URL('file:///tmp/vitrify/csr/index.html'),
    'utf8'
  )

  // The hashed name has to be the one the document asks for; a hash nobody
  // references is a 404 on the first paint.
  const referenced = chunks.filter((chunk) => html.includes(chunk))

  expect(referenced.length).toBeGreaterThan(0)
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

  /*
   * Server bundles keep their names, and must: `fastify-ssr-plugin.ts` and the
   * prerenderer import `ssr/server/entry-server.mjs` by path, so a hash breaks the
   * import and buys nothing — Node does not cache by URL.
   *
   * Asserted as the exact files that get imported, not as "no file looks
   * hashed": a regex cannot tell a hash from a hyphenated word, and the server
   * bundle legitimately contains `server-renderer.mjs` and
   * `_plugin-vue_export-helper.mjs`.
   */
  const server = await readdir(new URL('file:///tmp/vitrify/ssr/server/'))

  for (const required of ['entry-server.mjs', 'prerender.mjs', 'server.mjs']) {
    expect(server, required).toContain(required)
  }
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
