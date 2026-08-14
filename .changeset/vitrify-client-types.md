---
'vitrify': patch
'@vitrify/tools': patch
---

fix: ship working `vitrify/client` TypeScript declarations

`vitrify/client` was declared in the package `exports` but the file was
empty and excluded from the published tarball (`files`). It now contains
ambient declarations for the virtual modules (`virtual:vitrify-hooks`,
`virtual:static-imports`, `virtual:vitrify-config`, the `virtual:quasar*`
modules) and the build-time defines (`__BASE_URL__`, `__HOST__`,
`__IS_PWA__`, `__DEBUG__`, plus `__DEV__`/`__QUASAR_VERSION__`), and
`client.d.ts` is included in `files`.

Also removes the dead `import` condition on `vitrify/hooks` (it is a
types-only subpath) and switches the generated app tsconfig to
`moduleResolution: "bundler"`.
