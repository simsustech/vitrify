---
'vitrify': patch
---

fix: inline CSS in SSG builds with a custom base URL

When the Vite `base` config is set (e.g. `/repo-name/` for GitHub Pages), the prerender step could not resolve built stylesheets — the `base` prefix was not stripped from asset hrefs when reading files from disk, so beasties logged "Unable to locate stylesheet".

The prerender step now resolves the effective `base` from the merged Vite config and passes it into `prerender()`, which configures beasties' `publicPath` to strip the base prefix when resolving stylesheets on disk.