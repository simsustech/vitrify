import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^z-fab$/, ([, c], { theme }) => ``],

  [
    /^q-fab$/,
    ([, c], { theme }) => `relative align-middle [&_>_.q-btn]:(w-full)`
  ],

  [/^q-fab--form-rounded$/, ([, c], { theme }) => `rounded-[28px]`],

  [/^q-fab--form-square$/, ([, c], { theme }) => `rounded-[4px]`],

  [
    /^q-fab__icon$/,
    ([, c], { theme }) =>
      `[transition:opacity_0.4s,_transform_0.4s] opacity-100 rotate-0`
  ],

  [
    /^q-fab__active-icon$/,
    ([, c], { theme }) =>
      `[transition:opacity_0.4s,_transform_0.4s] opacity-0 -rotate-180`
  ],

  [
    /^q-fab__label--external$/,
    ([, c], { theme }) =>
      `absolute px-[8px] py-[0] [transition:opacity_0.18s_cubic-bezier(0.65,_0.815,_0.735,_0.395)]`
  ],

  [
    /^q-fab__label--external-hidden$/,
    ([, c], { theme }) => `opacity-0 pointer-events-none`
  ],

  [
    /^q-fab__label--external-left$/,
    ([, c], { theme }) =>
      `top-2/4 -left-[12px] -translate-x-full -translate-y-1/2`
  ],

  [
    /^q-fab__label--external-right$/,
    ([, c], { theme }) =>
      `top-2/4 -right-[12px] translate-x-full -translate-y-1/2`
  ],

  [
    /^q-fab__label--external-bottom$/,
    ([, c], { theme }) =>
      `-bottom-[12px] left-2/4 -translate-x-1/2 translate-y-full`
  ],

  [
    /^q-fab__label--external-top$/,
    ([, c], { theme }) =>
      `-top-[12px] left-2/4 -translate-x-1/2 -translate-y-full`
  ],

  [
    /^q-fab__label--internal$/,
    ([, c], { theme }) =>
      `p-0 [transition:font-size_0.12s_cubic-bezier(0.65,_0.815,_0.735,_0.395),_max-height_0.12s_cubic-bezier(0.65,_0.815,_0.735,_0.395),_opacity_0.07s_cubic-bezier(0.65,_0.815,_0.735,_0.395)] max-h-[30px]`
  ],

  [
    /^q-fab__label--internal-hidden$/,
    ([, c], { theme }) => `text-[0] opacity-0`
  ],

  [/^q-fab__label--internal-top$/, ([, c], { theme }) => `pb-[0.12em]`],

  [/^q-fab__label--internal-bottom$/, ([, c], { theme }) => `pt-[0.12em]`],

  [
    /^q-fab__label--internal-left$/,
    ([, c], { theme }) => `pl-[0.285em] pr-[0.571em]`
  ],

  [
    /^q-fab__label--internal-right$/,
    ([, c], { theme }) => `pr-[0.285em] pl-[0.571em]`
  ],

  [
    /^q-fab__icon-holder$/,
    ([, c], { theme }) => `min-w-[24px] min-h-[24px] relative`
  ],

  [
    /^q-fab__icon-holder--opened$/,
    ([, c], { theme }) =>
      `[&_.q-fab\\_\\_icon]:(rotate-180 opacity-0) [&_.q-fab\\_\\_active-icon]:(rotate-0 opacity-100)`
  ],

  [
    /^q-fab__actions$/,
    ([, c], { theme }) =>
      `absolute opacity-0 [transition:transform_0.18s_ease-in,_opacity_0.18s_ease-in] pointer-events-none items-center justify-center self-center p-[3px] [&_.q-btn]:(m-[5px])`
  ],

  [
    /^q-fab__actions--right$/,
    ([, c], { theme }) =>
      `origin-[0_50%] scale-[0.4] -translate-x-[62px] h-[56px] left-full ml-[9px]`
  ],

  [
    /^q-fab__actions--left$/,
    ([, c], { theme }) =>
      `origin-[100%_50%] scale-[0.4] translate-x-[62px] h-[56px] right-full mr-[9px] flex-row-reverse`
  ],

  [
    /^q-fab__actions--up$/,
    ([, c], { theme }) =>
      `origin-[50%_100%] scale-[0.4] translate-y-[62px] w-[56px] bottom-full mb-[9px] flex-col-reverse left-2/4 -ml-[28px]`
  ],

  [
    /^q-fab__actions--down$/,
    ([, c], { theme }) =>
      `origin-[50%_0] scale-[0.4] -translate-y-[62px] w-[56px] top-full mt-[9px] flex-col left-2/4 -ml-[28px]`
  ],

  [
    /^q-fab__actions--opened$/,
    ([, c], { theme }) =>
      `opacity-100 scale-100 translate-x-[0.1px] translate-y-[0]`
  ],

  [
    /^q-fab--align-left$/,
    ([, c], { theme }) =>
      `[&_>_.q-fab\\_\\_actions--up]:(items-start left-[28px]) [&_>_.q-fab\\_\\_actions--down]:(items-start left-[28px])`
  ],

  [
    /^q-fab--align-right$/,
    ([, c], { theme }) =>
      `[&_>_.q-fab\\_\\_actions--up]:(items-end left-auto right-0) [&_>_.q-fab\\_\\_actions--down]:(items-end left-auto right-0)`
  ]
]

export { shortcuts }
