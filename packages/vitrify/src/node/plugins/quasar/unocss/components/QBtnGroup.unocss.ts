import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-btn-group$/,
    ([, c], { theme }) => `border-rd-3px shadow-sm v-middle
    [&>.q-btn-item]:(border-rd-inherit self-stretch)
    [&>.q-btn-item:before]:(shadow-none)
    [&>.q-btn-item_.q-badge--floating]:(right-0)
    [&>.q-btn-group]:(shadow-none)
    [&>.q-btn-group:first-child>.q-btn:first-child]:(border-t-inherit border-b-inherit)
    [&>.q-btn-group:last-child>.q-btn:last-child]:(border-t-inherit border-b-inherit)
    [&>.q-btn-group:not(:first-child)>.q-btn:first-child:before]:(border-l-0)
    [&>.q-btn-group:not(:last-child)>.q-btn:last-child:before]:(border-r-0)
    [&>.q-btn-item:not(:last-child)]:(border-t-0 border-b-0)
    [&>.q-btn-item:not(:first-child)]:(border-t-0 border-b-0)
    [&>.q-btn-item.q-btn--standard:before]:(-z-1)
    `
  ],
  [
    /^q-btn-group--push$/,
    ([, c], { theme }) => `border-rd-7px
    [&>.q-btn--push.q-btn--actionable]:(transform-none)
    [&>.q-btn--push.q-btn--actionable_.q-btn\_\_content]:(transition-margin-top-300 transition-margin-bottom-300)
    [&>.q-btn--push.q-btn--actionable:active_.q-btn\_\_content,.q-btn-group--push>.q-btn--push.q-btn--actionable.q-btn--active.q-btn\_\_content]:(mt-2px mb--2px)
    `
  ],
  [/^q-btn-group--rounded$/, ([, c], { theme }) => `border-rd-28px`],
  [/^q-btn-group--square$/, ([, c], { theme }) => `border-rd-0`],
  [/^q-btn-group--flat$/, ([, c], { theme }) => `shadow-none`],
  [
    /^q-btn-group--outline$/,
    ([, c], { theme }) => `shadow-none
    [&>.q-separator]:(hidden)
    [&>.q-btn-item+.q-btn-item:before]:(border-l-0)
    [&>.q-btn-item:not(:last-child):before]:(border-r-0)
    `
  ],
  [/^q-btn-group--unelevated$/, ([, c], { theme }) => `shadow-none`],
  [/^q-btn-group--stretch$/, ([, c], { theme }) => `self-stretch border-rd-0`],
  [
    /^q-btn-group--glossy$/,
    ([, c], { theme }) => `[&>.q-btn-item]:(bg-gradient-linear)`
  ],
  [
    /^q-btn-group--spread$/,
    ([, c], { theme }) => `flex!
    [&>.q-btn-item]:(flex-1)
    [&>.q-btn-group>.q-btn-item:not(.q-btn-dropdown\_\_arrow-container)]:(w-auto min-w-0 max-w-full flex-grow-10000 flex-shrink-1 flex-basis-0)`
  ]
]

export { shortcuts }
