import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const cols = 12
const grid = Array.from({ length: cols + 1 }, (_, i) => i + 0)

const colGutter = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 12
} as const

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^row$/,
    ([, c], { theme }) => `grid grid-flow-row grid-cols-12
    ${grid.map((nr) => `[&_>_col-${nr}]:(col-span-${nr})`).join(' ')}
  `
  ],
  [
    /^column$/,
    ([, c], { theme }) => `grid grid-flow-col grid-rows-12
      ${grid.map((nr) => `[&_>_col-${nr}]:(row-span-${nr})`).join(' ')}
  `
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
      `mt-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        ml-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
        [&_>_*]:(mt-${
          colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
        }
        pl-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']})`
  ],
  [
    /^q-gutter-x-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `ml-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
    [&_>_*]:(pl-${
      colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
    })`
  ],
  [
    /^q-gutter-y-(none|xs|sm|md|lg|xl)$/,
    ([, size], { theme }) =>
      `mt-${colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']}
      [&_>_*]:(mt-${
        colGutter[size as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl']
      })`
  ]
]

export { shortcuts }
