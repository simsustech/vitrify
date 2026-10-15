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

/**
 * A `<title>` that only appears inside an HTML comment is documentation, not a
 * title. Matching it made the drop above swallow the comment's terminator too:
 * the module script, the stylesheets and the modulepreloads that follow stayed
 * inside an unterminated comment, the browser executed nothing, and the page
 * rendered blank. slimfact's `packages/app/index.html` documents the empty-title
 * workaround in exactly such a comment, so this is that shape.
 */
const htmlWithCommentedTitle = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<meta charset="utf-8">',
  '<!-- The route map owns the title: an empty <title> here duplicated it',
  '     in the SSR head. -->',
  '<title>Product name</title>',
  '<script type="module" src="/index.mjs"></script>',
  '</head>',
  '<body><div id="app"></div></body>',
  '</html>'
].join('\n')

const withHeadTitle = {
  _meta: {
    ...ssrContext._meta,
    headTags: '<title>Home · My Site</title>'
  }
}

test('drops a real <title> but keeps one written inside a comment', () => {
  const output = injectSsrContext({
    html: htmlWithCommentedTitle,
    ssrContext: withHeadTitle
  } as never) as string

  // Exactly one closing title tag: the authoritative one from the head tags.
  expect(output.match(/<\/title>/gi) ?? []).toHaveLength(1)
  expect(output).toContain('<title>Home · My Site</title>')
  expect(output).not.toContain('<title>Product name</title>')

  // The comment stayed terminated, so what follows it is real markup again.
  expect(output).toContain('in the SSR head. -->')
  const scriptAt = output.indexOf('<script type="module"')
  const commentAt = output.lastIndexOf('<!--', scriptAt)
  expect(output.indexOf('-->', commentAt)).toBeLessThan(scriptAt)
})

test('a commented <title> is never mistaken for the document title', () => {
  const withoutRealTitle = htmlWithCommentedTitle.replace(
    '<title>Product name</title>\n',
    ''
  )

  const output = injectSsrContext({
    html: withoutRealTitle,
    ssrContext: withHeadTitle
  } as never) as string

  // Nothing to drop, so nothing is: the comment survives whole and the head
  // still carries the authoritative title exactly once.
  expect(output).toContain('in the SSR head. -->')
  expect(output.match(/<\/title>/gi) ?? []).toHaveLength(1)
  const scriptAt = output.indexOf('<script type="module"')
  const commentAt = output.lastIndexOf('<!--', scriptAt)
  expect(output.indexOf('-->', commentAt)).toBeLessThan(scriptAt)
})
