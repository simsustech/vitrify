export interface IconSet {
  name: string
  someIcon: string
}

import type { Ref } from 'vue'
import { ref } from 'vue'
import material from './material-icons'
export const iconSet = ref(material)

const iconSets = import.meta.glob<{ default: IconSet }>([
  './*.ts',
  '!./index.ts'
])

export const defineIconSet = (iconSet: IconSet) => {
  return iconSet
}

export const useIconSet = () => {
  return iconSet as Ref<IconSet>
}

let loadingIconSet = false
export const loadIconSet = async (name: string) => {
  if (!loadingIconSet) {
    loadingIconSet = true
    try {
      const data = (await iconSets[`./${name}.ts`]()).default

      if (data) {
        iconSet.value = data
      }
    } catch (e) {
      if (import.meta.env.DEBUG) console.error(e)
      throw new Error(`[quasar-components] Failed to load ${name} icon set.`)
    }
    loadingIconSet = false
  }
}
