import { expect, test } from 'vitest'
import { baseConfig } from '../src/node/index.js'
import { deferEntryScript } from '../src/node/helpers/defer-entry.js'
import { renderTemplate } from '../src/node/frameworks/vue/fastify-ssr-plugin.js'

/**
 * `deferHydration` — the app boots after the page has painted.
 *
 * A prerendered page is readable without JavaScript, but the entry and its
 * `modulepreload` links were fetched while the HTML was parsed, taking bandwidth
 * from the stylesheet, the font and the hero image. Measured on a prerendered
 * site (Lighthouse 13.5, mobile simulated, 2026-11-02): FCP 2.7 s, LCP 3.1 s,
 * performance 67 with the entry in the parsed HTML; FCP 1.2 s, LCP 1.7 s, 100
 * with it deferred.
 */

test('the bootstrap loads the entry lazily, once', () => {
  const script = deferEntryScript('/index.mjs')

  // Inline, so it costs no request; and it only *creates* the module script.
  expect(script.startsWith('<script>')).toBe(true)
  expect(script).toContain('script.src = "/index.mjs"')
  expect(script).toContain("script.type = 'module'")
  expect(script).not.toContain('<script type="module"')
  expect(script).toContain('if (started) return')
})

test('the bootstrap does not wait for a third party', () => {
  const script = deferEntryScript('/index.mjs')

  // `load` alone is not enough: it also waits for analytics and chat tags, and a
  // stalled one left the page inert for 8.1 s before this trigger existed.
  expect(script).toContain("addEventListener('load', boot)")
  expect(script).toContain("entry.name !== 'first-contentful-paint'")
  expect(script).toContain('setTimeout(boot, 1000)')

  // A visitor who touches the page first is not made to wait either.
  expect(script).toContain("addEventListener('pointerdown', boot")
  expect(script).toContain("addEventListener('keydown', boot")
})

const builtHtml = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<link rel="modulepreload" crossorigin href="/vendor.mjs">',
  '<link rel="preload" as="image" href="/images/hero.webp" type="image/webp">',
  '</head>',
  '<body><div id="app"><h1>Prerendered</h1></div>',
  '<script type="module" crossorigin src="/index.mjs"></script>',
  '</body>',
  '</html>'
].join('\n')

/**
 * The plugin is only registered when the app's config asks for it, so the two
 * cases use two fixture apps: `app` (no option) and `defer-app` (option on).
 */
async function transform(
  html: string,
  app: 'app' | 'defer-app'
): Promise<string> {
  const config = await baseConfig({
    command: 'build',
    mode: 'production',
    appDir: new URL(`integration/${app}/`, import.meta.url)
  })

  const plugins = (config.plugins as unknown[]).flat(Infinity) as {
    name?: string
    transformIndexHtml?: { handler: (html: string) => string }
  }[]
  const plugin = plugins.find((i) => i?.name === 'defer-hydration')

  if (!plugin?.transformIndexHtml) return html

  return plugin.transformIndexHtml.handler(html)
}

test('off by default: the entry stays a module script', async () => {
  expect(await transform(builtHtml, 'app')).toBe(builtHtml)
})

test('on: the entry and its chunk preloads are replaced by the bootstrap', async () => {
  const output = await transform(builtHtml, 'defer-app')

  expect(output).not.toContain('<script type="module"')
  expect(output).not.toContain('rel="modulepreload"')
  expect(output).toContain('script.src = "/index.mjs"')

  // Other preloads keep their head start, and the prerendered markup is intact.
  expect(output).toContain('href="/images/hero.webp"')
  expect(output).toContain('<h1>Prerendered</h1>')
})

test('a prerendered page does not preload the chunks it delays', () => {
  const output = renderTemplate({
    template:
      '<html><head><link rel="stylesheet" href="/app.css"></head><body><div id="app"></div></body></html>',
    initialStateScript: '',
    appHtml: '<main></main>',
    preloadLinks:
      '<link rel="modulepreload" crossorigin href="/index.mjs">' +
      '<link rel="preload" as="font" crossorigin href="/font.woff2">',
    deferHydration: true
  })

  expect(output).not.toContain('rel="modulepreload"')
  expect(output).toContain('/font.woff2')
})
