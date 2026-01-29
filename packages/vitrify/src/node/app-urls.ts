// import { resolve } from 'import-meta-resolve'
import { existsSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'

export const resolve = (packageName: string, base: URL, counter = 0): URL => {
  const packageUrl = new URL(`./node_modules/${packageName}/`, base)
  if (existsSync(fileURLToPath(packageUrl))) {
    return new URL('./', packageUrl)
  }
  if (counter < 10)
    return resolve(packageName, new URL('../', base), counter + 1)
  throw new Error(`Package ${packageName} not found in ${fileURLToPath(base)}.`)
}

export const getPkgJsonDir = (dir: URL): URL => {
  const pkgJsonPath = new URL('package.json', dir)
  if (existsSync(fileURLToPath(pkgJsonPath))) {
    return new URL('./', pkgJsonPath)
  }
  return getPkgJsonDir(new URL('..', dir))
}
export const getAppDir = (dir?: URL) =>
  getPkgJsonDir(dir ?? pathToFileURL(`${process.cwd()}/`))
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
