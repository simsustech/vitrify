import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.desktop .q-toggle:not(.disabled) .q-toggle__thumb:before {
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
  transition: transform 0.22s cubic-bezier(0, 0, 0.2, 1);
}
body.desktop .q-toggle:not(.disabled):focus .q-toggle__thumb:before, body.desktop .q-toggle:not(.disabled):hover .q-toggle__thumb:before {
  transform: scale3d(2, 2, 1);
}
body.desktop .q-toggle--dense:not(.disabled):focus .q-toggle__thumb:before, body.desktop .q-toggle--dense:not(.disabled):hover .q-toggle__thumb:before {
  transform: scale3d(1.5, 1.5, 1);
}
`
  }
]
const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-toggle$/, ([, c], { theme }) => `align-middle`],

  [/^q-toggle__native$/, ([, c], { theme }) => `w-px h-px`],

  [
    /^q-toggle__track$/,
    ([, c], { theme }) =>
      `h-[0.35em] rounded-[0.175em] opacity-[0.38] bg-current`
  ],

  [
    /^q-toggle__thumb$/,
    ([, c], { theme }) =>
      `top-[0.25em] left-[0.25em] w-[0.5em] h-[0.5em] [transition:left_0.22s_cubic-bezier(0.4,_0,_0.2,_1)] select-none z-0 [&_.q-icon]:(text-[0.3em] min-w-[1em] text-[#000] opacity-[0.54] z-1)`
  ],

  [
    /^q-toggle__thumb:after$/,
    ([, c], { theme }) =>
      `content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] rounded-[50%] bg-[#fff] [box-shadow:0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-toggle__inner$/,
    ([, c], { theme }) =>
      `text-[40px] w-[1.4em] min-w-[1.4em] h-[1em] px-[0.3em] py-[0.325em]`
  ],

  [
    /^q-toggle__inner--indet$/,
    ([, c], { theme }) => `[&_.q-toggle\_\_thumb]:(left-[0.45em])`
  ],

  [
    /^q-toggle__inner--truthy$/,
    ([, c], { theme }) =>
      ` [&_.q-toggle\_\_track]:(opacity-[0.54]) [&_.q-toggle\_\_thumb]:(left-[0.65em]) [&_.q-toggle\_\_thumb:after]:(bg-current) [&_.q-toggle\_\_thumb_.q-icon]:(text-[#fff] opacity-100)`
  ],

  [/^q-toggle.disabled$/, ([, c], { theme }) => `!opacity-75`],

  [
    /^q-toggle--dark$/,
    ([, c], { theme }) =>
      `[&_.q-toggle\_\_inner]:(text-[#fff]) [&_.q-toggle\_\_inner--truthy]:() [&_.q-toggle\_\_thumb:after]:([box-shadow:none]) [&_.q-toggle\_\_thumb:before]:(!opacity-[0.32])`
  ],

  [
    /^q-toggle--dense$/,
    ([, c], { theme }) =>
      `[&_.q-toggle\_\_inner]:(w-[0.8em] min-w-[0.8em] h-[0.5em] px-[0] py-[0.07625em]) [&_.q-toggle\_\_thumb]:(top-[0] left-[0]) [&_.q-toggle\_\_inner--indet_.q-toggle\_\_thumb]:(left-[0.15em]) [&_.q-toggle\_\_inner--truthy_.q-toggle\_\_thumb]:(left-[0.3em]) [&_.q-toggle\_\_label]:(pl-[0.5em])`
  ],

  [
    /^q-toggle--dense.reverse$/,
    ([, c], { theme }) => `[&_.q-toggle\_\_label]:(pl-0 pr-[0.5em])`
  ]
]

export { preflights, shortcuts }
