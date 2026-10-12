import { expect, test } from 'vitest'
import { baseConfig } from '../src/node/index.js'

/**
 * D7 — the `vitrify-setup` `transformIndexHtml` handler collects every
 * `<link ...>` in `<head>`, strips them, and re-appends all of them. It never
 * de-duplicates, so when the built head already contains the same stylesheet
 * twice (once with `crossorigin`, once without — which is what the SSG path
 * produces once the Quasar plugin also emits the collected stylesheets via
 * `_meta.resourceStyles`), the duplicate is preserved and every visitor
 * downloads that CSS twice.
 *
 * The minimal integration fixture only produces a single CSS asset, so it
 * cannot reproduce the duplication end-to-end. This spec therefore pins the
 * invariant at the transform's own documented boundary — an HTML document in,
 * an HTML document out — using a head that already contains the duplicate.
 */
const sampleHtml = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<meta charset="UTF-8" />',
  '<link rel="stylesheet" href="/assets/app.css" />',
  '<link rel="stylesheet" crossorigin href="/assets/app.css" />',
  '<link rel="stylesheet" href="/assets/extra.css" />',
  '<link rel="modulepreload" crossorigin href="/vendor.mjs" />',
  '</head>',
  '<body><div id="app"></div></body>',
  '</html>'
].join('\n')

async function transformHeadHtml(html: string): Promise<string> {
  const config = await baseConfig({
    command: 'build',
    mode: 'production',
    appDir: new URL('integration/app/', import.meta.url)
  })

  const plugins = (config.plugins as unknown[]).flat(Infinity) as {
    name?: string
    transformIndexHtml?: { handler: (html: string) => string }
  }[]

  const setup = plugins.find((plugin) => plugin?.name === 'vitrify-setup')

  expect(setup?.transformIndexHtml?.handler).toBeTypeOf('function')

  return setup!.transformIndexHtml!.handler(html)
}

test('the built head references each stylesheet exactly once', async () => {
  const output = await transformHeadHtml(sampleHtml)

  const stylesheetHrefs = [
    ...output.matchAll(/<link\b[^>]*\brel=["']?stylesheet["']?[^>]*>/gi)
  ].map((match) => match[0].match(/\bhref=["']([^"']+)["']/i)?.[1])

  expect(stylesheetHrefs).toContain('/assets/app.css')
  expect(stylesheetHrefs).toContain('/assets/extra.css')

  const counts = new Map<string, number>()
  for (const href of stylesheetHrefs) {
    counts.set(href as string, (counts.get(href as string) ?? 0) + 1)
  }

  const duplicated = [...counts.entries()].filter(([, count]) => count > 1)

  expect(duplicated).toEqual([])
})

test('non-stylesheet links are preserved exactly once', async () => {
  const output = await transformHeadHtml(sampleHtml)

  const modulepreloads = [
    ...output.matchAll(/<link\b[^>]*\brel=["']?modulepreload["']?[^>]*>/gi)
  ]

  expect(modulepreloads).toHaveLength(1)
  expect(output).toContain('/vendor.mjs')
})

test('the document charset and body are left intact', async () => {
  const output = await transformHeadHtml(sampleHtml)

  expect(output.indexOf('<meta charset="UTF-8" />')).toBeLessThan(
    output.indexOf('/assets/app.css')
  )
  expect(output).toContain('<div id="app"></div>')
})
