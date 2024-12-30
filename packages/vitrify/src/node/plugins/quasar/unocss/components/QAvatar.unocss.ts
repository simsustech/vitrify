import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-avatar$/,
    (
      [, c],
      { theme }
    ) => `relative v-middle inline-block border-rd-inherit text-48px h-1em w-1em
    [&img:not(.q-icon):not(.q-img__image)]:(border-rd-0)`
  ],
  [
    /^q-icon-avatar__content$/,
    ([, c], { theme }) =>
      `text-0.5em lh-0.5em border-rd-inherit h-inherit w-inherit`
  ],
  [
    /^(q-icon|material-icons|material-icons-outlined|material-icons-round|material-icons-sharp|material-symbols-outlined|material-symbols-rounded|material-symbols-sharp)$/,
    ([, c], { theme }) =>
      `select-none cursor-inherit text-inherit inline-flex items-center justify-center v-middle`
  ]
]

export { shortcuts }
