import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-pull-to-refresh$/, ([, c], { theme }) => `relative`],

  [
    /^q-pull-to-refresh__puller$/,
    ([, c], { theme }) =>
      `rounded-[50%] w-[40px] h-[40px] bg-[#fff] [box-shadow:0_0_4px_0_rgba(0,_0,_0,_0.3)]`
  ],

  [
    /^q-pull-to-refresh__puller--animating$/,
    ([, c], { theme }) => `[transition:transform_0.3s,_opacity_0.3s]`
  ]
]

export { shortcuts }
