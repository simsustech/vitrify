import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
[aria-busy=true] {
  cursor: progress;
}

[aria-controls] {
  cursor: pointer;
}

[aria-disabled=true] {
  cursor: default;
}`
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^non-selectable$/, ([, c], { theme }) => `!select-none`],

  [/^scroll$/, ([, c], { theme }) => `overflow-auto`],

  [/^scroll-x$/, ([, c], { theme }) => `overflow-x-auto`],

  [/^scroll-y$/, ([, c], { theme }) => `overflow-y-auto`],

  [/^no-scroll$/, ([, c], { theme }) => `!overflow-hidden`],

  [/^no-pointer-events$/, ([, c], { theme }) => `!pointer-events-none`],

  [
    /^no-pointer-events--children$/,
    ([, c], { theme }) => `!pointer-events-none [&_*]:(!pointer-events-none)`
  ],

  [/^all-pointer-events$/, ([, c], { theme }) => ``],

  [/^cursor-inherit$/, ([, c], { theme }) => `[cursor:inherit!important]`],

  ['cursor-pointer', 'cursor-[pointer]!']
]

export { preflights, shortcuts }
