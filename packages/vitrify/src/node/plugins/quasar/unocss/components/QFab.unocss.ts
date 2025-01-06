import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^z-fab$/, ([, c], { theme }) => `z-990`],
  [
    /^q-fab$/,
    ([, c], { theme }) => `relative v-middle
      [&>.q-btn]:(w-full)`
  ],
  [/^q-fab--form-rounded$/, ([, c], { theme }) => `border-rd-28px`],
  [/^q-fab--form-square$/, ([, c], { theme }) => `border-rd-4px`],
  [
    /^q-fab__icon$/,
    ([, c], { theme }) => `transition-[opacity]-400 op-100 rotate-0`
  ],
  [
    /^q-fab__active-icon$/,
    ([, c], { theme }) => `transition-[opacity]-400 op-0 rotate--180`
  ],
  [
    /^q-fab__label--external$/,
    ([, c], { theme }) => `absolute px-8px py-0 transition-[opacity]-180`
  ],
  [
    /^q-fab__label--external-hidden$/,
    ([, c], { theme }) => `op-0 pointer-events-none`
  ],
  [
    /^q-fab__label--external-left$/,
    ([, c], { theme }) => `t-50% left--12px translate-x--100% translate-y--50%`
  ],
  [
    /^q-fab__label--external-right$/,
    ([, c], { theme }) => `top-50% r--12px translate-x-100% translate-y--50%`
  ],
  [
    /^q-fab__label--external-bottom$/,
    ([, c], { theme }) => `b--12px left-50% translate-x--50% translate-y-100%`
  ],
  [
    /^q-fab__label--external-top$/,
    ([, c], { theme }) => `t--12px left-50% translate-x--50% translate-y--100%`
  ],
  [
    /^q-fab__label--internal$/,
    ([, c], { theme }) => `p-0 transition-[font-size]-120 max-h-30px`
  ],
  [/^q-fab__label--internal-hidden$/, ([, c], { theme }) => `text-0 op-0`],
  [
    /^q-fab__label--internal-top$/,
    ([, c], { theme }) => `pb-0.12em
      [&.q-fab\_\_label--internal-hidden]:(max-h-0)
    `
  ],
  [
    /^q-fab__label--internal-bottom$/,
    ([, c], { theme }) => `pt-0.12em
      [&.q-fab\_\_label--internal-hidden]:(max-h-0)
    `
  ],
  [
    /^q-fab__label--internal-left$/,
    ([, c], { theme }) => `pl-0.285em pr-0.571em`
  ],
  [
    /^q-fab__label--internal-right$/,
    ([, c], { theme }) => `pr-0.285em pl-0.571em`
  ],
  [
    /^q-fab__icon-holder$/,
    ([, c], { theme }) => `min-w-24px min-h-24px relative`
  ],
  [
    /^q-fab__icon-holder--opened$/,
    ([, c], { theme }) => `[&_.q-fab__icon]:(rotate-180 op-0)
    [&_.q-fab__active-icon]:(rotate-0 op-100)
    `
  ],
  [
    /^q-fab__actions$/,
    (
      [, c],
      { theme }
    ) => `absolute op-0 transition-[transform]-180 pointer-events-none items-center justify-center self-center p-3px
      [&_.q-btn]:(m-5px)
    `
  ],
  [
    /^q-fab__actions--right$/,
    ([, c], { theme }) =>
      `origin-0-50% scale-40 translate-x--62px h-56px left-full ml-9px`
  ],
  [
    /^q-fab__actions--left$/,
    ([, c], { theme }) =>
      `origin-100%-50% scale-40 translate-x-62px h-56px right-full mr-9px flex-row-reverse`
  ],
  [
    /^q-fab__actions--up$/,
    ([, c], { theme }) =>
      `origin-50%-100% scale-40 translate-y-62px w-56px bottom-full mb-9px flex-col-reverse left-50% nl--28px`
  ],
  [
    /^q-fab__actions--down$/,
    ([, c], { theme }) =>
      `origin-50%-0 scale-40 translate-y--62px w-56px top-full mt-9px flex-col left-50% nl--28px`
  ],
  [
    /^q-fab__actions--opened$/,
    ([, c], { theme }) =>
      `op-100 scale-100 translate-x-0.1px translate-y-0 pointer-events-auto`
  ],
  [
    /^q-fab--align-left$/,
    ([, c], { theme }) => `[&>.q-fab\_\_actions--up]:(items-start left-28px)
      [&>.q-fab\_\_actions--down]:(items-start left-28px)
    `
  ],
  [
    /^q-fab--align-right$/,
    (
      [, c],
      { theme }
    ) => `[&>.q-fab\_\_actions--up]:(items-end left-auto right-0)
      [&>.q-fab\_\_actions--down]:(items-end left-auto right-0)
    `
  ]
]

export { shortcuts }
