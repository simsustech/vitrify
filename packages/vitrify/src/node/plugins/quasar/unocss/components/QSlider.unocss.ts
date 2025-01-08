import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-slider$/, ([, c], { theme }) => `relative`],

  [/^q-slider--h$/, ([, c], { theme }) => `w-full`],

  [/^q-slider--v$/, ([, c], { theme }) => `h-[200px]`],

  [
    /^q-slider--editable$/,
    ([, c], { theme }) => `[&_.q-slider\\_\\_track-container]:()`
  ],

  [/^q-slider__track-container$/, ([, c], { theme }) => `outline-0`],

  [
    /^q-slider__track-container--h$/,
    ([, c], { theme }) =>
      `w-full px-[0] py-[12px] [&_.q-slider\\_\\_selection]:()`
  ],

  [
    /^q-slider__track-container--v$/,
    ([, c], { theme }) =>
      `h-full px-[12px] py-[0] [&_.q-slider\\_\\_selection]:()`
  ],

  [
    /^q-slider__track$/,
    ([, c], { theme }) =>
      `bg-[rgba(0,_0,_0,_0.1)] rounded-[4px] [width:inherit] [height:inherit] text-primary`
  ],

  [
    /^q-slider__inner$/,
    ([, c], { theme }) =>
      `bg-[rgba(0,_0,_0,_0.1)] [border-radius:inherit] w-full h-full`
  ],

  [
    /^q-slider__selection$/,
    ([, c], { theme }) => `bg-current [border-radius:inherit] w-full h-full`
  ],

  [
    /^q-slider__markers$/,
    ([, c], { theme }) =>
      `text-[rgba(0,_0,_0,_0.3)] [border-radius:inherit] w-full h-full [&:after]:(content-empty absolute bg-current)`
  ],

  [
    /^q-slider__markers--h$/,
    ([, c], { theme }) =>
      `bg-[repeating-linear-gradient(_to_right,_currentColor,_currentColor_2px,_rgba(255,_255,_255,_0)_0,_rgba(255,_255,_255,_0)_)] [&:after]:(h-full w-[2px] top-0 right-0)`
  ],

  [
    /^q-slider__markers--v$/,
    ([, c], { theme }) =>
      `bg-[repeating-linear-gradient(_to_bottom,_currentColor,_currentColor_2px,_rgba(255,_255,_255,_0)_0,_rgba(255,_255,_255,_0)_)] [&:after]:(w-full h-[2px] left-0 bottom-0)`
  ],

  [
    /^q-slider__marker-labels-container$/,
    ([, c], { theme }) => `relative w-full h-full min-h-[24px] min-w-[24px]`
  ],

  [/^q-slider__marker-labels$/, ([, c], { theme }) => `absolute`],

  [/^q-slider__marker-labels--h-standard$/, ([, c], { theme }) => `top-0`],

  [/^q-slider__marker-labels--h-switched$/, ([, c], { theme }) => `bottom-0`],

  [
    /^q-slider__marker-labels--h-ltr$/,
    ([, c], { theme }) => `-translate-x-1/2`
  ],

  [/^q-slider__marker-labels--h-rtl$/, ([, c], { theme }) => `translate-x-1/2`],

  [/^q-slider__marker-labels--v-standard$/, ([, c], { theme }) => `left-[4px]`],

  [
    /^q-slider__marker-labels--v-switched$/,
    ([, c], { theme }) => `right-[4px]`
  ],

  [
    /^q-slider__marker-labels--v-ltr$/,
    ([, c], { theme }) => `-translate-y-1/2`
  ],

  [/^q-slider__marker-labels--v-rtl$/, ([, c], { theme }) => `translate-y-1/2`],

  [
    /^q-slider__thumb$/,
    ([, c], { theme }) =>
      `outline-0 [transition:transform_0.18s_ease-out,_fill_0.18s_ease-out,_stroke_0.18s_ease-out] text-primary`
  ],

  [/^q-slider__thumb--h$/, ([, c], { theme }) => `top-2/4`],

  [
    /^q-slider__thumb--h-ltr$/,
    ([, c], { theme }) => `scale-100 -translate-x-1/2 -translate-y-1/2`
  ],

  [
    /^q-slider__thumb--h-rtl$/,
    ([, c], { theme }) => `scale-100 translate-x-1/2 -translate-y-1/2`
  ],

  [/^q-slider__thumb--v$/, ([, c], { theme }) => `left-2/4`],

  [
    /^q-slider__thumb--v-ltr$/,
    ([, c], { theme }) => `scale-100 -translate-x-1/2 -translate-y-1/2`
  ],

  [
    /^q-slider__thumb--v-rtl$/,
    ([, c], { theme }) => `scale-100 -translate-x-1/2 translate-y-1/2`
  ],

  [
    /^q-slider__thumb-shape$/,
    ([, c], { theme }) =>
      `top-0 left-0 stroke-[3.5] stroke-current [transition:transform_0.28s] [&_path]:(stroke-current fill-current)`
  ],

  [
    /^q-slider__focus-ring$/,
    ([, c], { theme }) =>
      `rounded-[50%] opacity-0 [transition:transform_266.67ms_ease-out,_opacity_266.67ms_ease-out,_background-color_266.67ms_ease-out] delay-[140ms]`
  ],

  [
    /^q-slider__pin$/,
    ([, c], { theme }) =>
      `opacity-0 whitespace-nowrap [transition:opacity_0.28s_ease-out] delay-[140ms] [&:before]:(content-empty w-[0] h-[0] absolute)`
  ],

  [
    /^q-slider__pin--h$/,
    ([, c], { theme }) =>
      `[&:before]:([border-left:6px_solid_transparent] [border-right:6px_solid_transparent] left-2/4 -translate-x-1/2)`
  ],

  [
    /^q-slider__pin--h-standard$/,
    ([, c], { theme }) =>
      `bottom-full [&:before]:(bottom-[2px] [border-top:6px_solid_currentColor])`
  ],

  [
    /^q-slider__pin--h-switched$/,
    ([, c], { theme }) =>
      `top-full [&:before]:(top-[2px] [border-bottom:6px_solid_currentColor])`
  ],

  [
    /^q-slider__pin--v$/,
    ([, c], { theme }) =>
      `top-0 [&:before]:(top-2/4 -translate-y-1/2 [border-top:6px_solid_transparent] [border-bottom:6px_solid_transparent])`
  ],

  [
    /^q-slider__pin--v-standard$/,
    ([, c], { theme }) =>
      `left-full [&:before]:(left-[2px] [border-right:6px_solid_currentColor])`
  ],

  [
    /^q-slider__pin--v-switched$/,
    ([, c], { theme }) =>
      `right-full [&:before]:(right-[2px] [border-left:6px_solid_currentColor])`
  ],

  [/^q-slider__label$/, ([, c], { theme }) => `whitespace-nowrap absolute`],

  [/^q-slider__label--h$/, ([, c], { theme }) => `left-2/4 -translate-x-1/2`],

  [/^q-slider__label--h-standard$/, ([, c], { theme }) => `bottom-[7px]`],

  [/^q-slider__label--h-switched$/, ([, c], { theme }) => `top-[7px]`],

  [/^q-slider__label--v$/, ([, c], { theme }) => `top-2/4 -translate-y-1/2`],

  [/^q-slider__label--v-standard$/, ([, c], { theme }) => `left-[7px]`],

  [/^q-slider__label--v-switched$/, ([, c], { theme }) => `right-[7px]`],

  [
    /^q-slider__text-container$/,
    ([, c], { theme }) =>
      `min-h-[25px] px-[8px] py-[2px] rounded-[4px] bg-current relative text-center`
  ],

  [/^q-slider__text$/, ([, c], { theme }) => `text-[#fff] text-[12px]`],

  [
    /^q-slider--no-value$/,
    ([, c], { theme }) =>
      `[&_.q-slider\\_\\_thumb]:(opacity-0) [&_.q-slider\\_\\_inner]:(opacity-0) [&_.q-slider\\_\\_selection]:(opacity-0)`
  ],

  [
    /^q-slider--focus$/,
    ([, c], { theme }) =>
      `[&_.q-slider\\_\\_focus-ring]:(bg-current [transform:scale3d(1.55,_1.55,_1)] opacity-25) [&_.q-slider\\_\\_thumb]:(opacity-100) [&_.q-slider\\_\\_inner]:(opacity-100) [&_.q-slider\\_\\_selection]:(opacity-100)`
  ],

  [
    /^q-slider--inactive$/,
    ([, c], { theme }) =>
      `[&_.q-slider\\_\\_thumb--h]:([transition:left_0.28s,_right_0.28s]) [&_.q-slider\\_\\_thumb--v]:([transition:top_0.28s,_bottom_0.28s]) [&_.q-slider\\_\\_selection]:([transition:width_0.28s,_left_0.28s,_right_0.28s,_height_0.28s,_top_0.28s,_bottom_0.28s]) [&_.q-slider\\_\\_text-container]:([transition:transform_0.28s])`
  ],

  [
    /^q-slider--active$/,
    ([, c], { theme }) =>
      ` [&_.q-slider\\_\\_thumb-shape]:(scale-150) [&_.q-slider\\_\\_focus-ring]:(!scale-0)`
  ],

  [
    /^q-slider--label$/,
    ([, c], { theme }) =>
      `[&_.q-slider--focus_.q-slider\\_\\_pin]:(opacity-100)`
  ],

  [
    /^q-slider--dark$/,
    ([, c], { theme }) =>
      `[&_.q-slider\\_\\_track]:(bg-[rgba(255,_255,_255,_0.1)]) [&_.q-slider\\_\\_inner]:(bg-[rgba(255,_255,_255,_0.1)]) [&_.q-slider\\_\\_markers]:(text-[rgba(255,_255,_255,_0.3)])`
  ],

  [
    /^q-slider--dense$/,
    ([, c], { theme }) =>
      `[&_.q-slider\\_\\_track-container--h]:(px-[0] py-[6px]) [&_.q-slider\\_\\_track-container--v]:(px-[6px] py-[0])`
  ]
]

export { shortcuts }
