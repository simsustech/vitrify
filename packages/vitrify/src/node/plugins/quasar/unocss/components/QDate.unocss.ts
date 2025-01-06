import type { Rule, UserShortcuts } from '@unocss/core'
import type { QuasarTheme } from '../theme.js'

const shortcuts: UserShortcuts<QuasarTheme> = [
  [
    /^q-date$/,
    ([, c], { theme }) => `
      inline-flex shadow-sm border-rd-4px bg-white w-290px min-w-290px max-w-full
    `
  ],
  [
    /^q-date--bordered$/,
    ([, c], { theme }) => `
      border-solid border-1px border-black border-op-12
    `
  ],
  [
    /^q-date__header$/,
    ([, c], { theme }) => `
      border-t-inherit text-white bg-primary p-16px
    `
  ],
  [
    /^q-date__actions$/,
    ([, c], { theme }) => `
      pt-0 pl-16px pr-16px pb-16px
    `
  ],
  [
    /^q-date__content$/,
    ([, c], { theme }) => `
      outline-0
      [&_.q-btn]:(font-normal)
    `
  ],
  [
    /^q-date__main$/,
    ([, c], { theme }) => `
      outline-0
    `
  ],
  [
    /^q-date__header-link$/,
    ([, c], { theme }) => `
      op-64 outline-0 transition-[opacity]-300
      [&:hover]:(op-100)
      [&:focus]:(op-100)

    `
  ],
  [
    /^q-date__header-link--active$/,
    ([, c], { theme }) => `
      op-100
    `
  ],
  [
    /^q-date__header-subtitle$/,
    ([, c], { theme }) => `
      text-14px lh-1.75 tracking-0.00938em
    `
  ],
  [
    /^q-date__header-title-label$/,
    ([, c], { theme }) => `
      text-24px lh-1.2 tracking-0.00735em
    `
  ],
  [
    /^q-date__view$/,
    ([, c], { theme }) => `
      h-full w-full min-h-290px p-16px
    `
  ],
  [
    /^q-date__navigation$/,
    ([, c], { theme }) => `
      h-12.5%
      [&>div:first-child]:(w-8% min-w-24px justify-end)
      [&>div:last-child]:(w-8% min-w-24px justify-start)
    `
  ],
  [
    /^q-date__calendar-weekdays$/,
    ([, c], { theme }) => `
      h-12.5%
      [&>div]:(op-38 text-12px)
    `
  ],
  [
    /^q-date__calendar-item$/,
    ([, c], { theme }) => `
      inline-flex items-center justify-center v-middle w-14.285%! h-12.5%! relative p-1px
      [&:after]:(content-[''] absolute pointer-events-none top-1px right-0 bottom-1px left-0 border-dashed border-transparent border-1px)
      [&>div]:(w-30px h-30px border-rd-50% lh-30px text-center)
      [&_button]:(w-30px h-30px border-rd-50% lh-22px)

    `
  ],
  [
    /^q-date__calendar-item--out$/,
    ([, c], { theme }) => `
      op-18
    `
  ],
  [
    /^q-date__calendar-item--fill$/,
    ([, c], { theme }) => `
      invisible
    `
  ],
  [
    /^q-date__range$/,
    ([, c], { theme }) => `
      [&:before]:(content-[''] bg-current absolute top-1px bottom-1px left-0 right-0 op-30)
      [&:nth-child(7n-6):before]:(border-t-0 border-b-0)
      [&:nth-child(7n):before]:(border-t-0 border-b-0)
    `
  ],
  [
    /^q-date__range-from$/,
    ([, c], { theme }) => `
      [&:before]:(content-[''] bg-current absolute top-1px bottom-1px left-0 right-0 op-30 left-50%)
      [&:nth-child(7n-6):before]:(border-t-0 border-b-0)
      [&:nth-child(7n):before]:(border-t-0 border-b-0)
    `
  ],
  [
    /^q-date__range-to$/,
    ([, c], { theme }) => `
      [&:before]:(content-[''] bg-current absolute top-1px bottom-1px left-0 right-0 op-30 right-50%)
      [&:nth-child(7n-6):before]:(border-t-0 border-b-0)
      [&:nth-child(7n):before]:(border-t-0 border-b-0)
    `
  ],
  [
    /^q-date__edit-range$/,
    ([, c], { theme }) => `
      [&:after]:(border-current border-transparent)
      [&:nth-child(7n-6):after]:(border-t-0 border-b-0)
      [&:nth-child(7n):after]:(border-t-0 border-b-0)
    `
  ],
  [
    /^q-date__edit-range-from$/,
    ([, c], { theme }) => `
      [&:after]:(left-4px border-l-current border-t-current border-b-current border-t-28px border-b-28px)
    `
  ],
  [
    /^q-date__edit-range-from-to$/,
    ([, c], { theme }) => `
      [&:after]:(left-4px right-4px border-l-current border-r-current border-t-current border-b-current border-t-28px border-b-28px)
    `
  ],
  [
    /^q-date__edit-range-to$/,
    ([, c], { theme }) => `
      [&:after]:(right-4px border-r-current border-t-current border-b-current border-t-28px border-b-28px)
    `
  ],
  [
    /^q-date__calendar-days-container$/,
    ([, c], { theme }) => `
      h-75% min-h-192px
    `
  ],
  [
    /^q-date__calendar-days$/,
    ([, c], { theme }) => `
      [&>div]:(h-16.66%!)
    `
  ],
  [
    /^q-date__event$/,
    ([, c], { theme }) => `
      absolute bottom-2px left-50% h-5px w-8px border-rd-5px bg-primary translate-x-50%
    `
  ],
  [
    /^q-date__today$/,
    ([, c], { theme }) => `
      shadow-sm
    `
  ],
  [
    /^q-date__years-content$/,
    ([, c], { theme }) => `
      px-8px py-0 
    `
  ],
  [
    /^q-date__years-item$/,
    ([, c], { theme }) => `
      flex-[0_0_33.3333%]
    `
  ],
  [
    /^q-date__months-item$/,
    ([, c], { theme }) => `
      flex-[0_0_33.3333%]
    `
  ],
  [
    /^q-date.disabled$/,
    ([, c], { theme }) => `
      [&_.q-date\_\_header]:(pointer-events-none)
      [&_.q-date\_\_content]:(pointer-events-none)
    `
  ],
  [
    /^q-date--readonly$/,
    ([, c], { theme }) => `
      [&_.q-date\_\_header]:(pointer-events-none)
      [&_.q-date\_\_content]:(pointer-events-none)
      [&_.q-date\_\_navigation]:(hidden)
    `
  ],
  [
    /^q-date--portrait$/,
    ([, c], { theme }) => `
      flex-col
    `
  ],
  [
    /^q-date--portrait-standard$/,
    ([, c], { theme }) => `
      [&_.q-date\_\_content]:(h-[calc(100%-86px)])
      [&_.q-date\_\_header]:(border-t-inherit h-86px)
      [&_.q-date\_\_header-title]:(items-center h-30px)

    `
  ],
  [
    /^q-date--portrait-minimal$/,
    ([, c], { theme }) => `
      [&_.q-date\_\_content]:(h-full)
    `
  ],
  [
    /^q-date--landscape$/,
    ([, c], { theme }) => `
      flex-row items-stretch min-w-420px
      [&>div]:(flex flex-col)
      [&_.q-date\_\_content]:(h-full)
    `
  ],
  [
    /^q-date--landscape-standard$/,
    ([, c], { theme }) => `
      min-w-420px
      [&_.q-date\_\_header]:(border-b-inherit min-w-110px w-110px)
      [&_.q-date\_\_header-title]:(flex-col)
      [&_.q-date\_\_header-today]:(mt-12px ml--8px)
    `
  ],
  [
    /^q-date--landscape-minimal$/,
    ([, c], { theme }) => `
      w-310px
    `
  ],
  [
    /^q-date--dark$/,
    ([, c], { theme }) => `
      shadow-sm border-color-white border-op-28
    `
  ]
]

export { shortcuts }
