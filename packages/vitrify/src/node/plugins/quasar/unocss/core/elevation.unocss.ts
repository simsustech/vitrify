import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>

// const shadows = (mode: 'light' | 'dark'): Rule<QuasarTheme>[] => [
//   ...Array.from({ length: 24 }, (_, i) => i + 1).reduce((acc, z) => {
//     acc.push([
//       new RegExp(`shadow-${z}`),
//       ([, c], { symbols, theme }) => ({
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['shadows'][z as IntRange<0, 24>]
//       })
//     ])
//     acc.push([
//       new RegExp(`shadow-up-${z}`),
//       ([, c], { symbols, theme }) => ({
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,

//         'box-shadow': theme['shadows']['up'][z as IntRange<0, 24>]
//       })
//     ])
//     return acc
//   }, [] as Rule<QuasarTheme>[]),
//   [
//     /^inset-shadow$/,
//     function* ([, color], { symbols, theme }) {
//       yield {
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['insetShadow']
//       }
//     }
//   ] as Rule<QuasarTheme>,
//   [
//     /^inset-shadow-down$/,
//     function* ([, color], { symbols, theme }) {
//       yield {
//         [symbols.parent]: mode === 'dark' ? 'body.body--dark' : undefined,
//         'box-shadow': theme['insetShadowDown']
//       }
//     }
//   ] as Rule<QuasarTheme>
// ]

const rules: Rule<QuasarTheme>[] = [
  // [
  //   /^shadow-transition$/,
  //   function* ([, color], { theme }) {
  //     yield {
  //       transition: `${theme['shadowTransition']} !important`
  //     }
  //   }
  // ] as Rule<QuasarTheme>,
  // ...shadows('light'),
  // ...shadows('dark'),
  // ...['no-shadow', 'shadow-0'].map(
  //   (c) =>
  //     [
  //       new RegExp(`${c}`),
  //       function* ([, color], { theme }) {
  //         yield {
  //           'box-shadow': `none !important`
  //         }
  //       }
  //     ] as Rule<QuasarTheme>
  // ),
  ...(['z-marginals', 'z-notify', 'z-fullscreen', 'z-inherit'] as const).map(
    (c) =>
      [
        new RegExp(`${c}`),
        function* ([, color], { theme }) {
          const selector = c.replace('z-', '') as
            | 'marginals'
            | 'notify'
            | 'fullscreen'
          yield {
            'z-index':
              c === 'z-inherit' ? 'inherit' : theme.quasar?.['z'][selector]
          }
        }
      ] as Rule<QuasarTheme>
  )
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^shadow-none$/, ([, c], { theme }) => `shadow-none`],
  [/^no-shadow$/, ([, c], { theme }) => `shadow-none`],
  // TODO
  [/^shadow-(0?[1-9]|1[0-9]|2[0-4])$/, ([, nr], { theme }) => `shadow-md`]
]

export { rules, shortcuts }
