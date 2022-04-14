// import { resolve } from 'import-meta-resolve'
import { existsSync } from 'fs'

export const getPkgJsonDir = (dir: URL): URL => {
  const pkgJsonPath = new URL('package.json', dir)
  if (existsSync(pkgJsonPath.pathname)) {
    return new URL('./', pkgJsonPath)
  }
  return getPkgJsonDir(new URL('..', dir))
}
export const appDir = getPkgJsonDir(new URL(`file://${process.cwd()}/`))
export const cliDir = getPkgJsonDir(new URL('./', import.meta.url))
export const cliViteDir = new URL('src/vite/', cliDir)
export const srcDir = new URL('src/', appDir)
// export const quasarDir = getPkgJsonDir(new URL('./', await resolve('quasar', appDir.href)))

export const parsePath = (path: string) => {
  if (path) {
    if (path.slice(-1) !== '/') path += '/'
    if (path.startsWith('.')) {
      return new URL(path, appDir)
    } else if (path) {
      return new URL(`file://${path}`)
    }
  }
  return
}

export const projectURLs = {
  src: (path: string) => new URL(path, srcDir),
  app: (path: string) => new URL(path, appDir),
  cli: (path: string) => new URL(path, cliDir)
}
