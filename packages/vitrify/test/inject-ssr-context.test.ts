import { expect, test } from 'vitest'
import { injectSsrContext } from '../src/node/plugins/quasar/index.js'

/**
 * D11 — `injectSsrContext` spliced the SSR-collected head tags in immediately
 * after `<head>`, which pushed the document's own `<meta charset>` past the
 * first 1 KiB. Lighthouse's `charset` audit fails as a result, and browsers may
 * start over when they discover the encoding late.
 */
const html = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<meta charset="utf-8">',
  '<title>plain</title>',
  '</head>',
  '<body><div id="app"></div></body>',
  '</html>'
].join('\n')

const ssrContext = {
  _meta: {
    headTags:
      '<meta name="description" content="injected"><link rel="canonical" href="https://example.test/">',
    resourceStyles: '<style>.a{color:red}</style>',
    endingHeadTags: '<script>window.__Q_META__={}</script>',
    htmlAttrs: 'lang="en"',
    bodyClasses: 'desktop'
  }
}

test('injected head tags do not precede the document charset', () => {
  const output = injectSsrContext({
    html,
    ssrContext
  } as never) as string

  const charsetAt = output.indexOf('<meta charset="utf-8">')
  const injectedAt = output.indexOf('name="description"')

  expect(charsetAt).toBeGreaterThan(-1)
  expect(injectedAt).toBeGreaterThan(-1)
  expect(charsetAt).toBeLessThan(injectedAt)

  // The charset must stay inside the first 1 KiB for the Lighthouse audit.
  expect(charsetAt).toBeLessThan(1024)
})

test('injected tags still land inside <head>, before </head>', () => {
  const output = injectSsrContext({
    html,
    ssrContext
  } as never) as string

  const headEnd = output.indexOf('</head>')

  expect(output.indexOf('name="description"')).toBeLessThan(headEnd)
  expect(output.indexOf('.a{color:red}')).toBeLessThan(headEnd)
  expect(output.indexOf('__Q_META__')).toBeLessThan(headEnd)
})

test('html and body attributes are still applied', () => {
  const output = injectSsrContext({
    html,
    ssrContext
  } as never) as string

  expect(output).toContain('lang="en"')
  expect(output).toContain('desktop')
})

/**
 * Two sources of truth for the document title collided: vitrify's
 * `productName` handling appends a `<title>` when the document has none
 * (`addOrReplaceTitle` in `helpers/utils.ts`), and Quasar's Meta plugin injects
 * the per-page title. The built page ended up with **two** `<title>` tags, and a
 * crawler picks arbitrarily between them.
 *
 * The SSR-collected head tags win, because they are the ones that know which
 * page is being rendered.
 */
test('replaces a pre-existing <title> when the head tags carry one', () => {
  const htmlWithTitle = html.replace(
    '<title>plain</title>',
    '<title>Product name</title>'
  )

  const output = injectSsrContext({
    html: htmlWithTitle,
    ssrContext: {
      _meta: {
        ...ssrContext._meta,
        headTags:
          '<title>Home · My Site</title><meta name="description" content="d">'
      }
    }
  } as never) as string

  const titleTags = output.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) ?? []

  expect(titleTags).toHaveLength(1)
  expect(output).toContain('<title>Home · My Site</title>')
  expect(output).not.toContain('<title>Product name</title>')
})

test('leaves the document title alone when the head tags have none', () => {
  const htmlWithTitle = html.replace(
    '<title>plain</title>',
    '<title>Product name</title>'
  )

  const output = injectSsrContext({
    html: htmlWithTitle,
    ssrContext
  } as never) as string

  // No title in headTags → the existing one is the only one, so it stays.
  expect(output).toContain('<title>Product name</title>')
})
