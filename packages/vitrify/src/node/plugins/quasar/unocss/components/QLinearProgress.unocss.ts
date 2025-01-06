import type { Preflight, Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
@keyframes q-linear-progress--indeterminate {
  0% {
    transform: translate3d(-35%, 0, 0) scale3d(0.35, 1, 1);
  }
  60% {
    transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1);
  }
  100% {
    transform: translate3d(100%, 0, 0) scale3d(0.9, 1, 1);
  }
}
@keyframes q-linear-progress--indeterminate-short {
  0% {
    transform: translate3d(-101%, 0, 0) scale3d(1, 1, 1);
  }
  60% {
    transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1);
  }
  100% {
    transform: translate3d(107%, 0, 0) scale3d(0.01, 1, 1);
  }
}
  `
  }
]

const shortcuts: UserShortcuts<QuasarTheme> = [
  [/^q-linear-progress__model$/, ([, c], { theme }) => `origin-[0_0]`],

  [
    /^q-linear-progress__track$/,
    ([, c], { theme }) => `origin-[0_0] opacity-40`
  ],

  [
    /^q-linear-progress__model--with-transition$/,
    ([, c], { theme }) =>
      `[transition:transform_var(--q-linear-progress-speed)]`
  ],

  [
    /^q-linear-progress__track--with-transition$/,
    ([, c], { theme }) =>
      `[transition:transform_var(--q-linear-progress-speed)]`
  ],

  [
    /^q-linear-progress--reverse$/,
    ([, c], { theme }) =>
      `[&_.q-linear-progress\_\_model]:(origin-[0_100%]) [&_.q-linear-progress\_\_track]:(origin-[0_100%])`
  ],

  [
    /^q-linear-progress__model--determinate$/,
    ([, c], { theme }) => `bg-current`
  ],

  [
    /^q-linear-progress__model--indeterminate$/,
    ([, c], { theme }) => `transition-none`
  ],

  [
    /^q-linear-progress__model--query$/,
    ([, c], { theme }) => `transition-none`
  ],

  [
    /^q-linear-progress__model--indeterminate:before$/,
    ([, c], { theme }) =>
      `bg-current content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] origin-[0_0] animate-[q-linear-progress--indeterminate_2.1s_cubic-bezier(0.65,_0.815,_0.735,_0.395)_infinite]`
  ],

  [
    /^q-linear-progress__model--indeterminate:after$/,
    ([, c], { theme }) =>
      `bg-current content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] origin-[0_0] [transform:translate3d(-101%,_0,_0)_scale3d(1,_1,_1)] animate-[q-linear-progress--indeterminate-short_2.1s_cubic-bezier(0.165,_0.84,_0.44,_1)_infinite] [animation-delay:1.15s]`
  ],

  [
    /^q-linear-progress__model--query:before$/,
    ([, c], { theme }) =>
      `bg-current content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] origin-[0_0] animate-[q-linear-progress--indeterminate_2.1s_cubic-bezier(0.65,_0.815,_0.735,_0.395)_infinite]`
  ],

  [
    /^q-linear-progress__model--query:after$/,
    ([, c], { theme }) =>
      `bg-current content-[''] absolute top-[0] right-[0] bottom-[0] left-[0] origin-[0_0] [transform:translate3d(-101%,_0,_0)_scale3d(1,_1,_1)] animate-[q-linear-progress--indeterminate-short_2.1s_cubic-bezier(0.165,_0.84,_0.44,_1)_infinite] [animation-delay:1.15s]`
  ],

  [
    /^q-linear-progress__track--light$/,
    ([, c], { theme }) => `bg-[rgba(0,_0,_0,_0.26)]`
  ],

  [
    /^q-linear-progress__track--dark$/,
    ([, c], { theme }) => `bg-[rgba(255,_255,_255,_0.6)]`
  ],

  [
    /^q-linear-progress__stripe$/,
    ([, c], { theme }) =>
      `!bg-[linear-gradient(_45deg,_rgba(255,_255,_255,_0.15)_25%,_rgba(255,_255,_255,_0)_25%,_rgba(255,_255,_255,_0)_50%,_rgba(255,_255,_255,_0.15)_50%,_rgba(255,_255,_255,_0.15)_75%,_rgba(255,_255,_255,_0)_75%,_rgba(255,_255,_255,_0)_)] [background-size:40px_40px!important]`
  ],

  [
    /^q-linear-progress__stripe--with-transition$/,
    ([, c], { theme }) => `[transition:width_var(--q-linear-progress-speed)]`
  ]
]

export { preflights, shortcuts }
