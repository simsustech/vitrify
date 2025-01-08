import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-tooltip--style$/,
    ([, c], { theme }) =>
      `text-[10px] text-[#fafafa] bg-[#757575] rounded-[4px] normal-case font-normal`
  ],

  [
    /^q-tooltip$/,
    ([, c], { theme }) =>
      `z-9000 !fixed overflow-y-auto overflow-x-hidden px-[10px] py-[6px] max-w-[95vw] max-h-[65vh] sm:(text-14px pt-8px pb-8px pl-16px pr-16px)`
  ]
]

export { shortcuts }
