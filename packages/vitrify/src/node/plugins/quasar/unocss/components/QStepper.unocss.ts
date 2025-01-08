import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-stepper$/,
    ([, c], { theme }) =>
      `[box-shadow:0_1px_5px_rgba(0,_0,_0,_0.2),_0_2px_2px_rgba(0,_0,_0,_0.14),_0_3px_1px_-2px_rgba(0,_0,_0,_0.12)] rounded-[4px] bg-[#fff]`
  ],

  [
    /^q-stepper__title$/,
    ([, c], { theme }) => `text-[14px] leading-[1.285714] tracking-[0.1px]`
  ],

  [
    /^q-stepper__caption$/,
    ([, c], { theme }) => `text-[12px] leading-[1.16667]`
  ],

  [
    /^q-stepper__dot$/,
    ([, c], { theme }) =>
      `mr-[8px] text-[14px] w-[24px] min-w-[24px] h-[24px] rounded-[50%] bg-current [&_span]:(text-[#fff])`
  ],

  [
    /^q-stepper__tab$/,
    ([, c], { theme }) =>
      `px-[24px] py-[8px] text-[14px] text-[#9e9e9e] flex-row`
  ],

  [
    /^q-stepper--dark$/,
    ([, c], { theme }) =>
      `[box-shadow:0_1px_5px_rgba(255,_255,_255,_0.2),_0_2px_2px_rgba(255,_255,_255,_0.14),_0_3px_1px_-2px_rgba(255,_255,_255,_0.12)] [&_.q-stepper\\_\\_dot_span]:(text-[#000]) [&_.q-stepper\\_\\_header--border]:(border-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper\\_\\_tab--disabled]:(text-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper\\_\\_tab--disabled_.q-stepper\\_\\_dot]:(bg-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper\\_\\_tab--disabled_.q-stepper\\_\\_label]:(text-[rgba(255,_255,_255,_0.54)])`
  ],

  [
    /^q-stepper__tab--navigation$/,
    ([, c], { theme }) => `select-none cursor-pointer`
  ],

  [
    /^q-stepper__tab--active$/,
    ([, c], { theme }) =>
      ` [&_.q-stepper\\_\\_dot]:([text-shadow:0_0_0_currentColor]) [&_.q-stepper\\_\\_label]:([text-shadow:0_0_0_currentColor]) text-primary`
  ],

  [
    /^q-stepper__tab--done$/,
    ([, c], { theme }) =>
      ` [&_.q-stepper\\_\\_dot]:([text-shadow:0_0_0_currentColor]) [&_.q-stepper\\_\\_label]:([text-shadow:0_0_0_currentColor]) text-primary`
  ],

  [
    /^q-stepper__tab--disabled$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_dot]:(bg-[rgba(0,_0,_0,_0.22)]) [&_.q-stepper\\_\\_label]:(text-[rgba(0,_0,_0,_0.32)])`
  ],

  [/^q-stepper__tab--error$/, ([, c], { theme }) => `text-negative`],

  [
    /^q-stepper__tab--error-with-icon$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_dot]:(!bg-transparent) [&_.q-stepper\\_\\_dot_span]:(text-current text-[24px])`
  ],

  [
    /^q-stepper__header$/,
    ([, c], { theme }) =>
      `[border-top-left-radius:inherit] [border-top-right-radius:inherit]`
  ],

  [
    /^q-stepper__header--border$/,
    ([, c], { theme }) => `[border-bottom:1px_solid_rgba(0,_0,_0,_0.12)]`
  ],

  [
    /^q-stepper__header--standard-labels$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_tab]:(min-h-[72px] justify-center) [&_.q-stepper\\_\\_tab:first-child]:(justify-start) [&_.q-stepper\\_\\_tab:last-child]:(justify-end) [&_.q-stepper\\_\\_tab:only-child]:(justify-center) [&_.q-stepper\\_\\_dot:after]:(hidden)`
  ],

  [
    /^q-stepper__header--alternative-labels$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_tab]:(min-h-[104px] px-[32px] py-[24px] flex-col justify-start) [&_.q-stepper\\_\\_dot]:(mr-0) [&_.q-stepper\\_\\_label]:(mt-[8px] text-center) [&_.q-stepper\\_\\_label:before]:(hidden) [&_.q-stepper\\_\\_label:after]:(hidden)`
  ],

  [
    /^q-stepper__header--contracted$/,
    ([, c], { theme }) =>
      `min-h-[72px] [&_.q-stepper\\_\\_tab]:(px-[0] py-[24px]) [&_.q-stepper\\_\\_tab:first-child_.q-stepper\\_\\_dot]:(translate-x-[24px]) [&_.q-stepper\\_\\_tab:last-child_.q-stepper\\_\\_dot]:(-translate-x-[24px]) [&_.q-stepper\\_\\_dot]:(m-0) [&_.q-stepper\\_\\_label]:(hidden)`
  ],

  [
    /^q-stepper__header--contracted.q-stepper__header--alternative-labels$/,
    ([, c], { theme }) =>
      `[&__.q-stepper\\_\\_tab]:(min-h-[72px]) [&__.q-stepper\\_\\_tab:first-child]:(items-start) [&__.q-stepper\\_\\_tab:last-child]:(items-end)`
  ],

  [
    /^q-stepper__header--contracted$/,
    ([, c], { theme }) =>
      `[&__.q-stepper\\_\\_tab:not(:last-child)__.q-stepper\\_\\_dot:after]:(!block)`
  ],

  [/^q-stepper__nav$/, ([, c], { theme }) => `pt-[24px]`],

  [/^q-stepper--flat$/, ([, c], { theme }) => `[box-shadow:none]`],

  [
    /^q-stepper--bordered$/,
    ([, c], { theme }) => `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-stepper--horizontal$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_step-inner]:(p-[24px]) [&_.q-stepper\\_\\_tab:first-child]:([border-top-left-radius:inherit]) [&_.q-stepper\\_\\_tab:last-child]:([border-top-right-radius:inherit]) [&_.q-stepper\\_\\_tab:first-child_.q-stepper\\_\\_dot:before]:(hidden) [&_.q-stepper\\_\\_tab:last-child_.q-stepper\\_\\_label:after]:(hidden) [&_.q-stepper\\_\\_tab:last-child_.q-stepper\\_\\_dot:after]:(hidden) [&_.q-stepper\\_\\_tab]:(overflow-hidden) [&_.q-stepper\\_\\_line]:() [&_.q-stepper\\_\\_line:before]:(absolute top-2/4 h-px w-screen bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper\\_\\_line:after]:(absolute top-2/4 h-px w-screen bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper\\_\\_label:after]:(content-empty left-full ml-[8px]) [&_.q-stepper\\_\\_dot:after]:(content-empty left-full ml-[8px]) [&_.q-stepper\\_\\_dot:before]:(content-empty right-full mr-[8px]) [&_>_.q-stepper\\_\\_nav]:(pt-[0] px-[24px] pb-[24px])`
  ],

  [
    /^q-stepper--vertical$/,
    ([, c], { theme }) =>
      `px-[0] py-[16px] [&_.q-stepper\\_\\_tab]:(px-[24px] py-[12px]) [&_.q-stepper\\_\\_title]:(leading-[18px]) [&_.q-stepper\\_\\_step-inner]:(pt-[0] pr-[24px] pb-[32px] pl-[60px]) [&_>_.q-stepper\\_\\_nav]:(pt-[24px] px-[24px] pb-[0]) [&_.q-stepper\\_\\_step]:(overflow-hidden) [&_.q-stepper\\_\\_dot]:(mr-[12px]) [&_.q-stepper\\_\\_dot:before]:(content-empty absolute left-2/4 w-px h-[99999px] bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper\\_\\_dot:after]:(content-empty absolute left-2/4 w-px h-[99999px] bg-[rgba(0,_0,_0,_0.12)]) [&_.q-stepper\\_\\_dot:before]:(bottom-full mb-[8px]) [&_.q-stepper\\_\\_dot:after]:(top-full mt-[8px]) [&_.q-stepper\\_\\_step:first-child_.q-stepper\\_\\_dot:before]:(hidden) [&_.q-stepper\\_\\_step:last-child_.q-stepper\\_\\_dot:after]:(hidden) [&_.q-stepper\\_\\_step:last-child_.q-stepper\\_\\_step-inner]:(pb-[8px])`
  ],

  [
    /^q-stepper--dark.q-stepper--bordered$/,
    ([, c], { theme }) => `border-[rgba(255,_255,_255,_0.28)]`
  ],

  [
    /^q-stepper--dark.q-stepper--horizontal$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_line:before]:(bg-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper\\_\\_line:after]:(bg-[rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-stepper--dark.q-stepper--vertical$/,
    ([, c], { theme }) =>
      `[&_.q-stepper\\_\\_dot:before]:(bg-[rgba(255,_255,_255,_0.28)]) [&_.q-stepper\\_\\_dot:after]:(bg-[rgba(255,_255,_255,_0.28)])`
  ]
]

export { shortcuts }
