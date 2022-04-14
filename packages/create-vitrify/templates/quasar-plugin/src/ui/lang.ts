export interface Language {
  myQuasarPlugin: {
    changeMe: string
  }
}

import { ref, Ref } from 'vue'
import en from './lang/en-us'
export const lang = ref(en)
// @ts-ignore
const locales = import.meta.glob('./lang/*.ts')

export const defineLang = (lang: Language) => {
  return lang
}

export const useLang = () => {
  return lang as Ref<Language>
}

export const loadLang = async (locale: string) => {
  try {
    const data = (await locales[`./lang/${locale}.ts`]()).default

    if (data) {
      lang.value = data
    }
  } catch (e) {
    console.log(e)
    throw new Error(`Failed to load ${locale} locale.`)
  }
}
