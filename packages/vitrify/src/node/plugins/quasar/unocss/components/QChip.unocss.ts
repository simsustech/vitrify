import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `

    body.desktop .q-chip--clickable:focus {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    }
    body.desktop.body--dark .q-chip--clickable:focus {
      box-shadow: 0 1px 3px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.14), 0 2px 1px -1px rgba(255, 255, 255, 0.12);
    }
`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-chip$/,
    (
      [, c],
      { theme }
    ) => `v-middle border-rd-16px outline-0 relative h-2em max-w-full m-4px bg-gray-1 text-black text-op-87 text-14px px-0.9em py-0.5em
      [&_.q-avatar]:(text-2em ml--0.45em mr-0.2em border-rd-16px)
    `
  ],
  [
    /^q-chip--colored$/,
    ([, c], { theme }) => `
      [&_.q-chip__icon]:(text-inherit)
      [&_.q-chip--dark_.q-chip\_\_icon]:(text-inherit)
    `
  ],
  [
    /^q-chip--outline$/,
    ([, c], { theme }) => `
      bg-transparent! border-solid border-width-1px border-current
      [&_.q-chip--dark_.q-chip\_\_icon]:(text-inherit)
    `
  ],
  [
    /^q-chip--selected$/,
    ([, c], { theme }) => `
      hidden
    `
  ],
  [
    /^q-chip__icon$/,
    ([, c], { theme }) => `
      text-black text-op-540 text-1.5em margin--0.2em
    `
  ],
  [
    /^q-chip__icon--left$/,
    ([, c], { theme }) => `
     mr-0.2em
    `
  ],
  [
    /^q-chip__icon--right$/,
    ([, c], { theme }) => `
     ml-0.2em
    `
  ],
  [
    /^q-chip__icon--remove$/,
    ([, c], { theme }) => `
     ml-0.1em mr--0.5em op-60 outline-0
     [&:hover, .q-chip__icon--remove:focus]:(op-100)
    `
  ],
  [
    /^q-chip__icon--content$/,
    ([, c], { theme }) => `
      whitespace-nowrap
    `
  ],
  [
    /^q-chip__icon--dense$/,
    ([, c], { theme }) => `
      border-rd-12px px-0.4em py-0 h-1.5em 
      [&_.q-avatar]:(text-1.5em ml--0.27em mr-0.1em border-rd-12px)
      [&._q-chip\_\_icon]:(text-1.25em)
      [&._q-chip\_\_icon--left]:(mr-0.195em)
      [&._q-chip\_\_icon--remove]:(mr--0.25em)
    `
  ],
  [
    /^q-chip__icon--square$/,
    ([, c], { theme }) => `
      border-rd-4px
      [&_q-avatar]:(border-rd-tl-3px border-rd-br-3px border-rd-tr-0 border-rd-bl-0)
    `
  ]
]

export { preflights, shortcuts }
