import type { UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme'

const shortcuts: UserShortcuts<QuasarTheme> = [
  {
    'q-btn': `inline-flex flex-col items-stretch relative outline-0 border-0 v-middle text-14px lh-1.715em decoration-none text-inherit bg-transparent font-500 uppercase text-center w-auto h-auto cursor-default px-16px py-4px min-h-2.572em 
      [&_.q-icon]:text-[1.715em]`,
    'q-btn.disabled': 'opacity-70',
    'q-btn--actionable': 'cursor-pointer',
    'q-btn--actionable.q-btn--standard:before': `transition-shadow-duration-300 transition-shadow-opacity-1`,
    'q-btn--actionable.q-btn--standard:active:before':
      'shadow-sm shadow-black shadow-op-20',
    'q-btn--actionable.q-btn--standard.q-btn--active:before':
      'shadow-sm shadow-black shadow-op-20',
    'q-btn--no-uppercase': 'normal-case',
    'q-btn--rectangle': 'rounded-[3px]',
    'q-btn--round': 'min-w-[3em] min-h-[3em] p-0 rounded-[50%]',
    'q-btn--square': 'rounded-none',
    'q-btn--flat:before': 'rounded-none',
    'q-btn--outline:before': 'rounded-none',
    'q-btn--unelevated:before': 'shadow-none',
    'q-btn--dense':
      'min-h-[2em] p-[0.285em] [&_.on-left]:mr-1.5 [&_.on-right]:ml-1.5',
    'q-btn--dense.q-btn--round': 'min-h-[2.4em] min-w-[2.4em] p-0',
    'q-btn--fab':
      'min-h-[56px] min-w-[56px] p-4 [&_.q-icon]:text-2xl [&_.q-icon]:m-auto',
    'q-btn--fab-mini': 'min-h-[40px] min-w-[40px] p-2 [&_.q-icon]:text-2xl',
    'q-btn__content': 'transition-opacity duration-[0.3s] z-0',
    'q-btn__content--hidden': 'opacity-0 pointer-events-none',
    'q-btn__progress': 'z-0 rounded-[inherit]',
    'q-btn__progress-indicator':
      'z-[-1] -translate-x-full bg-white bg-opacity-25',
    'q-btn__progress--dark': `[&_.q-btn\_\_progress-indicator]:bg-black [&_.q-btn__progress-indicator]:bg-opacity-20`,
    'q-btn--flat': `[&_..q-btn\_\_progress-indicator]:bg-current [&_..q-btn__progress-indicator]:opacity-20`
  }
]

export { shortcuts }
