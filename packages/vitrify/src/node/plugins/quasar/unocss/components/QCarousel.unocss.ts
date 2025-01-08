import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-carousel$/,
    ([, c], { theme }) =>
      `bg-[#fff] h-[400px] [&_.q-carousel--padding]:(p-[16px]) [&_.q-carousel\\_\\_thumbnail]:(m-[2px] h-[50px] w-auto inline-block cursor-pointer border-[1px] border-solid border-[transparent] rounded-[4px] align-middle opacity-70 [transition:opacity_0.3s]) [&_.q-carousel\\_\\_thumbnail:hover]:(opacity-100) [&_.q-carousel\\_\\_thumbnail--active]:(opacity-100) [&_.q-carousel\\_\\_thumbnail--active]:(border-current cursor-default)`
  ],

  [
    /^q-carousel__slide$/,
    ([, c], { theme }) => `min-h-full bg-cover bg-[50%] p-[16px]`
  ],

  [/^q-carousel__slides-container$/, ([, c], { theme }) => `h-full`],

  [/^q-carousel__control$/, ([, c], { theme }) => `text-[#fff]`],

  [
    /^q-carousel__arrow$/,
    ([, c], { theme }) =>
      `pointer-events-none [&_.q-icon]:(text-[28px]) [&_.q-btn]:()`
  ],

  [
    /^q-carousel__prev-arrow--horizontal$/,
    ([, c], { theme }) => `top-[16px] bottom-[16px] left-[16px]`
  ],

  [
    /^q-carousel__next-arrow--horizontal$/,
    ([, c], { theme }) => `top-[16px] bottom-[16px] right-[16px]`
  ],

  [
    /^q-carousel__prev-arrow--vertical$/,
    ([, c], { theme }) => `left-[16px] right-[16px] top-[16px]`
  ],

  [
    /^q-carousel__next-arrow--vertical$/,
    ([, c], { theme }) => `left-[16px] right-[16px] bottom-[16px]`
  ],

  [
    /^q-carousel__navigation--top$/,
    ([, c], { theme }) =>
      `left-[16px] right-[16px] overflow-x-auto overflow-y-hidden top-[16px]`
  ],

  [
    /^q-carousel__navigation--bottom$/,
    ([, c], { theme }) =>
      `left-[16px] right-[16px] overflow-x-auto overflow-y-hidden bottom-[16px]`
  ],

  [
    /^q-carousel__navigation--left$/,
    ([, c], { theme }) =>
      `top-[16px] bottom-[16px] overflow-x-hidden overflow-y-auto [&_>_.q-carousel\\_\\_navigation-inner]:(flex-col) left-[16px]`
  ],

  [
    /^q-carousel__navigation--right$/,
    ([, c], { theme }) =>
      `top-[16px] bottom-[16px] overflow-x-hidden overflow-y-auto [&_>_.q-carousel\\_\\_navigation-inner]:(flex-col) right-[16px]`
  ],

  [/^q-carousel__navigation-inner$/, ([, c], { theme }) => `flex-auto`],

  [
    /^q-carousel__navigation$/,
    ([, c], { theme }) => `[&_.q-btn]:(mx-[4px] my-[6px] p-[5px])`
  ],

  [
    /^q-carousel__navigation-icon--inactive$/,
    ([, c], { theme }) => `opacity-70`
  ],

  [
    /^q-carousel--navigation-top$/,
    ([, c], { theme }) => `[&_.q-carousel--padding]:(pt-[60px])`
  ],

  [
    /^q-carousel--arrows-vertical$/,
    ([, c], { theme }) =>
      `[&_.q-carousel--padding]:(pt-[60px]) [&_.q-carousel--padding]:(pb-[60px])`
  ],

  [
    /^q-carousel--navigation-bottom$/,
    ([, c], { theme }) => `[&_.q-carousel--padding]:(pb-[60px])`
  ],

  [
    /^q-carousel--navigation-left$/,
    ([, c], { theme }) => `[&_.q-carousel--padding]:(pl-[60px])`
  ],

  [
    /^q-carousel--arrows-horizontal$/,
    ([, c], { theme }) =>
      `[&_.q-carousel--padding]:(pl-[60px]) [&_.q-carousel--padding]:(pr-[60px])`
  ],

  [
    /^q-carousel--navigation-right$/,
    ([, c], { theme }) => `[&_.q-carousel--padding]:(pr-[60px])`
  ]
]

export { shortcuts }