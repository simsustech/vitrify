import type { Rule } from '@unocss/core'

const rules: Rule[] = [
  [
    /^text-(.*)$/,
    function* ([, color]) {
      yield {
        text: `$${color} !important`
      }
    }
  ],
  [
    /^bg-(.*)$/,
    function* ([, color]) {
      yield {
        background: `$${color} !important`
      }
    }
  ]
]

export default rules
