// collect-css-ssr.ts
import type { ViteDevServer, ModuleNode, UpdatePayload } from 'vite'

/**
 * Collect SSR CSS for Vite
 */
export const componentsModules = (
  components: string[],
  vite: ViteDevServer
) => {
  const matchedModules = new Set<ModuleNode>()
  components.forEach((component) => {
    const modules = vite.moduleGraph.getModulesByFile(component)
    modules?.forEach((mod) => matchedModules.add(mod))
  })
  return matchedModules
}

export const collectCss = ({
  mods,
  styles = new Map<string, string>(),
  checkedComponents = new Set()
}: {
  mods: Set<ModuleNode>
  styles?: Map<string, string>
  checkedComponents?: Set<unknown>
}) => {
  for (const mod of mods) {
    if (
      (mod.file?.endsWith('.scss') ||
        mod.file?.endsWith('.css') ||
        mod.id?.includes('vue&type=style')) &&
      mod.ssrModule
    ) {
      styles.set(mod.url, mod.ssrModule.default)
    }
    if (mod.importedModules.size > 0 && !checkedComponents.has(mod.id)) {
      checkedComponents.add(mod.id)
      collectCss({
        mods: mod.importedModules,
        styles,
        checkedComponents
      })
    }
  }
  let result = ''
  styles.forEach((content, id) => {
    const styleTag = `<style type="text/css" vite-module-id="${hashCode(
      id
    )}">${content}</style>`
    result = result.concat(styleTag)
  })
  return result
}

/**
 * Client listener to detect updated modules through HMR, and remove the initial styled attached to the head
 */
export const removeCssHotReloaded = () => {
  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', (module: UpdatePayload) => {
      module.updates.forEach((update) => {
        const moduleStyle = document.querySelector(
          `[vite-module-id="${hashCode(update.acceptedPath)}"]`
        )
        if (moduleStyle) {
          moduleStyle.remove()
        }
      })
    })
  }
}

const hashCode = (moduleId: string) => {
  let hash = 0,
    i,
    chr
  if (moduleId.length === 0) return hash
  for (i = 0; i < moduleId.length; i++) {
    chr = moduleId.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
