import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-avatar$/,
    (
      [, c],
      { theme }
    ) => `relative v-middle inline-block border-rd-inherit text-48px h-1em w-1em
    [&img:not(.q-icon):not(.q-img\_\_image)]:(border-rd-0)`
  ],
  [
    /^q-icon-avatar__content$/,
    ([, c], { theme }) =>
      `text-0.5em lh-0.5em border-rd-inherit h-inherit w-inherit`
  ],
  [/^q-avatar--square$/, ([, c], { theme }) => `border-rd-0`]
]

export { shortcuts }
