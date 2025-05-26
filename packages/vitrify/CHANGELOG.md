# vitrify

## 0.23.0

### Minor Changes

- f4d6982: feat(vitrify): add pinia colada plugin
- d95082c: feat(vitrify): add Pinia VitrifyPlugin
- 7c49449: feat(vitrify): add onCreateApp hook and type the internal render fn
- 59d5e62: feat(vitrify): add onRendered hook which runs before the template render

### Patch Changes

- 75180a3: fix(vitrify): fix SSRContext
- 18cc6e4: refactor(vitrify): rename onRendered to onTemplateRendered

## 0.22.0

### Minor Changes

- 35774d4: feat(vitrify): export vitrify plugins with subpath export
- 80cec96: feat(vitrify): merge dev server config into baseConfig
- 24e048c: refactor(vitrify): refactor and cleanup

### Patch Changes

- 1c32a9e: feat(vitrify): add @fastify/one-line-logger
- 433ead7: feat(vitrify): use environment api in ssr

## 0.21.0

### Minor Changes

- 8ec204c: feat(vitrify): add loadSSRAssets to fastify-ssr-plugin

### Patch Changes

- eae0ac7: fix(vitrify): fix appDir in loadSSRAssets
- 496aab2: chore: update dependencies
- bdd3d59: fix(vitrify): fix manualChunksFn

## 0.20.0

### Minor Changes

- cd0b20a: feat(vitrify): use and export renderHtml function in fastify-ssr-plugin

## 0.19.1

### Patch Changes

- c342b6c: chore: update dependencies

## 0.19.0

### Minor Changes

- 75aec30: feat: add preliminary material design 3 to QuasarPreset

## 0.18.5

### Patch Changes

- 7f6c363: fix(vitrify): fix QuasarPreset QPageSticky safelist
- d45500e: fix(vitrify): fix QuasarPreset Dialog safelist
- 90c16b1: fix(vitrify): fix QuasarPreset fullscreen z-index

## 0.18.4

### Patch Changes

- 7315f9a: fix(vitrify): fix QuasarPreset QBtn fab

## 0.18.3

### Patch Changes

- caeabac: fix(vitrify): fix QuasarPreset QTabs safelist

## 0.18.2

### Patch Changes

- 8357155: fix(vitrify): fix QuasarPreset color extractor

## 0.18.1

### Patch Changes

- 8442589: fix(vitrify): fix QPageSticky safelist

## 0.18.0

### Minor Changes

- e75eebb: feat(vitrify): add minify command

### Patch Changes

- 30ee44a: fix(vitrify): sort html head links

## 0.17.18

### Patch Changes

- 8f10385: fix(vitrify): add svg preload links

## 0.17.17

### Patch Changes

- 1b9ec5f: fix(vitrify): define fontFamily in QuasarPreset theme

## 0.17.16

### Patch Changes

- 54ffeb9: chore: update dependencies

## 0.17.15

### Patch Changes

- 31e320a: fix(vitrify): replace critters with beasties in internalServerModules
- 274cc0f: fix(vitrify): remove html body margin in QuasarPreset

## 0.17.14

### Patch Changes

- f29ccab: chore: update dependencies
- e39a8d4: fix(vitrify): fix QuasarPreset QBtn
- 4f46317: fix(vitrify): fix QuasarPreset QChip
- aa6318b: fix(vitrify): add user defined unocss pipeline include
- 8240130: fix(vitrify): remove double presets from QuasarPreset
- 78a54bd: chore: update dependencies

## 0.17.13

### Patch Changes

- b0b88d2: fix(vitrify): fix QuasarPreset padding and margin
- ab885a3: fix(vitrify): fix QuasarPreset QToggle
- 43074a6: fix(vitrify): fix QuasarPreset q-tabs--not-scrollable
- ad72279: fix(vitrify): fix QuasarPreset QTabs
- 32ee19a: fix(vitrify): fix QuasarPreset QTime

## 0.17.12

### Patch Changes

- 7886838: fix(vitrify): fix QuasarPreset QFab
- 617ace8: fix(vitrify): fix QuasarPreset theme spacing
- a3e920f: fix(vitrify): fix QuasarPreset QDate, flex and size
- 5028f4c: fix(vitrify): fix QBtn, QField, QToggle
- 21a1fe6: fix(vitrify): fix QuasarPreset components

## 0.17.11

### Patch Changes

