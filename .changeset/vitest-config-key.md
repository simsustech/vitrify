---
"vitrify": minor
---

feat: add `test` key to `VitrifyConfig` for Vitest configuration

Users can now pass Vitest options directly in their `vitrify.config.ts`.
The `test` key is merged over vitrify's defaults (`root`, `dir`, `globals`, `environment`).

```ts
import { defineConfig } from 'vitrify'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
  },
})
```
