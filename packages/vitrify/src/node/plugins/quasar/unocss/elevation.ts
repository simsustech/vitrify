import type { Rule } from '@unocss/core'
import type { QuasarTheme } from './theme'

const shadows = (mode: 'light' | 'dark') => [
  ...Array.from({ length: 24 }, (_, i) => i + 1).reduce((acc, z) => {
    acc.push([
      new RegExp(`shadow-${z}`),
      ([, c], { symbols, theme }) => ({
        [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
        'box-shadow': theme['$shadows'][z]
      })
    ])
    acc.push([
      new RegExp(`shadow-up-${z}`),
      ([, c], { symbols, theme }) => ({
        [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,

        'box-shadow': theme['$shadows'][z]
      })
    ])
    return acc
  }, [] as Rule<QuasarTheme>[]),
  [
    /^.inset-shadow$/,
    function* ([, color], { symbols, theme }) {
      yield {
        [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
        'box-shadow': theme['$inset-shadow']
      }
    }
  ] as Rule<QuasarTheme>,
  [
    /^.inset-shadow-down$/,
    function* ([, color], { symbols, theme }) {
      yield {
        [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
        'box-shadow': theme['$inset-shadow-down']
      }
    }
  ] as Rule<QuasarTheme>
]

const rules: Rule<QuasarTheme>[] = [
  [
    /^.shadow-transition$/,
    function* ([, color], { theme }) {
      yield {
        transition: `${theme['$shadow-transition']} !important`
      }
    }
  ],
  ...shadows('light'),
  ...shadows('dark'),
  ...['no-shadow', 'shadow-0'].map(
    (c) =>
      [
        new RegExp(`${c}`),
        function* ([, color], { theme }) {
          yield {
            'box-shadow': `none !important`
          }
        }
      ] as Rule<QuasarTheme>
  ),
  ...(['z-marginals', 'z-notify', 'z-fullscreen', 'z-inherit'] as const).map(
    (c) =>
      [
        new RegExp(`${c}`),
        function* ([, color], { theme }) {
          yield {
            'z-index': c === 'z-inherit' ? 'inherit' : theme[`\$${c}`]
          }
        }
      ] as Rule<QuasarTheme>
  )
]

export default rules
