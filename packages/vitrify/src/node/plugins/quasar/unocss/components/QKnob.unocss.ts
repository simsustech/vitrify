import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-knob$/, ([, c], { theme }) => `text-[48px]`],

  [/^q-knob--editable$/, ([, c], { theme }) => `cursor-pointer outline-0`],

  [
    /^q-knob--editable:before$/,
    ([, c], { theme }) =>
      `content-empty absolute top-0 right-0 bottom-0 left-0 rounded-[50%] [box-shadow:none] [transition:box-shadow_0.24s_ease-in-out]`
  ],

  [
    /^q-knob--editable:focus:before$/,
    ([, c], { theme }) =>
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)]`
  ]
]

export { shortcuts }
