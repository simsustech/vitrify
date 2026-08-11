---
"vitrify": patch
---

fix(vitrify): isolate server entry side effects in SSG builds

Rolldown's code splitting was merging `ssr/server.ts` (which has a
top-level `app.listen()` side effect) into the shared chunk imported by
`entry-server.ts`. This caused the SSG prerender to start an in-process
fastify server on port 3000, keeping Node alive after all pages were
generated.

Added `includeDependenciesRecursively: false` entry-point groups for
`server`, `entry-server`, `prerender`, and `fastify-ssr-plugin` so
rolldown keeps each entry in its own chunk. Also added a `vendor` group
and restored `moduleChunks` for vue/quasar/fastify/beasties to improve
cache invalidation.

Additionally fixed a missing `await` on the `prerender()` call in
`cli.ts` SSG action.