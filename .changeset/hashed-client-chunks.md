---
'vitrify': minor
---

Content-hash the client bundle's file names.

The client build emitted `entryFileNames: '[name].mjs'` and
`chunkFileNames: '[name].mjs'`, so every chunk kept its name across builds while
its contents changed. That leaves no `Cache-Control` value that is both safe and
useful: `immutable` on an unhashed name serves stale code until the name
eventually changes, and `no-cache` re-validates every chunk on every page view.
The version that is easy to get wrong is the one that breaks — a returning
visitor runs an old chunk beside new HTML and hydration fails with an error that
cannot be reproduced on demand.

Client output is now `[name]-[hash].mjs`, which makes `immutable` correct and
removes the revalidation. The two server bundles keep `[name].mjs`: they are
imported from disk by path (`ssr/server/entry-server.mjs`), so a hash would break
the import and buy nothing — Node does not cache by URL.

Hashes are Rolldown's 8 base64url characters, so `-` and `_` appear inside them.
A `Cache-Control` rule that matches `/name-<hash>.mjs` has to accept both, and
must not treat a hyphenated word as a hash: `server-renderer.mjs` and
`_plugin-vue_export-helper.mjs` are real names in the server bundle.

Anyone who hardcoded a client file name (a service worker precache list, a
Caddyfile `@hashed` regexp) needs to follow the new names or match the pattern.
