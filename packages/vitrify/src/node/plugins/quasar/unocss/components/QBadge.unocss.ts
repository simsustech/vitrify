import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-badge$/,
    ([, c], { theme }) =>
      `bg-primary text-white px-6px py-2px border-rd-4px text-12px lh-1 min-h-12px font-normal v-baseline`
  ],
  [/^q-badge--single-line$/, ([, c], { theme }) => `whitespace-nowrap`],
  [/^q-badge--multi-line$/, ([, c], { theme }) => `break-all break-word`],

  [
    /^q-badge--floating $/,
    ([, c], { theme }) => `absolute top--4px right--3px cursor-inherit`
  ],
  [/^q-badge--transparent $/, ([, c], { theme }) => `op-80`],
  [
    /^q-badge--outline$/,
    ([, c], { theme }) =>
      `bg-transparent border-current border-1px border-solid`
  ],
  [/^q-badge--rounded$/, ([, c], { theme }) => `border-rd-1em`]
]

export { shortcuts }
