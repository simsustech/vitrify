import type { VitrifyConfig } from './vitrify-config.js'

/**
 * The `vitrify` block of the config this process resolved.
 *
 * It exists for one caller: the `ssg` command, which builds the bundle first and
 * then hands options to `prerender()` — a function that is imported from the
 * app's own SSR output and therefore cannot read this process's configuration
 * any other way. The plugins in `index.ts` read `vitrifyConfig` directly; they
 * are built inside `baseConfig`, where it is already in scope.
 */
let loadedVitrifyOptions: VitrifyConfig['vitrify'] | undefined

export const setVitrifyOptions = (
  options: VitrifyConfig['vitrify'] | undefined
): void => {
  loadedVitrifyOptions = options
}

export const getVitrifyOptions = (): VitrifyConfig['vitrify'] | undefined =>
  loadedVitrifyOptions
