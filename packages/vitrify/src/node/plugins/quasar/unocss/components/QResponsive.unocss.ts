import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-responsive$/, ([, c], { theme }) => `relative max-w-full max-h-full`],

  [
    /^q-responsive__filler$/,
    ([, c], { theme }) =>
      `[width:inherit] [max-width:inherit] [height:inherit] [max-height:inherit]`
  ],

  [
    /^q-responsive__content$/,
    ([, c], { theme }) =>
      `[border-radius:inherit] [&_>_*]:(!w-full !h-full !max-h-full !max-w-full)`
  ]
]

export { shortcuts }