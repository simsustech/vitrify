import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-message$/,
    ([, c], { theme }) => `mb-8px
    [&:first-child_.q-message-label]:(mt-0)`
  ],
  [/^q-message-avatar--received$/, ([, c], { theme }) => `mr-8px`],
  [
    /^q-message-text--received$/,
    ([, c], { theme }) => `text-green border-rd-4px
    [&:last-child:before]:(right-full border-r-0 solid transparent border-l-8px solid transparent border-b-8px solid currentColor)`
  ],
  [/^q-message-text-content--received$/, ([, c], { theme }) => `text-white`],
  [/^q-message-name--sent$/, ([, c], { theme }) => `text-right`],
  [/^q-message-avatar--sent$/, ([, c], { theme }) => `ml-8px`],
  [/^q-message-container--sent$/, ([, c], { theme }) => `flex-row-reverse`],
  [/^q-message-text--sent$/, ([, c], { theme }) => `text-gray-2 border-rd-4px`],
  [/^q-message-text-content--sent$/, ([, c], { theme }) => `text-white`],
  [
    /^q-message-text$/,
    ([, c], { theme }) => `bg-current p-8px lh-1.2 break-words relative
    [&+.q-message-text]:(mt-3px)
    [&:last-child]:(min-h-48px)
    [&:last-child_.q-message-stamp]:(block)
    [&:last-child:before]:(absolute bottom-0 w-0 h-0)
    `
  ]
]

export { shortcuts }
