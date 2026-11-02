import { test, expect } from 'vitest'
import { baseConfig } from '../../src/node/index.js'

const vueInternalPkgs = [
  '@vue/runtime-dom',
  '@vue/runtime-core',
  '@vue/reactivity',
  '@vue/shared',
  '@vue/server-renderer'
]

test('baseConfig generates esm-bundler aliases for all @vue/* internal packages', async () => {
  const config = await baseConfig({
    appDir: new URL('ssr-vue-cjs-app/', import.meta.url),
    ssr: 'server',
    framework: 'vue'
  })

  const aliases = config.resolve?.alias ?? []

  for (const pkg of vueInternalPkgs) {
    const alias = aliases.find(
      (a) => (typeof a.find === 'string' ? a.find : a.find?.source) === pkg
    )
    expect(alias, `alias for ${pkg} should exist`).toBeDefined()
    expect(
      alias!.replacement,
      `alias for ${pkg} should point to esm-bundler`
    ).toMatch(/esm-bundler\.js$/)
  }
})
