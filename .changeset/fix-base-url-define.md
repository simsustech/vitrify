---
'vitrify': patch
---

fix: derive `__BASE_URL__` from the effective base config

`__BASE_URL__` (used for vue-router history and SSR) was always
defined from the default base (`/`), even when the app config set a
custom `base` (e.g. `/repo-name/` for GitHub Pages project sites). On
deploy, assets resolved correctly but vue-router never stripped the
prefix, so the root URL rendered the app's 404 page.

The define is now derived from the merged, effective base after the
user config is applied. Users can still override it explicitly via
`define.__BASE_URL__`.