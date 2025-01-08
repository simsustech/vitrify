import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-bar$/,
    ([, c], { theme }) => `bg-black op-20
    [&>.q-icon]:(ml-2px)
    [&>div]:(ml-8px)
    [&>div+.q-icon]:(ml-8px)
    [&>.q-btn]:(ml-2px)
    [&>.q-icon:first-child]:(ml-0)
    [&>.q-btn:first-child]:(ml-0)
    [&>div:first-child]:(ml-0)`
  ],
  [
    /^q-bar--standard$/,
    ([, c], { theme }) => `px-12px py-0 h-32px text-18px
    [&>div]:(text-16px)
    [&_.q-btn]:(text-11px)`
  ],
  [
    /^q-bar--dense$/,
    ([, c], { theme }) => `px-8px py-0 h-24px text-14px
    [&_.q-btn]:(text-8px)`
  ],
  [/^q-bar--dark$/, ([, c], { theme }) => `bg-white op-15`]
]

export { shortcuts }
