---
"vitrify": patch
---

Stop a prerendered page from shipping its stylesheet twice. The template already
carries the `<link rel="stylesheet">` that `vite build` injects for the client's
CSS, and the SSR render returned a link for the same asset from the module
manifest; both were appended to the head, and `beasties` inlines what each link
points at. Every prerendered page therefore carried the whole stylesheet twice —
35 KB of HTML, 6.8 KB gzipped, and a second parse of 1500 rules in the browser.
Links are now appended only when the head does not already hold the same `rel`
and `href`, so a `<link rel="preload">` still never cancels the stylesheet it
preloads.
