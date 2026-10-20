---
'vitrify': minor
---

Inject analytics tags into the served HTML from the config.

A measuring script added by a component only exists after the client bundle has
run: the first page view of a visitor on a slow connection is unmeasured, and a
crawler never sees it at all. The tag now comes from `vitrify.analytics` at build
time, so it is part of the prerendered HTML — and because the decision is made at
build time, a site without a website id ships no third-party request anywhere,
instead of a `<script>` that a runtime guard has to hide.

```ts
vitrify: {
  analytics: {
    umami: {
      websiteId: '…',
      host: 'stats.example.com',   // bare host or full origin
      domains: ['example.com'],    // keeps previews out of the numbers
      // doNotTrack defaults to true
    }
  }
}
```

Umami is the first tool here because it stores nothing on the visitor's device,
so the tag needs no consent gate; the `analytics` object is shaped so a
consent-gated tool can be added beside it rather than folded into it.
