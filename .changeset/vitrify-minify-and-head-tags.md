---
'vitrify': patch
---

Minify production builds by default, and stop emitting duplicate assets in `<head>`.

- **`build()` no longer hardcodes `minify: false`.** Production builds are minified unless
  `--debug` is passed or `minify: false` is set explicitly. Previously every vitrify app shipped
  its JavaScript unminified (~327 KiB in a default app).
- **The `vitrify-setup` `transformIndexHtml` hook de-duplicates `<link>` tags by `href`** instead
  of re-appending every match. A stylesheet that appears twice in the document (with and without
  `crossorigin`, or injected by the SSR pass via `_meta.resourceStyles`) is now referenced once
  and downloaded once.
- **`injectSsrContext` injects the SSR-collected head tags at the end of `<head>`** rather than
  immediately after the opening tag, so the document's own `<meta charset>` stays inside the
  first 1 KiB. This makes the Lighthouse `charset` audit pass and avoids the browser re-parsing
  the document once it discovers the encoding.
