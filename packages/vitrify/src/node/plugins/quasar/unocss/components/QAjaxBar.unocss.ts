import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-loading-bar$/,
    ([, c], { theme }) => `fixed z-9998 transition-transform bg-red`
  ],
  [/^q-loading-bar--top$/, ([, c], { theme }) => `left-0 right-0 top-0 w-full`],
  [
    /^q-loading-bar--bottom$/,
    ([, c], { theme }) => `left-0 right-0 bottom-0 w-full`
  ],
  [
    /^q-loading-bar--right$/,
    ([, c], { theme }) => `top-0 bottom-0 right-0 h-full`
  ],
  [
    /^q-loading-bar--left$/,
    ([, c], { theme }) => `top-0 bottom-0 left-0 h-full`
  ]
]

export { shortcuts }
