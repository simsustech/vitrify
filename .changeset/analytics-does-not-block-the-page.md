---
"vitrify": patch
---

Stop an analytics tag from holding the page's `DOMContentLoaded`.

The Umami tag was emitted with `defer`, and a deferred script is executed before
`DOMContentLoaded` fires — so an analytics host that was slow or unreachable
delayed the page becoming ready, and anything waiting on that with it. Analytics
is independent of the app; the tag is now `async`.
