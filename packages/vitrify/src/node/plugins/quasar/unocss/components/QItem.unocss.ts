import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-item$/,
    ([, c], { theme }) =>
      `min-h-[48px] px-[16px] py-[8px] [color:inherit] [transition:color_0.3s,_background-color_0.3s] [&_>_.q-item\_\_section--thumbnail:first-child]:(-ml-[16px]) [&_>_.q-focus-helper_+_.q-item\_\_section--thumbnail]:(-ml-[16px]) [&_>_.q-item\_\_section--thumbnail:last-of-type]:(-mr-[16px]) relative`
  ],

  [
    /^q-item__section--side$/,
    ([, c], { theme }) =>
      `text-[#757575] items-start pr-[16px] w-auto min-w-[0] max-w-full [&_>_.q-icon]:(text-[24px]) [&_>_.q-avatar]:(text-[40px])`
  ],

  [
    /^q-item__section--avatar$/,
    ([, c], { theme }) => `[color:inherit] min-w-[56px]`
  ],

  [
    /^q-item__section--thumbnail$/,
    ([, c], { theme }) => `[&_img]:(w-[100px] h-[56px])`
  ],

  [/^q-item__section--nowrap$/, ([, c], { theme }) => `whitespace-nowrap`],

  [
    /^q-item__label$/,
    ([, c], { theme }) =>
      `!leading-[1.2em] max-w-full [&_+_.q-item\_\_label]:(mt-[4px])`
  ],

  [
    /^q-item__label--overline$/,
    ([, c], { theme }) => `text-[rgba(0,_0,_0,_0.7)]`
  ],

  [
    /^q-item__label--caption$/,
    ([, c], { theme }) => `text-[rgba(0,_0,_0,_0.54)]`
  ],

  [
    /^q-item__label--header$/,
    ([, c], { theme }) =>
      `text-[#757575] p-[16px] text-[0.875rem] leading-5 tracking-[0.01786em]
      [&_+_.q-separator--spaced]:(pt-[8px])`
  ],
  [
    /^q-item--dark$/,
    ([, c], { theme }) =>
      `text-[#fff] border-[rgba(255,_255,_255,_0.28)] [&_.q-item\_\_section--side:not(.q-item\_\_section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-item\_\_label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item\_\_label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item\_\_label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
  ],

  [/^q-item.q-router-link--active$/, ([, c], { theme }) => ``],

  [/^q-item--active$/, ([, c], { theme }) => ``],

  [
    /^q-list--bordered$/,
    ([, c], { theme }) => `border-[1px] border-solid border-[rgba(0,0,0,0.12)]`
  ],

  [
    /^q-list--separator$/,
    ([, c], { theme }) =>
      `[&_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)]) [&_>_.q-virtual-scroll\_\_content_>_.q-item-type_+_.q-item-type]:([border-top:1px_solid_rgba(0,_0,_0,_0.12)])`
  ],

  [
    /^q-list--dense$/,
    ([, c], { theme }) => `[&_>_.q-item]:(min-h-[32px] px-[16px] py-[2px])`
  ],

  [/^q-item--dense$/, ([, c], { theme }) => `min-h-[32px] px-[16px] py-[2px]`],

  [
    /^q-list--dark.q-list--separator$/,
    ([, c], { theme }) =>
      `[&_>_.q-item-type_+_.q-item-type]:([border-top-color:rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-list--dark.q-list--separator$/,
    ([, c], { theme }) => `[&__>_.q-virtual-scroll\_\_content__>_.q-item-type
  __+_.q-item-type]:([border-top-color:rgba(255,_255,_255,_0.28)])`
  ],

  [
    /^q-list--dark$/,
    ([, c], { theme }) =>
      `text-[#fff] border-[rgba(255,_255,_255,_0.28)] [&_.q-item\_\_section--side:not(.q-item\_\_section--avatar)]:(text-[rgba(255,_255,_255,_0.7)]) [&_.q-item\_\_label--header]:(text-[rgba(255,_255,_255,_0.64)]) [&_.q-item\_\_label--overline]:(text-[rgba(255,_255,_255,_0.8)]) [&_.q-item\_\_label--caption]:(text-[rgba(255,_255,_255,_0.8)])`
  ]
]

export { shortcuts }
