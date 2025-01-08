import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-drawer$/, ([, c], { theme }) => `absolute top-0 bottom-0 bg-[#fff]`],

  [/^q-drawer--on-top$/, ([, c], { theme }) => `z-3000`],

  [
    /^q-drawer--left$/,
    ([, c], { theme }) =>
      `left-0 -translate-x-full [&_.q-layout\\_\\_shadow]:(left-[10px] -right-[10px]) [&_.q-layout\\_\\_shadow:after]:(right-[10px])`
  ],

  [
    /^q-drawer--left.q-drawer--bordered$/,
    ([, c], { theme }) => `[border-right:1px_solid_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-drawer--right$/,
    ([, c], { theme }) =>
      `right-0 translate-x-full [&_.q-layout\\_\\_shadow]:(-left-[10px]) [&_.q-layout\\_\\_shadow:after]:(left-[10px])`
  ],

  [
    /^q-drawer--right.q-drawer--bordered$/,
    ([, c], { theme }) => `[border-left:1px_solid_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-drawer-container:not(.q-drawer--mini-animate)$/,
    ([, c], { theme }) =>
      `[&_.q-drawer--mini]:(!p-0) [&_.q-drawer--mini_.q-item]:(text-center justify-center pl-0 pr-0 min-w-[0]) [&_.q-drawer--mini_.q-item\\_\\_label]:(hidden)`
  ],

  [
    /^q-drawer-container:not(.q-drawer--mini-animate)$/,
    ([, c], { theme }) => `[&__.q-drawer--mini
  __.q-item\\_\\_section]:(text-center justify-center pl-0 pr-0 min-w-[0]) [&__.q-drawer--mini
  __.q-item\\_\\_section--main]:(hidden) [&__.q-drawer--mini
  __.q-item\\_\\_section--side__~_.q-item\\_\\_section--side]:(hidden)`
  ],

  [
    /^q-drawer--mini$/,
    ([, c], { theme }) =>
      `[&_.q-mini-drawer-hide]:(hidden) [&_.q-expansion-item\\_\\_content]:(hidden)`
  ],

  [
    /^q-drawer--mini-animate$/,
    ([, c], { theme }) =>
      `[&_.q-drawer\\_\\_content]:(!overflow-x-hidden whitespace-nowrap)`
  ],

  [
    /^q-drawer--standard$/,
    ([, c], { theme }) => `[&_.q-mini-drawer-only]:(hidden)`
  ],

  [
    /^q-drawer--mobile$/,
    ([, c], { theme }) =>
      `[&_.q-mini-drawer-only]:(hidden) [&_.q-mini-drawer-hide]:(hidden)`
  ],

  [/^q-drawer__backdrop$/, ([, c], { theme }) => `z-2999!`],

  [
    /^q-drawer__opener$/,
    ([, c], { theme }) => `h-full w-[15px] select-none z-2001`
  ]
]

export { shortcuts }
