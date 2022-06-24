// import { resolve } from 'import-meta-resolve'
import { existsSync } from 'fs'

export const resolve = (packageName: string, base: URL) => {
  const packageUrl = new URL(`./node_modules/${packageName}/`, base)
  if (existsSync(packageUrl.pathname)) {
    return new URL('./', packageUrl)
  }
  throw new Error(`Package ${packageName} not found in ${base.pathname}.`)
}

export const getPkgJsonDir = (dir: URL): URL => {
  const pkgJsonPath = new URL('package.json', dir)
  if (existsSync(pkgJsonPath.pathname)) {
    return new URL('./', pkgJsonPath)
  }
  return getPkgJsonDir(new URL('..', dir))
}
export const getAppDir = () =>
  getPkgJsonDir(new URL(`file://${process.cwd()}/`))
export const getCliDir = () => getPkgJsonDir(new URL('./', import.meta.url))
export const getCliViteDir = (cliDir: URL) => new URL('src/vite/', cliDir)
export const getSrcDir = (appDir: URL) => new URL('src/', appDir)
export const getCwd = () => new URL(`file://${process.cwd()}/`)

export const parsePath = (path: string, basePath: URL) => {
  if (path) {
    if (!path.includes('.') && path.slice(-1) !== '/') path += '/'
    if (path.startsWith('.')) {
      return new URL(path, basePath)
    } else if (path) {
      return new URL(`file://${path}`)
    }
  }
  return
}

export const getProjectURLs = (appDir: URL, cliDir: URL) => {
  const srcDir = getSrcDir(appDir)
  return {
    src: (path: string) => new URL(path, srcDir),
    app: (path: string) => new URL(path, appDir),
    cli: (path: string) => new URL(path, cliDir)
  }
}