- d2455d8: fix(vitrify): fix QuasarPreset QCarousel transitions
- 719dd9f: fix(vitrify): remove !important from QuasarPreset q-dark
- fe8c1e2: fix(vitrify): add flex-center class to QuasarPreset
- 8a5db52: fix(vitrify): add inline shortcut to QuasarPreset flex
- d401ef0: fix(vitrify): return presets instead of setting them in the preset configuration in QuasarPreset
- 5a6aa9f: fix(vitrify): fix QuasarPreset QChatMessage and QCheckbox
- 1c79087: fix(vitrify): fix QuasarPreset dark background
- 7a4e3eb: fix(vitrify): fix QuasarPreset QBar QBtn QCard QTabPanel
- e6eedcb: fix(vitrify): fix QuasarPreset z-index
- 03e4141: fix(vitrify): fix QuasarPreset QBar QBtn QCard QTabPanel

## 0.17.10

### Patch Changes

- 31ab88f: fix(vitrify): fix QuasarPreset flex typo
- 2ebd88f: feat(vitrify): add color extractor for QuasarPreset

## 0.17.9

### Patch Changes

- 3233aea: fix(vitrify): fix QuasarPreset theme colors
- 3a622d4: fix(vitrify): add QuasarPreset theme breakpoints
- 267180c: fix(vitrify): fix QuasarPreset pointer events
- 368ee3b: fix(vitrify): fix QuasarPreset q-gutter
- ccbd44e: fix(vitrify): fix QuasarPreset flex gutter

## 0.17.8

### Patch Changes

- fb45e8d: fix(vitrify): add QuasarPreset elevation shortcuts
- 74e851d: fix(vitrify): add QuasarPreset transition preflights
- 53afb17: fix(vitrify): re-enable QLayout preflight
- 4d4999a: fix(vitrify): fix QuasarPreset utility classes bugs
- f422633: feat(vitrify): shrink safelist and add transitions to QuasarPreset

## 0.17.7

### Patch Changes

- a9ba0d9: feat(vitrify): add @unocss/preset-icons to QuasarPreset
- db6c28a: fix(vitrify): fix QuasarPreset flex
- c586c06: feat(vitrify): add iconMapFn support to QuasarPlugin

## 0.17.6

### Patch Changes

- 047e27f: feat(vitrify): add Quasar component BEM classes to UnoCSS theme

## 0.17.5

### Patch Changes

- b07c18f: fix(vitrify): fix QuasarConf types
- a08ce17: feat(vitrify): add plugin safelist map to QuasarPreset

## 0.17.4

### Patch Changes

- 3b7a7ed: fix(vitrify): fix type errors and re-enable QuasarPreset preflights

## 0.17.3

### Patch Changes

- b223acb: fix(vitrify): remove @unocss/reset

## 0.17.2

### Patch Changes

- 8302bf4: fix(vitrify): remove @unocss/reset from main.ts and use a preflight with beasties include comment
- f6eab58: fix(vitrify): set compress to false for beasties prerender

## 0.17.1

### Patch Changes

- f68f809: feat(vitrify): remove quasar components from unocss safelist and add an extractor
- 3bfa18a: fix(vitrify): import @unocss/reset/normalize.css in main.ts

## 0.17.0

### Minor Changes

- feat: add unocss to vitrify

### Patch Changes

- 79eea04: fix(vitrify): replace critters with beasties
- 479236c: fix(vitrify): add logLevel to fastify server

## 0.16.4

### Patch Changes

- 604afe2: fix(vitrify): fix subdir creation when prerendering
- 043ca87: chore: update dependencies

## 0.16.3

### Patch Changes

- 86270ee: chore: update dependencies

## 0.16.2

### Patch Changes

- 10d3e00: chore: update packages

## 0.16.1

### Patch Changes

- 4ffae49: chore: update packages

## 0.16.0

### Minor Changes

- 3c4f8f0: chore: update dependencies

## 0.15.3

### Patch Changes

- 30d4a86: fix: replace builtin-modules with node:module

## 0.15.2

### Patch Changes

- 3d6e374: chore: update packages

## 0.15.1

### Patch Changes

- d8ccbb7: fix: add port to createServer on fastifyRestart

## 0.15.0

### Minor Changes

- b464647: feat: add --port option to CLI

### Patch Changes

- 77d6c3d: fix: replace 127.0.0.1 with localhost (ip6 support)

## 0.14.4

### Patch Changes

- 12d8f9a: chore: update peer dependencies

## 0.14.3

### Patch Changes

- 3a13558: chore: update peer dependencies

## 0.14.2

### Patch Changes

- 16256e9: Update packages

## 0.14.1

### Patch Changes

- 70bebe1: Update packages

## 0.14.0

### Minor Changes

- d8b98ff: feat(vitrify): update to vite v5

