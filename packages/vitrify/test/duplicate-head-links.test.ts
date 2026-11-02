import { expect, test } from 'vitest'
import { renderTemplate } from '../src/node/frameworks/vue/fastify-ssr-plugin.js'

/**
 * A prerendered page shipped its stylesheet twice.
 *
 * `vite build` injects a `<link rel="stylesheet">` into `index.html` for the
 * client's CSS, and the SSR render returns a link for the same asset from the
 * module manifest. Both were appended to the head, and `beasties` inlines what
 * each link points at — so the stylesheet landed in the page twice: 35 KB of
 * HTML per page, 6.8 KB gzipped, and a second parse of 1500 rules.
 */
const template = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<meta charset="utf-8">',
  '<link rel="preload" as="style" crossorigin href="/assets/uno.css">',
  '<link rel="stylesheet" crossorigin href="/assets/uno.css">',
  '</head>',
  '<body><div id="app"></div></body>',
  '</html>'
].join('\n')

const count = (html: string, needle: string) => html.split(needle).length - 1

test('a stylesheet the template already links is not appended again', () => {
  const output = renderTemplate({
    template,
    initialStateScript: '',
    appHtml: '<main></main>',
    preloadLinks: '<link rel="stylesheet" href="/assets/uno.css">'
  })

  expect(count(output, 'rel="stylesheet"')).toBe(1)
  expect(count(output, '/assets/uno.css')).toBe(2)
})

test('a preload does not cancel the stylesheet it preloads', () => {
  const output = renderTemplate({
    template: '<html><head></head><body></body></html>',
    initialStateScript: '',
    appHtml: '',
    preloadLinks: [
      '<link rel="preload" as="style" href="/assets/uno.css">',
      '<link rel="stylesheet" href="/assets/uno.css">'
    ].join('\n')
  })

  expect(count(output, 'rel="preload"')).toBe(1)
  expect(count(output, 'rel="stylesheet"')).toBe(1)
})

test('links the template does not have are still appended, once', () => {
  const output = renderTemplate({
    template: '<html><head></head><body></body></html>',
    initialStateScript: '',
    appHtml: '',
    preloadLinks: [
      '<link rel="modulepreload" href="/vendor.mjs">',
      '<link rel="modulepreload" href="/vendor.mjs">',
      '<link rel="stylesheet" href="/assets/uno.css">'
    ].join('\n')
  })

  expect(count(output, '/vendor.mjs')).toBe(1)
  expect(count(output, '/assets/uno.css')).toBe(1)
})
