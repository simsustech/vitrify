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
  [
    /^row$/,
    ([, c], { theme }) => `flex flex-row flex-wrap 
    [&_>_.col]:(grow)
    ${sizes
      .map((size) => `[&_>_.col-${size}]:(${size}:basis-auto ${size}:grow)`)
      .join(' ')}
    ${grid.map((nr) => `[&_>_.col-${nr}]:(basis-${nr}/12)`).join(' ')}
    ${sizes
      .map((size) =>
        grid
          .map((nr) => `[&_>_.col-${size}-${nr}]:(${size}:basis-${nr}/12)`)
          .join(' ')
      )
      .join(' ')}
  `
  ],
  [
    /^column$/,
    ([, c], { theme }) => `flex flex-col flex-wrap
      [&_>_.col]:(grow)
      ${sizes
        .map((size) => `[&_>_.col-${size}]:(${size}:basis-auto ${size}:grow)`)
        .join(' ')}
      ${grid.map((nr) => `[&_>_.col-${nr}]:(basis-${nr}/12)`).join(' ')}
    ${sizes
      .map((size) =>
        grid
          .map((nr) => `[&_>_.col-${size}-${nr}]:(${size}:basis-${nr}/12)`)
          .join(' ')
      )
      .join(' ')}
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
  ],
  [/^wrap$/, ([, size], { theme }) => `flex-wrap`],
  [/^no-wrap$/, ([, size], { theme }) => `flex-nowrap`],
  [/^reverse-wrap$/, ([, size], { theme }) => `flex-wrap-reverse`]
]

export { shortcuts }
