import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-textarea$/,
    ([, c], { theme }) =>
      `[&_.q-field\_\_control]:(min-h-[56px] h-auto) [&_.q-field\_\_control-container]:(pt-[2px] pb-[2px]) [&_.q-field\_\_shadow]:(top-[2px] bottom-[2px]) [&_.q-field\_\_native]:(leading-[18px]) [&_.q-field\_\_prefix]:(leading-[18px]) [&_.q-field\_\_suffix]:(leading-[18px]) [&_.q-field\_\_native]:(resize-y pt-[17px] min-h-[52px])`
  ],

  [
    /^q-textarea.q-field--labeled$/,
    ([, c], { theme }) =>
      `[&_.q-field\_\_control-container]:(pt-[26px]) [&_.q-field\_\_shadow]:(top-[26px]) [&_.q-field\_\_native]:(pt-0) [&_.q-field\_\_prefix]:(pt-0) [&_.q-field\_\_suffix]:(pt-0) [&_.q-field\_\_native]:(min-h-[26px] pt-px)`
  ],

  [
    /^q-textarea--autogrow$/,
    ([, c], { theme }) => `[&_.q-field\_\_native]:(resize-none)`
  ],

  [
    /^q-textarea.q-field--dense$/,
    ([, c], { theme }) =>
      `[&_.q-field\_\_control]:(min-h-[36px]) [&_.q-field\_\_native]:(min-h-[36px]) [&_.q-field\_\_native]:(pt-[9px])`
  ],

  [
    /^q-textarea.q-field--dense.q-field--labeled$/,
    ([, c], { theme }) =>
      `[&_.q-field\_\_control-container]:(pt-[14px]) [&_.q-field\_\_shadow]:(top-[14px]) [&_.q-field\_\_native]:(min-h-[24px] pt-[3px]) [&_.q-field\_\_prefix]:(pt-[2px]) [&_.q-field\_\_suffix]:(pt-[2px])`
  ],

  [
    /^q-textarea.disabled$/,
    ([, c], { theme }) => `[&_.q-field\_\_native]:(resize-none)`
  ]
]

export { shortcuts }
