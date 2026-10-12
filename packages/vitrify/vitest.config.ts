import { defineConfig } from 'vitest/config'

/**
 * `fileParallelism: false` — the build/dev specs all drive the real Vite build
 * against the single shared fixture at `test/integration/app/`, and `baseConfig`
 * writes then unlinks a temporary `vitrify.config.ts.js` next to that fixture.
 * Two of those builds in parallel race on that file (ENOENT on unlink), so the
 * files must run one at a time.
 */
export default defineConfig({
  test: {
    fileParallelism: false
  }
})
