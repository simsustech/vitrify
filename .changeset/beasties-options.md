---
"vitrify": minor
---

Let a site pass options to `beasties` with `vitrify.beasties`.

`beasties` inlines each prerendered page's critical CSS with fixed settings
before now, including `fonts: true`, which inserts a `<link rel="preload">` for
every font the inlined CSS references — without checking what the document
already preloads. A site that preloads its own font therefore shipped that font
twice, once with `crossorigin` and once without, which the browser cannot
dedupe: 26 kB per page. `vitrify.beasties` takes any `beasties` option, so that
site can turn the automatic preload off and keep one emitter.
