import type { Preflight, Rule } from '@unocss/core'
import type { QuasarTheme } from './theme'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
      body.body--dark
        color: #fff
        background: ${theme['$dark-page']}
    `
  }
]

const rules: Rule<QuasarTheme>[] = [
  [
    /^q-dark$/,
    function* ([, color], { theme }) {
      yield {
        color: '#fff',
        background: theme['$dark']
      }
    }
  ]
]

export default rules
