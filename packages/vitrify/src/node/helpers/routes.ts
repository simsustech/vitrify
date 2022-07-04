// https://github.com/antfu/vite-ssg/blob/462722203dade87365a519d847fcd881ee16a7f4/src/node/utils.ts#L13
import type { RouteRecord } from 'vue-router'

export const routesToPaths = (routes?: RouteRecord[]) => {
  if (!routes) return ['/']

  const paths: Set<string> = new Set()

  const getPaths = (routes: RouteRecord[], prefix = '') => {
    // remove trailing slash
    prefix = prefix.replace(/\/$/g, '')
    for (const route of routes) {
      let path = route.path
      // check for leading slash
      if (route.path) {
        path =
          prefix && !route.path.startsWith('/')
            ? `${prefix}/${route.path}`
            : route.path

        paths.add(path)
      }
      if (Array.isArray(route.children)) getPaths(route.children, path)
    }
  }

  getPaths(routes)
  return [...paths]
}
