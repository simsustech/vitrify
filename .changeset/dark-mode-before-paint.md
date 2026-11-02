---
"vitrify": patch
---

Decide Quasar's `dark: 'auto'` before the first paint.

With `dark: 'auto'` Quasar picks the theme from `prefers-color-scheme` inside its
Dark plugin — that is, when the app boots. A prerendered page can only carry the
class the build produced, so a visitor whose OS is dark saw the light theme until
then: measured `body--light` at 24 ms and `body--dark` at 203 ms, and with
`deferHydration` the gap becomes about a second of the wrong theme.

The Quasar plugin now emits an inline `matchMedia` check at the top of `<body>`,
which sets the class Quasar is about to set itself, so nothing flips.
`dark: true` and `dark: false` are untouched: those are choices the prerendered
class already states.
