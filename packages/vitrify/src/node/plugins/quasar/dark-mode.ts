import type { QuasarPluginOptions } from './index.js'

/**
 * The class swap that makes `config.dark: 'auto'` true *before* the first paint.
 *
 * With `dark: 'auto'` Quasar decides the theme from `prefers-color-scheme` — but
 * it decides it in the Dark plugin, i.e. when the app boots. A prerendered page
 * can only carry the class the build produced (`body--light`), so a visitor
 * whose OS is dark saw the light theme until the app had started; with
 * `deferHydration` that is a second of the wrong theme. Measured on a prerendered
 * site: `body--light` at 24 ms, `body--dark` at 203 ms.
 *
 * The decision does not need the framework. `matchMedia` at the top of `<body>`,
 * before anything paints, sets the class Quasar is about to set itself — so
 * nothing flips, and the app boots into the state the page already shows.
 *
 * Empty for `dark: true` or `dark: false`: those are fixed choices, and the
 * prerendered class already says which one. Only `'auto'` is left open.
 */
export const autoDarkScript = (
  config?: QuasarPluginOptions['framework']['config']
): string => {
  if (config?.dark !== 'auto') return ''

  return `<script>
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.remove('body--light')
      document.body.classList.add('body--dark')
    }
  } catch (e) {
    /* no matchMedia, no opinion: the app will decide when it boots */
  }
</script>`
}