## 0.13.2

### Patch Changes

- 7d33df0: fix(vitrify): use transform to remove pwa only code in non-pwa mode
- 7d33df0: fix(vitrify): rearrange PWA import to prevent build errors

## 0.13.1

### Patch Changes

- acaf16b: fix(vitrify): add vite-plugin-pwa to rollupOptions external

## 0.13.0

### Minor Changes

- 8829902: feat(vitrify): add PWA support with vite-plugin-pwa

### Patch Changes

- 6b56a09: fix(vitrify): await app.ready in fastify development mode

## 0.12.2

### Patch Changes

- da26057: fix(vitrify): precompress assets served by fastify-static in ssr plugin
- 135a658: fix(vitrify): fix 'cannot read from undefined' error in main.ts

## 0.12.1

### Patch Changes

- 111526d: fix(vitrify): check if sassVariables are defined before applying

## 0.12.0

### Minor Changes

- 4e30225: feat(vitrify): add live reload functionality in fastify mode

### Patch Changes

- 5152fd9: fix(vitrify): throw error when no valid vitrify.conf is found

## 0.11.10

### Patch Changes

- 39de004: fix(vitrify): fix import paths for Windows platform

## 0.11.9

### Patch Changes

- baef41f: fix(vitrify): fix paths for Windows platform

## 0.11.8

### Patch Changes

- 86cc92a: fix(vitrify): replace .pathname with fileURLToPath

## 0.11.7

### Patch Changes

- 7bec813: Fix prerendering

## 0.11.6

### Patch Changes

- 1f4922c: Add ajv dependency

## 0.11.5

### Patch Changes

- dcf3d1e: Retrieve product name from vitrify config; deprecate plugin-env

## 0.11.4

### Patch Changes

- 905d0c4: Fix onSetup imports

## 0.11.3

### Patch Changes

- 78b6314: Add manualChunks config option and move env plugin to tools

## 0.11.2

### Patch Changes

- a3f6dae: Fix **HOST** definition, inject it as a string

## 0.11.1

### Patch Changes

- dacc241: Move unplugin-vue-components from plugin to root

## 0.11.0

### Minor Changes

- 7ecf044: Add Fastify logger in SSR dev mode, inject html without replacing comments, update create-vitrify templates

## 0.10.6

### Patch Changes

- d188545: Fix CSS injection in SSR dev mode

## 0.10.5

### Patch Changes

- 5e6ec0d: Fix CSS/SASS issues by manually appending preload links to head and injecting SASS into a RootComponent SFC by using a vite transform"

## 0.10.4

### Patch Changes

- 9e4c3c6: Fix loading of manifest during prerender

## 0.10.3

### Patch Changes

- 8786fa7: Fix critical CSS preloadstrategy

## 0.10.2

### Patch Changes

- 1afcf32: Move global SASS to additionalData

## 0.10.1

### Patch Changes

- d46bfe2: Add typescript client types
- d46bfe2: Fix CSS import order
- Updated dependencies [d46bfe2]
  - @vitrify/plugin-env@0.1.1

## 0.10.0

### Minor Changes

- 01cb0c9: Add support for reactive provide/inject variables

### Patch Changes

- b217135: Fix .ts imports in Vite

## 0.9.2

### Patch Changes

- 3acefb9: Fix nested secure development servers in SSR mode, Fix initial state injection

## 0.9.1

### Patch Changes

- e966f19: Fix Quasar SSR constant definition (should depend on the build command, not the transform SSR value)

## 0.9.0

### Minor Changes

- 73b0a26: Add framework.iconSet to Quasar options

### Patch Changes

- 2fef4f7: Add getFirstOpenPort() function to prevent Websocket port errors in Vite

## 0.8.0

### Minor Changes

- 45974ac: @vitrify/plugin-env: isomorphic environment variable retrieval

### Patch Changes

- Updated dependencies [45974ac]
  - @vitrify/plugin-env@0.1.0

## 0.7.2

### Patch Changes

- f6c40d8: Only import Vitrify during development mode in SSR plugin

## 0.7.1

### Patch Changes

- 05f0ea3: Add onSetup to server initialization
- e738725: Cleanup

## 0.7.0

### Minor Changes

- 47c83b1: feat(vitrify): add vitrify.ssr.fastify option to VitrifyConfig\ fix(vitrify): dedupe staticImports array\ fix(vitrify): do not minify internal imports as this breaks the SSR plugin

## 0.6.18

### Patch Changes

- d29cb47: Revert the use of vitrify.css as icons do not seem to work
- 32e3c93: Fix Quasar framework.lang configuration
- f3d8827: Use vitrify.css for global CSS

