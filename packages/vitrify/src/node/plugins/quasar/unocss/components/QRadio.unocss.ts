import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.desktop .q-radio:not(.disabled) .q-radio__inner:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.12;
  transform: scale3d(0, 0, 1);
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1) 0ms;
}
body.desktop .q-radio:not(.disabled):focus .q-radio__inner:before, body.desktop .q-radio:not(.disabled):hover .q-radio__inner:before {
  transform: scale3d(1, 1, 1);
}
body.desktop .q-radio--dense:not(.disabled):focus .q-radio__inner:before, body.desktop .q-radio--dense:not(.disabled):hover .q-radio__inner:before {
  transform: scale3d(1.5, 1.5, 1);
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-radio$/, ([, c], { theme }) => `align-middle`],

  [/^q-radio__native$/, ([, c], { theme }) => `w-px h-px`],

  [
    /^q-radio__bg$/,
    ([, c], { theme }) =>
      `select-none top-1/4 left-1/4 w-1/2 h-1/2 [&_path]:(fill-current)`
  ],

  [/^q-radio__icon-container$/, ([, c], { theme }) => `select-none`],

  [/^q-radio__icon$/, ([, c], { theme }) => `text-current text-[0.5em]`],

  [
    /^q-radio__check$/,
    ([, c], { theme }) =>
      `origin-[50%_50%] [transform:scale3d(0,_0,_1)] [transition:transform_0.22s_cubic-bezier(0,_0,_0.2,_1)_0ms]`
  ],

  [
    /^q-radio__inner$/,
    ([, c], { theme }) =>
      `text-[40px] w-[1em] min-w-[1em] h-[1em] outline-0 rounded-[50%] text-[rgba(0,_0,_0,_0.54)]`
  ],

  [
    /^q-radio__inner--truthy$/,
    ([, c], { theme }) =>
      ` [&_.q-radio\\_\\_check]:([transform:scale3d(1,_1,_1)]) text-primary`
  ],

  [/^q-radio.disabled$/, ([, c], { theme }) => `!opacity-75`],

  [
    /^q-radio--dark$/,
    ([, c], { theme }) =>
      `[&_.q-radio\\_\\_inner]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-radio\\_\\_inner:before]:(!opacity-[0.32]) [&_.q-radio\\_\\_inner--truthy]:(text-primary)`
  ],

  [
    /^q-radio--dense$/,
    ([, c], { theme }) =>
      `[&_.q-radio\\_\\_inner]:(w-[0.5em] min-w-[0.5em] h-[0.5em]) [&_.q-radio\\_\\_bg]:(left-0 top-0 w-full h-full) [&_.q-radio\\_\\_label]:(pl-[0.5em])`
  ],

  [
    /^q-radio--dense.reverse$/,
    ([, c], { theme }) => `[&_.q-radio\\_\\_label]:(pl-0 pr-[0.5em])`
  ]
]

export { preflights, shortcuts }
