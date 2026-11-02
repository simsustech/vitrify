import { expect, test } from 'vitest'
import { autoDarkScript } from '../src/node/plugins/quasar/dark-mode.js'

/**
 * `dark: 'auto'` was applied by Quasar's Dark plugin, which runs when the app
 * boots — not when the page paints. A prerendered page always carries the class
 * the build produced, so a dark-OS visitor got the light theme first: measured
 * `body--light` at 24 ms and `body--dark` at 203 ms, and with `deferHydration`
 * the gap is a second.
 *
 * The fix is a `matchMedia` check at the top of `<body>`, which sets the class
 * Quasar is about to set itself.
 */
test('auto mode swaps the class before paint', () => {
  const script = autoDarkScript({ dark: 'auto' })

  expect(script).toContain("matchMedia('(prefers-color-scheme: dark)')")
  expect(script).toContain("classList.remove('body--light')")
  expect(script).toContain("classList.add('body--dark')")

  // Inline and synchronous: a `defer`/`async` script would paint first.
  expect(script.startsWith('<script>')).toBe(true)
  expect(script).not.toContain('src=')
  expect(script).not.toContain('defer')
})

test('a fixed theme is left alone', () => {
  // `true` and `false` are choices the prerendered class already states; a
  // matchMedia swap would override them.
  expect(autoDarkScript({ dark: true })).toBe('')
  expect(autoDarkScript({ dark: false })).toBe('')
  expect(autoDarkScript({})).toBe('')
  expect(autoDarkScript(undefined)).toBe('')
})
