import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-splitter__panel$/,
    ([, c], { theme }) => `relative z-0 [&_>_.q-splitter]:(w-full h-full)`
  ],

  [
    /^q-splitter__separator$/,
    ([, c], { theme }) => `bg-[rgba(0,_0,_0,_0.12)] select-none relative`
  ],

  [
    /^q-splitter__separator-area$/,
    ([, c], { theme }) =>
      `[&_>_*]:(absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2)`
  ],

  [
    /^q-splitter--dark$/,
    ([, c], { theme }) =>
      `[&_.q-splitter\_\_separator]:(bg-[rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-splitter--vertical$/,
    ([, c], { theme }) =>
      `[&_>_.q-splitter\_\_panel]:(h-full) [&_>_.q-splitter\_\_separator]:(w-px) [&_>_.q-splitter\_\_separator_>_div]:(-left-[6px] -right-[6px])`
  ],

  [/^q-splitter--vertical.q-splitter--active$/, ([, c], { theme }) => ``],

  [
    /^q-splitter--vertical.q-splitter--workable$/,
    ([, c], { theme }) => `[&_>_.q-splitter\_\_separator]:()`
  ],

  [
    /^q-splitter--horizontal$/,
    ([, c], { theme }) =>
      `[&_>_.q-splitter\_\_panel]:(w-full) [&_>_.q-splitter\_\_separator]:(h-px) [&_>_.q-splitter\_\_separator_>_div]:(-top-[6px] -bottom-[6px])`
  ],

  [/^q-splitter--horizontal.q-splitter--active$/, ([, c], { theme }) => ``],

  [
    /^q-splitter--horizontal.q-splitter--workable$/,
    ([, c], { theme }) => `[&_>_.q-splitter\_\_separator]:()`
  ],

  [/^q-splitter__before$/, ([, c], { theme }) => `overflow-auto`],

  [/^q-splitter__after$/, ([, c], { theme }) => `overflow-auto`]
]

export { shortcuts }
