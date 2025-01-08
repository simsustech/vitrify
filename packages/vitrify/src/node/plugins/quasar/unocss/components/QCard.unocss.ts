import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-card$/,
    ([, c], { theme }) => `shadow-black border-rd-4px v-top bg-white relative
      [&>div:not(.q--avoid-card-border)]:(border-t-0 border-t-0 border-b-0 border-b-0)
      [&>img:not(.q--avoid-card-border)]:(border-t-0 border-t-0 border-b-0 border-b-0)
      [&>div:nth-child(1_of_:not(.q--avoid-card-border))]:(border-t-0 border-t-inherit border-t-inherit)
      [&>img:nth-child(1_of_:not(.q--avoid-card-border))]:(border-t-0 border-t-inherit border-t-inherit)
      [&>div:nth-last-child(1_of_:not(.q--avoid-card-border))]:(border-b-0 border-b-inherit border-b-inherit)
      [&>img:nth-last-child(1_of_:not(.q--avoid-card-border))]:(border-b-0 border-b-inherit border-b-inherit)
      [&>div:not(.q--avoid-card-border)]:(border-l-0 border-r-0 shadow-none)
      [&>img]:(block w-full max-w-full border-none)
    `
  ],
  [
    /^q-card--bordered$/,
    ([, c], { theme }) => `border-solid border-black border-op-120`
  ],
  [
    /^q-card--dark$/,
    ([, c], { theme }) => `border-white border-op-280 shadow-black`
  ],
  [/^q-card__section$/, ([, c], { theme }) => `relative`],
  [/^q-card__section--vert$/, ([, c], { theme }) => `p-16px`],
  [
    /^q-card__section--horiz$/,
    (
      [, c],
      { theme }
    ) => `[&>div:not(.q--avoid-card-border)]:(border-t-0 border-b-0 border-t-0 border-b-0)
    [&>img:not(.q--avoid-card-border)]:(border-t-0 border-b-0 border-t-0 border-b-0)
    [&>div:nth-child(1_of_:not(.q--avoid-card-border))]:(border-t-inherit border-b-inherit)
    [&>img:nth-child(1_of_:not(.q--avoid-card-border))]:(border-t-inherit border-b-inherit)
    [&>div:nth-last-child(1_of_:not(.q--avoid-card-border))]:(border-t-inherit border-b-inherit)
    [&>img:nth-last-child(1_of_:not(.q--avoid-card-border))]:(border-t-inherit border-b-inherit)
    [&>div:not(.q--avoid-card-border)]:(border-t-0 border-b-0 shadow-none)
    `
  ],
  [
    /^q--card__actions$/,
    ([, c], { theme }) => `p-8px items-center
    [&_.q-btn--rectangle]:(px-8px py-0)`
  ],
  [
    /^q--card__actions--horiz$/,
    ([, c], { theme }) => `[&>.q-btn-item+.q-btn-item]:(ml-8px)
    [&>.q-btn-group+.q-btn-item]:(ml-8px)
    [&>.q-btn-item+.q-btn-group]:(ml-8px)`
  ],
  [
    /^q--card__actions--vert$/,
    ([, c], { theme }) => `[&>.q-btn-item.q-btn--round]:(self-center)
      [&>.q-btn-item+.q-btn-item]:(mt-4px)
      [&>.q-btn-group+.q-btn-item]:(mt-4px)
      [&>.q-btn-item+.q-btn-group]:(mt-4px)
      [&>.q-btn-group>.q-btn-item]:(flex-grow)
    `
  ]
]

export { shortcuts }
