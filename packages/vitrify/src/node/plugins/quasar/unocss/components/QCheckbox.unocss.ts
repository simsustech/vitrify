import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
body.desktop .q-checkbox:not(.disabled) .q-checkbox__inner:before {
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
body.desktop .q-checkbox:not(.disabled):focus .q-checkbox__inner:before, body.desktop .q-checkbox:not(.disabled):hover .q-checkbox__inner:before {
  transform: scale3d(1, 1, 1);
}
body.desktop .q-checkbox--dense:not(.disabled):focus .q-checkbox__inner:before, body.desktop .q-checkbox--dense:not(.disabled):hover .q-checkbox__inner:before {
  transform: scale3d(1.4, 1.4, 1);
}
`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-checkbox$/,
    ([, c], { theme }) => `v-middle
      [&.disabled]:(op-75!)`
  ],
  [/^q-checkbox__native$/, ([, c], { theme }) => `w-1px h-1px`],
  [
    /^q-checkbox__bg$/,
    ([, c], { theme }) =>
      `select-none top-1/4 w-1/2 h-1/2 border-solid border-current border-rd-2px transition-background-220 transition-all transition-duration-220`
  ],
  [/^q-checkbox__icon_container$/, ([, c], { theme }) => `select-none`],
  [/^q-checkbox__icon$/, ([, c], { theme }) => `text-current text-0.5em`],
  [/^q-checkbox__svg$/, ([, c], { theme }) => `text-white`],
  [
    /^q-checkbox__truthy$/,
    ([, c], { theme }) =>
      `stroke-currentColor stroke-3.12px stroke-29.78334 stroke-29.78334`
  ],
  [
    /^q-checkbox__indet$/,
    ([, c], { theme }) =>
      `fill-currentColor origin-[50%_50%] rotate--280 scale-0`
  ],
  [
    /^q-checkbox__inner$/,
    ([, c], { theme }) =>
      `text-40px w-1em min-w-1em h-1em outline-0 border-rd-50% text-black text-op-540`
  ],
  [
    /^q-checkbox__inner--truthy$/,
    ([, c], { theme }) => `[&_.q-checkbox\_\_bg]:(text-primary)
      [&_.q-checkbox\_\_inner--indet_.q-checkbox\_\_bg]:(text-primary)
      [&_.q-checkbox\_\_bg]:(bg-gurrent)
      [&_.q-checkbox\_\_inner--indet_.q-checkbox\_\_bg]:(bg-current)
      [&_path]:(stroke-0 transition-[stroke-dashoffset]-180)

      `
  ],
  [
    /^q-checkbox__inner--indet$/,
    ([, c], { theme }) => `
    [&_q-checkbox\_\_indet]:(scale-100 rot-0 transition-[transform]-220)`
  ],
  [
    /^q-checkbox--dark$/,
    ([, c], { theme }) => `[&._q-checkbox--iner]:(text-white text-op-70)
      [&_.q-checkbox\_\_inner--truthy]:(text-primary)
      [&_.q-checkbox--dark_.q-checkbox\_\_inner--indet]:(text-primary)`
  ],
  [
    /^q-checkbox--dense$/,
    ([, c], { theme }) => `[&_.q-checkbox__inner]:(w-0.5em min-w-0.5em h-0.5em)
      [&_.q-checkbox__label]:(pl-0.5em)
      [&.reverse .q-checkbox__label]:(pl-0 pr-0.5em)
      `
  ],
  [/^q-checkbox__inner--truthy$/, ([, c], { theme }) => ``]
]

export { preflights, shortcuts }
