import type { Plugin } from 'vite'
import { promises } from 'fs'
const { readFile } = promises

export default async function ({
  buildFromSrc
}: {
  buildFromSrc?: boolean
} = {}): Promise<Plugin> {
  const pkgJson = JSON.parse(
    await readFile(
      new URL('../package.json', import.meta.url).pathname,
      'utf-8'
    )
  )
  const exports = pkgJson.exports as Record<
    string,
    {
      types: string
      import: string
      src: string
    }
  >[]
  const name = pkgJson.name

  return {
    name: `${name}-plugin`,
    config(config, { mode }) {
      if (mode === 'development' || buildFromSrc) {
        const alias = Object.entries(exports)
          .map(([key, val]) => {
            return {
              find: name + key.slice(1),
              replacement: new URL('.' + val.src, import.meta.url).pathname
            }
          })
          .sort(
            (a, b) =>
              (b.find.match(/\//g) || []).length -
              (a.find.match(/\//g) || []).length
          )

        return {
          resolve: {
            alias
          }
        }
      }

      return {}
    }
  }
}
