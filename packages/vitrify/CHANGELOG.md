# vitrify

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
