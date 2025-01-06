import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-expansion-item$/,
    (
      [, c],
      { theme }
    ) => `[&.q-expansion-item:first-child>div>.q-expansion-item\_\_border--top]:(op-0)
    [&.q-expansion-item:last-child>div>.q-expansion-item\_\_border--bottom]:(op-0)
    `
  ],
  [/^q-expansion-item__border$/, ([, c], { theme }) => `op-0`],
  [
    /^q-expansion-item__toggle-icon$/,
    ([, c], { theme }) => `relative transition-transform`
  ],
  [
    /^q-expansion-item__toggle-icon--rotated$/,
    ([, c], { theme }) => `rotate-180`
  ],
  [
    /^q-expansion-item__toggle-focus$/,
    ([, c], { theme }) => `w-1em! h-1em! relative!
      [&+.q-expansion-item\_\_toggle-icon]:(mt--1em)
    `
  ],
  [
    /^q-expansion-item--standard$/,
    (
      [, c],
      { theme }
    ) => `[&.q-expansion-item--expanded>div>.q-expansion-item\_\_border]:(op-100)
    `
  ],
  [
    /^q-expansion-item--popup$/,
    ([, c], { theme }) => `transition-padding-500
    [&>.q-expansion-item\_\_container]:(border-solid border-1px border-black border-op-12)
    [&>.q-expansion-item\_\_container>.q-separator]:(hidden)
    [&.q-expansion-item--collapsed]:(px-15px py-0)
    [&.q-expansion-item--expanded]:(px-0 py-15px)
    [&.q-expansion-item--expanded+.q-expansion-item--popup.q-expansion-item--expanded]:(pt-0)
    [&.q-expansion-item--collapsed:not(:first-child)>.q-expansion-item\_\_container]:(border-t-0)
    [&.q-expansion-item--expanded+.q-expansion-item--popup.q-expansion-item--collapsed>.q-expansion-item\_\_container]:(border-t-1px)
    `
  ],
  [
    /^q-expansion-item__content$/,
    ([, c], { theme }) => `[&>.q-card]:(shadow-none border-rd-0)
    `
  ],
  [
    /^q-expansion-item--expanded$/,
    (
      [, c],
      { theme }
    ) => `[&+.q-expansion-item--expanded>div>.q-expansion-item\_\_border--top]:(op-0)
      [&_.q-textarea--autogrow_textarea]:()
    `
  ]
]

export { shortcuts }
