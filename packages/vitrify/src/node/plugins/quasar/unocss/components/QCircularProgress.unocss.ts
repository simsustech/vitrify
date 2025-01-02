import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme> = [
  {
    getCSS: ({ theme }) => `

    @keyframes q-circular-progress-circle {
      0% {
        stroke-dasharray: 1, 400;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 400, 400;
        stroke-dashoffset: -100;
      }
      100% {
        stroke-dasharray: 400, 400;
        stroke-dashoffset: -300;
      }
    }`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-circular-progress$/,
    ([, c], { theme }) => `inline-block relative v-middle w-1em h-1em lh-1
    [&.q-focusable]:(border-rd-50%)`
  ],
  [/^q-circular-progress__svg$/, ([, c], { theme }) => `w-full h-full`],
  [/^q-circular-progress__text$/, ([, c], { theme }) => `text-0.25em`],
  [
    /^q-circular-progress--indeterminate$/,
    (
      [, c],
      { theme }
    ) => `[&_.q-circular-progress__svg]:(origin-50%-50% animate-q-spin)
      [&_.q-circular-progress__circle]:(stroke-1 400 stroke-0 animate-q-circular-progress-circle)
    `
  ]
]

export { preflights, shortcuts }
