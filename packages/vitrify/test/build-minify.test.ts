import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { build } from '../src/node/bin/build.js'

const outDir = new URL('file:///tmp/vitrify/step1-minify/').pathname

/**
 * D6 — `build()` hardcoded `minify: false`, which shipped ~327 KiB of
 * unminified JavaScript to every vitrify app.
 *
 * Asserted at the seam that actually matters: the bytes on disk. Unminified
 * output keeps roughly one statement per line (the fixture's largest bundle is
 * ~4400 lines); minified output collapses to a handful.
 */
test('production build emits minified JavaScript', async () => {
  await build({
    appDir: new URL('integration/app/', import.meta.url),
    outDir
  })

  const assets = await collectFiles(outDir)
  const scripts = assets.filter((file) => /\.(mjs|js)$/.test(file))

  expect(scripts.length).toBeGreaterThan(0)

  const sizes = await Promise.all(
    scripts.map(async (file) => ({
      file,
      bytes: (await stat(file)).size,
      lines: countLines(await readFile(file, 'utf8'))
    }))
  )

  const largest = sizes.sort((a, b) => b.bytes - a.bytes)[0]

  // Guard: make sure we are measuring a real bundle, not an empty file.
  expect(largest.bytes).toBeGreaterThan(10_000)
  expect(largest.lines).toBeLessThan(100)
})

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir)
  const files: string[] = []

  for (const entry of entries) {
    const full = join(dir, entry)

    if ((await stat(full)).isDirectory()) {
      files.push(...(await collectFiles(full)))
    } else {
      files.push(full)
    }
  }

  return files
}

function countLines(contents: string): number {
  return contents.split('\n').length
}
