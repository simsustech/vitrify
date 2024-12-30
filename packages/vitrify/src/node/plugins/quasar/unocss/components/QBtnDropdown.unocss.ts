import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-btn-dropdown--split$/,
    ([, c], { theme }) => `[&_.q-btn-dropdown\_\_arrow-container]:(px-4px py-0)
    [&_.q-btn-dropdown\_\_arrow-container.q-btn--outline]:(border-l-1px solid currentColor)
    [&_.q-btn-dropdown\_\_arrow-container:not(.q-btn--outline)]:(border-l-1px solid rgba(255, 255, 255, 0.3))
    `
  ],
  [
    /^q-btn-dropdown--simple$/,
    ([, c], { theme }) => `[&+.q-btn-dropdown\_\_arrow]:(ml-8px)`
  ],
  [
    /^q-btn-dropdown__arrow$/,
    ([, c], { theme }) =>
      `transition-property-transform transition-duration-280`
  ],
  [/^q-btn-dropdown--current$/, ([, c], { theme }) => `grow-1`]
]

export { shortcuts }
