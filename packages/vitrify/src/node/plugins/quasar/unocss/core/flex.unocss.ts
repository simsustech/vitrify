import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const cols = 12
const grid = Array.from({ length: cols }, (_, i) => i + 1)

const colGutter = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 12
} as const

const sizes = ['sm', 'md', 'lg', 'xl']

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^row$/, ([, c], { theme }) => `flex flex-row flex-wrap`],
  [/^column$/, ([, c], { theme }) => `flex flex-col flex-wrap`],
  [
    /^col(?:-)?(none|xs|sm|md|lg|xl)?(?:-)?([2-9]|1[0-2]?)?$/,
    ([, size, nr], { theme }) => {
      if (size && nr) {
        return `${size}:basis-${nr}/12)`
      } else if (nr) {
        return `basis-${nr}/12`
      } else if (size) {
        return `${size}:basis-auto ${size}:grow`
      }
      return `grow`
    }
  ],
  [
    /^q-col-gutter-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}`
  ],
  [
    /^q-col-gutter-x-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-x-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}`
  ],
  [
    /^q-col-gutter-y-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `gap-y-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}`
  ],
  [
    /^q-gutter-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `mt--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        ml--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        space-x-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}`
  ],
  [
    /^q-gutter-x-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `ml--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      space-x-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']})`
  ],
  [
    /^q-gutter-y-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `mt--${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
       space-y-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']})`
  ],
  [/^wrap$/, ([, size], { theme }) => `flex-wrap`],
  [/^no-wrap$/, ([, size], { theme }) => `flex-nowrap`],
  [/^reverse-wrap$/, ([, size], { theme }) => `flex-wrap-reverse`]
]

export { shortcuts }
