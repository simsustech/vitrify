import { fileURLToPath } from 'node:url'

interface PackageJson {
  name: string
  exports: Record<
    string,
    {
      types: string
      import: string
      src: string
    }
  >[]
  [key: string]: any
}

/**
 * Vite aliases require subpath exports to be defined before the global export
 */
export const parseExportAliases = (pkgJson: PackageJson) => {
  const { name, exports } = pkgJson
  if (name && exports) {
    const alias = Object.entries(exports)
      .map(([key, val]) => {
        return {
          find: name + key.slice(1),
          replacement: fileURLToPath(new URL('.' + val.src, import.meta.url))
        }
      })
      .sort(
        (a, b) =>
          (b.find.match(/\//g) || []).length -
          (a.find.match(/\//g) || []).length
      )
    return alias
  }
  throw new Error('name or exports not defined in package.json')
}
