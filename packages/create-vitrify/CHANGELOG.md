# create-vitrify

## 0.3.5

### Patch Changes

- 8f7d7e5: Fix hydration errors

## 0.3.4

### Patch Changes

- 9715393: Fix rendering errors by aliasing @vue/server-renderer to the local package

## 0.3.3

### Patch Changes

- a9e1ff6: fix: add @vue/server-renderer dependency and add @fastify/middie to internalServerModules

## 0.3.2

### Patch Changes

- 1fd4020: Replace import-meta-resolve by a naive resolving algorithm, fixes compilation errors

## 0.3.1

### Patch Changes

- a8e0471: Fix duplicate CSS imports of Quasar, reduced bundle size

## 0.3.0

### Minor Changes

- ae8e8f0: feat: added fastify mode for build and dev commands, fix: css in SSR dev mode should now work, fix: onSetup for fastify server now imports from file, feat: support vitrify.config.ts

## 0.2.0

### Minor Changes

- 4f10c93: Refactor and cleanup: move boot, ssr and setup functions to hooks in VitrifyConfig

## 0.1.1

### Patch Changes

- 59f2426: Vitrify
