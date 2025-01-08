import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-file$/,
    ([, c], { theme }) =>
      `[&_.q-field\\_\\_native]:(break-all overflow-hidden) [&_.q-field\\_\\_input]:(!opacity-0) [&_.q-field\\_\\_input::-webkit-file-upload-button]:(cursor-pointer)`
  ],

  [
    /^q-file__filler$/,
    ([, c], { theme }) => `invisible w-full border-none p-0`
  ],

  [
    /^q-file__dnd$/,
    ([, c], { theme }) =>
      `outline-[1px_dashed_currentColor] outline-offset-[-4px]`
  ]
]

export { shortcuts }
