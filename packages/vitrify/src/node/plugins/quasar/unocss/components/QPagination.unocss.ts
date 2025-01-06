import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-pagination$/,
    ([, c], { theme }) =>
      `[&_input]:(text-center) [&_input::-webkit-outer-spin-button]:(m-0) [&_input::-webkit-inner-spin-button]:(m-0)`
  ],

  [
    /^q-pagination__content$/,
    ([, c], { theme }) =>
      `mt-[var(--q-pagination-gutter-parent)] ml-[var(--q-pagination-gutter-parent)] [&_>_.q-btn]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)]) [&_>_.q-input]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)])`
  ],

  [
    /^q-pagination__middle$/,
    ([, c], { theme }) =>
      `[&_>_.q-btn]:(mt-[var(--q-pagination-gutter-child)] ml-[var(--q-pagination-gutter-child)])`
  ]
]

export { shortcuts }
