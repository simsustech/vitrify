import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-tab-panels$/, ([, c], { theme }) => `bg-[#fff]`],

  [/^q-tab-panel$/, ([, c], { theme }) => `p-[16px]`]
]

export { shortcuts }
