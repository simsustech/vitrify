import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-footer--hidden$/, ([, c], { theme }) => `translate-y-[110%]`],

  [
    /^q-footer--bordered$/,
    ([, c], { theme }) => `[border-top:1px_solid_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-footer$/,
    ([, c], { theme }) =>
      `[&_.q-layout\_\_shadow]:(-top-[10px]) [&_.q-layout\_\_shadow:after]:(top-[10px])  relative z-2000`
  ]
]

export { shortcuts }
