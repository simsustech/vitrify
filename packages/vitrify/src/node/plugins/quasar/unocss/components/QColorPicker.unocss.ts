import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-color-picker$/,
    ([, c], { theme }) => `
    overflow-hidden bg-white max-w-350px v-top min-w-180px border-rd-4px 
    shadow-sm
    [&.q-tab]:(p-0!)
    [&_input]:(text-inherit bg-transparent outline-0 text-center)
    [&_.q-tabs]:(overflow-hidden)
    [&_.q-tab--active]:(shadow-sm)
    [&_.q-tab--active_.q-focus-helper]:(hidden)
    [&_q-tab\\_\\_indicator]:(hidden)
    [&_q-tab-panels]:(bg-inherit)
    `
  ],
  [
    /^q-color-picker--bordered$/,
    ([, c], { theme }) => `
    border-1px border-black border-op-120
    `
  ],
  [
    /^q-color-picker__header-tabs$/,
    ([, c], { theme }) => `
    h-32px
    `
  ],
  [
    /^q-color-picker__header-banner$/,
    ([, c], { theme }) => `
    h-36px
    `
  ],
  [
    /^q-color-picker__header$/,
    ([, c], { theme }) => `
    [&_input]:(lh-24px border-none)
    [&_.q-tab]:(min-h-32px! h-32px!)
    [&_.q-tab--inactive]:(bg-gradient-linear from-black/30 via-black/15 to-black/10)
    `
  ],
  [
    /^q-color-picker__error-icon$/,
    ([, c], { theme }) => `
      bottom-2px right-2px text-24px op-0 transition-opacity-300
    `
  ],
  [
    /^q-color-picker__header-content$/,
    ([, c], { theme }) => `
      relative bg-white
    `
  ],
  [
    /^q-color-picker__header-content--light$/,
    ([, c], { theme }) => `
      text-black
    `
  ],
  [
    /^q-color-picker__header-content--dark$/,
    ([, c], { theme }) => `
      text-white
      [&_.q-tab--inactive:before]:(content-empty absolute top-0 right-0 bottom-0 left-0 bg-white bg-op-200)
    `
  ],
  [
    /^q-color-picker__header-banner$/,
    ([, c], { theme }) => `
      h-36px
    `
  ],
  [
    /^q-color-picker__header-bg$/,
    ([, c], { theme }) => `
      bg-white bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==)')]

    `
  ],
  [
    /^q-color-picker__footer$/,
    ([, c], { theme }) => `
      h-36px
      [&_.q-tab]:(min-h-36px! h-36px!)
      [&_.q-tab--inactive]:(bg-gradient-to-b from-black/0.3 via-black/0.15 to-black/0.1)
    `
  ],
  [
    /^q-color-picker__spectrum$/,
    ([, c], { theme }) => `
      h-full w-full
    `
  ],
  [
    /^q-color-picker__spectrum-tab$/,
    ([, c], { theme }) => `
      p-0!
    `
  ],
  [
    /^q-color-picker__spectrum--white$/,
    ([, c], { theme }) => `
      bg-gradient-to-r from-white to-black
    `
  ],
  [
    /^q-color-picker__spectrum--white$/,
    ([, c], { theme }) => `
      bg-gradient-to-t from-black to-black
    `
  ],
  [
    /^q-color-picker__spectrum--circle$/,
    ([, c], { theme }) => `
      w-10px h-10px shadow-sm border-rd-50% translate-x--5px translate-y--5px
    `
  ],
  [
    /^q-color-picker__hue$/,
    ([, c], { theme }) => `
      [&_.q-slider-track]:(bg-gradient-to-r! from-[#f00] via-[#ff0/17] via-[#0f0/33] via-[#off/50] via-[#00f/67] via-[#f0f/83] to-[#f00] op-100)
    `
  ],
  [
    /^q-color-picker__alpha$/,
    ([, c], { theme }) => `
    [&_.q-slider\\_\\_track-container]:(pt-0)
    [&_.q-slider\\_\\_track:before]:(content-empty absolute top-0 right-0 bottom-0 left-0 border-rd-inherit bg-gradient-to-r from-black to-[#757575])
    `
  ],
  [
    /^q-color-picker__sliders$/,
    ([, c], { theme }) => `
    pt-0 pb-0 pl-16px pr-16px
    [&_.q-slider\\_\\_thumb]:(text-[#424242])
    [&_.q-slider\\_\\_thumb_path]:(stroke-2px fill-transparent)
    [&_.q-slider--active_path]:(stroke-3px)
  `
  ],
  [
    /^q-color-picker__tune-tab$/,
    ([, c], { theme }) => `
      [&_.q-slider]:(ml-18px mr-18px)
      [&_input]:(text-11px border-solid border-1 border-color-[#e0e0e0] border-rd-4px w-3.5em)
  `
  ],
  [
    /^q-color-picker__palette-tab$/,
    ([, c], { theme }) => `
      p-0!
  `
  ],
  [
    /^q-color-picker__palette-rows--editable$/,
    ([, c], { theme }) => `
      [&_.q-color-picker__cube]:(cursor-pointer)
  `
  ],
  [
    /^q-color-picker__cube$/,
    ([, c], { theme }) => `
      pb-10% w-10%!
  `
  ],
  [
    /^q-color-picker--dark$/,
    ([, c], { theme }) => `
      shadow-sm
      [&_.q-color-picker\\_\\_tune-tab_input]:(border-solid border-1px border-black border-op-30)
      [&_.q-slider__thumb]:(text-[#fafafa])
  `
  ]
]

export { shortcuts }