## 0.6.17

### Patch Changes

- 9e73ec0: Add onRendered to prerender

## 0.6.16

### Patch Changes

- 6a283ec: Various ssr and dev related fixes

## 0.6.15

### Patch Changes

- 1d40a80: Fix manual chunking

## 0.6.14

### Patch Changes

- c68c3dd: Fix quasar/src alias...

## 0.6.13

### Patch Changes

- 6dac566: Use resolvePackageData from vite for package resolution

## 0.6.12

### Patch Changes

- 9a6b8bd: Remove @vue/server-renderer dependency (should fix "Server rendering context not provided" error)
- dedfbae: Fix vue-router types compilation errors

## 0.6.11

### Patch Changes

- 537bdb7: Make renderToString an argument and import dynamically if not defined

## 0.6.10

### Patch Changes

- 9c22676: Create manual chunk for vitrify internals

## 0.6.9

### Patch Changes

- e977a76: Add vue-router to moduleChunks

## 0.6.8

### Patch Changes

- 64bf58c: Update vue-router and fix types

## 0.6.7

### Patch Changes

- 71ccb15: Remove quasar/src alias

## 0.6.6

### Patch Changes

- c4d1f36: Fix vue alias

## 0.6.5

### Patch Changes

- 5e50b77: Fix quasar/src alias

## 0.6.4

### Patch Changes

- eebc9d6: Traverse upwards when resolving packages

## 0.6.3

### Patch Changes

- 86bb2f6: Remove onSetup from entry-server

## 0.6.2

### Patch Changes

- 3bb618c: Add a prerender exports field to vitrify

## 0.6.1

### Patch Changes

- 7097f43: Create manual chunks for vue and quasar to prevent vendor.mjs from getting too large
- cee8ff4: Fix SSR dev mode and onRendered is now integrated into entry-server
- af64563: Dynamically import critters to prevent cjs bundling errors

## 0.6.0

### Minor Changes

- 975fda2: Add critical CSS generation when prerendering

## 0.5.10

### Patch Changes

- 1473cae: Exclude quasar from optimizeDeps (fixes SSR dev mode)

## 0.5.9

### Patch Changes

- 818041e: Fix Quasar treeshaking

## 0.5.8

### Patch Changes

- 8f7d7e5: Fix hydration errors

## 0.5.7

### Patch Changes

- f034563: Remove all manually resolved aliases and problematic package.json import

## 0.5.6

### Patch Changes

- 9715393: Fix rendering errors by aliasing @vue/server-renderer to the local package

## 0.5.5

### Patch Changes

- a9e1ff6: fix: add @vue/server-renderer dependency and add @fastify/middie to internalServerModules

## 0.5.4

### Patch Changes

- 1fd4020: Replace import-meta-resolve by a naive resolving algorithm, fixes compilation errors

## 0.5.3

### Patch Changes

- a8e0471: Fix duplicate CSS imports of Quasar, reduced bundle size

## 0.5.2

### Patch Changes

- 1f71c74: Add a --debug option for build, fix Quasar bundle size, fix unnecessary loading of sideEffects by creating manual chunks for virtual modules"

## 0.5.1

### Patch Changes

- dc69c57: Fix define of Quasar SSR constants; Fix HMR port in development config

## 0.5.0

### Minor Changes

- 2a7351f: Various SSR and development server fixes

## 0.4.0

### Minor Changes

- ae8e8f0: feat: added fastify mode for build and dev commands, fix: css in SSR dev mode should now work, fix: onSetup for fastify server now imports from file, feat: support vitrify.config.ts

## 0.3.0

### Minor Changes

- 4f10c93: Refactor and cleanup: move boot, ssr and setup functions to hooks in VitrifyConfig

## 0.2.5

### Patch Changes

- 2c36071: fix(vitrify): only create manual chunks for files inside src/vite

## 0.2.4

### Patch Changes

- f3e278b: fix(vitrify): move unplugin-vue-components to dependencies

## 0.2.3

### Patch Changes

- e27cba0: fix(ssr): create a separate chunk for prerender file

## 0.2.2

### Patch Changes

- f2fffed: vitrify: update package.json files

## 0.2.1

### Patch Changes

- 58370de: Fix prerendering and add a frameworks folder
- c03bb1c: Fix Quasar SSR injection and retrieval of product name from VitrifyConfig

## 0.2.0

### Minor Changes

- Get app URLs by function and add SASS variables and additionalData to VitrifyConfig

## 0.1.1

### Patch Changes

- 59f2426: Vitrify
