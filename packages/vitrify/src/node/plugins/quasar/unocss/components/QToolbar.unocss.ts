import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-toolbar$/,
    ([, c], { theme }) =>
      `relative px-[12px] py-[0] min-h-[50px] w-full [&_.q-avatar]:(text-[38px])`
  ],

  [/^q-toolbar--inset$/, ([, c], { theme }) => `pl-[58px]`],

  [
    /^q-toolbar__title$/,
    ([, c], { theme }) =>
      `flex-1 min-w-[1px] max-w-full text-[21px] font-normal tracking-[0.01em] px-[12px] py-[0]`
  ],

  [/^q-toolbar__title:first-child$/, ([, c], { theme }) => `pl-0`],

  [/^q-toolbar__title:last-child$/, ([, c], { theme }) => `pr-0`]
]

export { shortcuts }
