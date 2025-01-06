import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-tab$/,
    ([, c], { theme }) =>
      `px-[16px] py-[0] min-h-[48px] [transition:color_0.3s,_background-color_0.3s] uppercase whitespace-nowrap [color:inherit] no-underline [&_.q-badge]:(top-[3px] -right-[12px])`
  ],

  [/^q-tab--full$/, ([, c], { theme }) => `min-h-[72px]`],

  [/^q-tab--no-caps$/, ([, c], { theme }) => `normal-case`],

  [
    /^q-tab__content$/,
    ([, c], { theme }) =>
      `[height:inherit] px-[0] py-[4px] min-w-[40px] [&_.q-chip--floating]:(top-[0] -right-[16px])`
  ],

  [
    /^q-tab__content--inline$/,
    ([, c], { theme }) => `[&_.q-tab\_\_icon_+_.q-tab\_\_label]:(pl-[8px])`
  ],

  [/^q-tab__icon$/, ([, c], { theme }) => `w-[24px] h-[24px] text-[24px]`],

  [
    /^q-tab__label$/,
    ([, c], { theme }) => `text-[14px] leading-[1.715em] font-medium`
  ],

  [
    /^q-tab__alert$/,
    ([, c], { theme }) =>
      `absolute top-[7px] -right-[9px] h-[10px] w-[10px] rounded-[50%] bg-current`
  ],

  [
    /^q-tab__alert-icon$/,
    ([, c], { theme }) => `absolute top-[2px] -right-[12px] text-[18px]`
  ],

  [/^q-tab__indicator$/, ([, c], { theme }) => `opacity-0 h-[2px] bg-current`],

  [
    /^q-tab--active$/,
    ([, c], { theme }) => `[&_.q-tab\_\_indicator]:(opacity-100 origin-left)`
  ],

  [/^q-tab--inactive$/, ([, c], { theme }) => `opacity-[0.85]`],

  [
    /^q-tabs$/,
    ([, c], { theme }) =>
      `relative [transition:color_0.3s,_background-color_0.3s]`
  ],

  [
    /^q-tabs--scrollable.q-tabs__arrows--outside.q-tabs--horizontal$/,
    ([, c], { theme }) => `pl-[36px] pr-[36px]`
  ],

  [
    /^q-tabs--scrollable.q-tabs__arrows--outside.q-tabs--vertical$/,
    ([, c], { theme }) => `pt-[36px] pb-[36px]`
  ],

  [
    /^q-tabs--scrollable.q-tabs__arrows--outside$/,
    ([, c], { theme }) =>
      `[&_.q-tabs\_\_arrow--faded]:(opacity-30 pointer-events-none)`
  ],

  [
    /^q-tabs--scrollable.q-tabs__arrows--inside$/,
    ([, c], { theme }) => `[&_.q-tabs\_\_arrow--faded]:(hidden)`
  ],

  [
    /^q-tabs--not-scrollable.q-tabs__arrows--outside$/,
    ([, c], { theme }) => `pl-0 pr-0`
  ],

  [
    /^q-tabs--not-scrollable$/,
    ([, c], { theme }) =>
      `[&_.q-tabs\_\_arrow]:(hidden) [&_.q-tabs\_\_content]:([border-radius:inherit])`
  ],

  [
    /^q-tabs__arrow$/,
    ([, c], { theme }) =>
      `cursor-pointer text-[32px] min-w-[36px] [text-shadow:0_0_3px_#fff,_0_0_1px_#fff,_0_0_1px_#000] [transition:opacity_0.3s]`
  ],

  [/^q-tabs__content$/, ([, c], { theme }) => `overflow-hidden flex-auto`],

  [/^q-tabs__content--align-center$/, ([, c], { theme }) => `justify-center`],

  [/^q-tabs__content--align-right$/, ([, c], { theme }) => `justify-end`],

  [
    /^q-tabs__content--align-justify$/,
    ([, c], { theme }) => `[&_.q-tab]:(flex-auto)`
  ],

  [/^q-tabs__offset$/, ([, c], { theme }) => `hidden`],

  [
    /^q-tabs--horizontal$/,
    ([, c], { theme }) =>
      `[&_.q-tabs\_\_arrow]:(h-full) [&_.q-tabs\_\_arrow--left]:(top-[0] left-[0] bottom-[0]) [&_.q-tabs\_\_arrow--right]:(top-[0] right-[0] bottom-[0])`
  ],

  [
    /^q-tabs--vertical$/,
    ([, c], { theme }) =>
      `!block h-full [&_.q-tabs\_\_content]:(!block h-full) [&_.q-tabs\_\_arrow]:(w-full h-[36px] text-center) [&_.q-tabs\_\_arrow--left]:(top-[0] left-[0] right-[0]) [&_.q-tabs\_\_arrow--right]:(left-[0] right-[0] bottom-[0]) [&_.q-tab]:(px-[8px] py-[0]) [&_.q-tab\_\_indicator]:(h-[unset] w-[2px])`
  ],

  [
    /^q-tabs--vertical.q-tabs--not-scrollable$/,
    ([, c], { theme }) => `[&_.q-tabs\_\_content]:(h-full)`
  ],

  [
    /^q-tabs--vertical.q-tabs--dense$/,
    ([, c], { theme }) => `[&_.q-tab\_\_content]:(min-w-[24px])`
  ],

  [
    /^q-tabs--dense$/,
    ([, c], { theme }) =>
      `[&_.q-tab]:(min-h-[36px]) [&_.q-tab--full]:(min-h-[52px])`
  ]
]

export { shortcuts }
