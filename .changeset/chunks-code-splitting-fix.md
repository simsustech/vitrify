---
'vitrify': minor
---

feat: add `chunks` code splitting config and fix rolldown chunk duplication

Rolldown's `maxSize` splitting on a group duplicated modules across
chunks (vitejs/vite#22286), breaking single-instance libraries like
Vue's reactivity at runtime (`RefImpl is not a constructor`). Groups now
capture only their matching modules (`includeDependenciesRecursively:
false`) and are never split further; the default `vue` group is split
into per-package chunks (vue, vueRuntimeDom, vueRuntimeCore, ...).

The unused `manualChunks` option is replaced by `chunks`, a map of
chunk name → module path fragments. App-defined chunks run at a higher
priority than the built-in groups, so they can carve modules out of
them (e.g. `{ typst: ['@myriaddreamin/typst'] }`).