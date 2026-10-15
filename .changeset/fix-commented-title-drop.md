---
'vitrify': patch
---

fix: do not mistake a `<title>` inside an HTML comment for the document title

`injectSsrContext` drops the document's pre-existing `<title>` so the
SSR-collected head tags stay the only source of truth. The matcher was not
comment-aware, so a `<title>` written inside an HTML comment — as a note
explaining the empty-title workaround — was matched, and the match ran on to the
document's real `</title>`, taking the comment's terminator with it. Everything
after the comment (the module script, the stylesheets and the modulepreloads)
stayed inside an unterminated comment: the browser executed nothing and the page
rendered blank.

Comments are now consumed first and handed back untouched, so only a real
`<title>` is dropped. A regression test covers the shape that broke and fails
against the previous matcher; a second test pins the boundary where the comment
holds the document's only `<title>`.
