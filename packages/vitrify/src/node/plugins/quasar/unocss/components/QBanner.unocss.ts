import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-banner$/, ([, c], { theme }) => `min-h-54px px-16px py-8px bg-white`],
  [/^q-banner--top-padding$/, ([, c], { theme }) => ``],
  [/^q-banner--top-padding$/, ([, c], { theme }) => `pt-14px`],
  [
    /^q-banner__avatar$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner__avatar'] ??
      `min-w-1px! [&.q-avatar]:(text-46px) 
    [&.q-icon]:(text-40px) 
    [&:not(:empty)+.q-banner\\_\\_content]:(pl-16px)`
  ],
  [
    /^q-banner__actions$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner__actions'] ??
      `[&.col-auto]:(pl-16px)
        [&.col-all_.q.btn-item]:(mt-4px mb-0 ml-4px mr-0)`
  ],

  [
    /^q-banner--dense$/,
    ([, c], { theme }) =>
      theme.quasar?.components?.['q-banner--dense'] ??
      `min-h-32px p-8px
          [&_.q-banner\\_\\_avatar>.q-avatar,.q-banner--dense_.q-banner\\_\\_avatar>.q-icon]:(text-28px)
      [&_.q-banner\\_\\_avatar:not(:empty)+.q-banner\\_\\_content]:(pl-8px)
      [&_.q-banner\\_\\_actions.col-auto]:(pl-8px)`
  ]
]

export { shortcuts }
