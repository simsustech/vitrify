---
"vitrify": minor
---

Boot the client after the page has loaded, with `vitrify.deferHydration`.

Every prerendered page is real HTML — text, links, images and forms are in the
markup before any JavaScript runs — yet the entry chunk and its `modulepreload`
links were fetched while the document was still parsing, competing for bandwidth
with the stylesheet and the fonts. Lighthouse's mobile simulation charges that to
First Contentful Paint. Measured on a prerendered site: 375 KiB preloaded, FCP
2.7 s, LCP 3.1 s, performance 67; with the entry deferred, FCP 1.2 s, LCP 1.7 s,
performance 100 (desktop 97 → 100).

Enabled, the built HTML carries no module `<script>` and no `modulepreload`
links; an inline bootstrap imports the entry the build emitted. It starts on
`load`, on the first interaction, or one second after the first paint — that last
trigger matters because `load` also waits for third-party tags, and a stalled
analytics host otherwise leaves the page inert (measured: 8.1 s).

Off by default: it changes when the app boots, so an app whose above-the-fold UI
is client-only should leave it off.
