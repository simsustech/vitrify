# vitrify

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
