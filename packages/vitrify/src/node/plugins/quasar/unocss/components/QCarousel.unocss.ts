import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-carousel$/,
    ([, c], { theme }) => `bg-white h-400px
    [&_.q-carousel--padding]:(p-16px)
    [&_.q-carousel__thumbnail]:(m-2px h-50px w-auto inline-block cursor-pointer border-solid border-transparent border-rd-4px v-middle op-70 transition-opacity-duration-300")
    [&_.q-carousel__thumbnail:hover]:(op-1000)
    [&_.q-carousel__thumbnail--active]:(op-1000 border-currentColor cursor-default)
    [&.fullscreen]:(h-full)
    `
  ],
  [
    /^q-carousel__slide$/,
    ([, c], { theme }) => `min-h-full bg-cover bg-top p-16px`
  ],
  [/^q-carousel__slides-container$/, ([, c], { theme }) => `h-full`],
  [/^q-carousel__control$/, ([, c], { theme }) => `text-white`],
  [
    /^q-carousel__arrow$/,
    ([, c], { theme }) => `pointer-events-none
    [&_.q-icon]:(text-28px)
    [&_.q-btn]:(point-events-all)
    `
  ],
  [
    /^q-carousel__prev-arrow--horizontal$/,
    ([, c], { theme }) => `top-16px bottom-16px left-16px`
  ],
  [
    /^q-carousel__next-arrow--horizontal$/,
    ([, c], { theme }) => `top-16px bottom-16px right-16px`
  ],
  [
    /^q-carousel__prev-arrow--vertical$/,
    ([, c], { theme }) => `left-16px right-16px top-16px`
  ],
  [
    /^q-carousel__next-arrow--vertical$/,
    ([, c], { theme }) => `left-16px right-16px bottom-16px`
  ],
  [
    /^q-carousel__navigation--top$/,
    (
      [, c],
      { theme }
    ) => `left-16px right-16px overflow-x-auto overflow-y-hidden top-16px
    [&.q-carousel--with-padding_.q-carousel__slide]:(pt-60px)
    [&_.q-carousel--padding]:(pt-60px)
    `
  ],
  [
    /^q-carousel__navigation--bottom$/,
    (
      [, c],
      { theme }
    ) => `left-16px right-16px overflow-x-auto overflow-y-hidden bottom-16px
    [&.q-carousel--with-padding_.q-carousel__slide]:(pb-60px)
    [&_.q-carousel--padding]:(pb-60px)
    `
  ],
  [
    /^q-carousel__navigation--left$/,
    (
      [, c],
      { theme }
    ) => `top-16px bottom-16px overflow-x-hidden overflow-y-auto left-16-px
      [&>.q-carousel\_\_navigation-inner]:(flex-col)
      [&.q-carousel--with-padding_.q-carousel__slide]:(pl-60px)
      [&_.q-carousel--padding]:(pl-60px)
    `
  ],
  [
    /^q-carousel__navigation--right$/,
    (
      [, c],
      { theme }
    ) => `top-16px bottom-16px overflow-x-hidden overflow-y-auto right-16px
        [&>.q-carousel\_\_navigation-inner]:(flex-col)
        [&.q-carousel--with-padding_.q-carousel__slide]:(pr-60px)
        [&_.q-carousel--padding]:(pr-60px)
    `
  ],
  [
    /^q-carousel__navigation-inner$/,
    ([, c], { theme }) => `flex-grow-1 flex-shrink-1 flex-basis-a`
  ],
  [
    /^q-carousel__navigation$/,
    ([, c], { theme }) => `[&_.q-btn]:(mx-4px my-6px p-5px)`
  ],
  [/^q-carousel__navigation-icon--inactive$/, ([, c], { theme }) => `op-70`],
  [
    /^q-carousel--arrows-vertical$/,
    (
      [, c],
      { theme }
    ) => `[&.q-carousel--with-padding_.q-carousel__slide]:(pt-60px)
    [&_.q-carousel--padding]:(pt-60px)`
  ],
  [
    /^q-carousel--arrows-vertical$/,
    (
      [, c],
      { theme }
    ) => `[&.q-carousel--with-padding_.q-carousel__slide]:(pt-60px pb-60px)
    [&_.q-carousel--padding]:(pt-60px pb-60px)`
  ]
]

export { shortcuts }
