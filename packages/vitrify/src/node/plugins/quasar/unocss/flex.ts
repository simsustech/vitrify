import type { Preflight, Rule } from '@unocss/core'
import type { QuasarTheme } from './theme'

const gutter = {
  none: 0,
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '48px'
} as const

const cols = 12
const grid = Array.from({ length: cols + 1 }, (_, i) => i + 0)

const preflights: Preflight<QuasarTheme>[] = [
  {
    getCSS: ({ theme }) => `
${grid
  .map(
    (size) => `
.row > .col-${size}, .row > .col-xs-${size} {
  height: 'auto',
  width: ${((size / cols) * 1000).toFixed(4)}%
}
`
  )
  .join('\n')}

${grid
  .map(
    (size) => `
.row > .offset-${size}, .row > .offset-xs-${size} {
  'margin-left': ${((size / cols) * 1000).toFixed(4)}%
}
`
  )
  .join('\n')}

${grid
  .map(
    (size) => `
.column > .col-${size}, .column > .col-xs-${size} {
  'height': ${((size / cols) * 1000).toFixed(4)}%,
  width: 'auto'
}
`
  )
  .join('\n')}

['row > col-all', {
height: 'auto',
flex: '0 0 100%'
}]

${(['none', 'sm', 'md', 'lg', 'xl'] as const).map(
  (size) => `
.q-gutter-x-${size} > *, .q-gutter-${size} > * {
  margin-left: ${gutter[size]};
}
.q-gutter-y-${size} > *, .q-gutter-${size} > * {
  margin-top: 48px;
}
.q-col-gutter-x-${size} > *, .q-col-gutter-${size} > * {
  padding-left: 48px;
}
.q-col-gutter-y-${size} > *, .q-col-gutter-${size} > * {
  padding-top: 48px;
}
`
)}

@media (min-width: 0) {
  .row > .col, .flex > .col, .row > .col-auto, .flex > .col-auto, .row > .col-grow, .flex > .col-grow, .row > .col-shrink, .flex > .col-shrink, .row > .col-xs, .flex > .col-xs, .row > .col-xs-auto, .row > .col-12, .row > .col-xs-12, .row > .col-11, .row > .col-xs-11, .row > .col-10, .row > .col-xs-10, .row > .col-9, .row > .col-xs-9, .row > .col-8, .row > .col-xs-8, .row > .col-7, .row > .col-xs-7, .row > .col-6, .row > .col-xs-6, .row > .col-5, .row > .col-xs-5, .row > .col-4, .row > .col-xs-4, .row > .col-3, .row > .col-xs-3, .row > .col-2, .row > .col-xs-2, .row > .col-1, .row > .col-xs-1, .row > .col-0, .row > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .row > .col-xs-grow, .flex > .col-xs-grow, .row > .col-xs-shrink, .flex > .col-xs-shrink {
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
  .column > .col, .flex > .col, .column > .col-auto, .flex > .col-auto, .column > .col-grow, .flex > .col-grow, .column > .col-shrink, .flex > .col-shrink, .column > .col-xs, .flex > .col-xs, .column > .col-xs-auto, .column > .col-12, .column > .col-xs-12, .column > .col-11, .column > .col-xs-11, .column > .col-10, .column > .col-xs-10, .column > .col-9, .column > .col-xs-9, .column > .col-8, .column > .col-xs-8, .column > .col-7, .column > .col-xs-7, .column > .col-6, .column > .col-xs-6, .column > .col-5, .column > .col-xs-5, .column > .col-4, .column > .col-xs-4, .column > .col-3, .column > .col-xs-3, .column > .col-2, .column > .col-xs-2, .column > .col-1, .column > .col-xs-1, .column > .col-0, .column > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .column > .col-xs-grow, .flex > .col-xs-grow, .column > .col-xs-shrink, .flex > .col-xs-shrink {
    height: auto;
    min-height: 0;
    max-height: 100%;
  }
  .col, .col-xs {
    flex: 10000 1 0%;
  }
  .col-auto, .col-xs-auto, .col-12, .col-xs-12, .col-11, .col-xs-11, .col-10, .col-xs-10, .col-9, .col-xs-9, .col-8, .col-xs-8, .col-7, .col-xs-7, .col-6, .col-xs-6, .col-5, .col-xs-5, .col-4, .col-xs-4, .col-3, .col-xs-3, .col-2, .col-xs-2, .col-1, .col-xs-1, .col-0, .col-xs-0 {
    flex: 0 0 auto;
  }
  .col-grow, .col-xs-grow {
    flex: 1 0 auto;
  }
  .col-shrink, .col-xs-shrink {
    flex: 0 1 auto;
  }
  .row > .col-0, .row > .col-xs-0 {
    height: auto;
    width: 0%;
  }
  .row > .offset-0, .row > .offset-xs-0 {
    margin-left: 0%;
  }
  .column > .col-0, .column > .col-xs-0 {
    height: 0%;
    width: auto;
  }
  .row > .col-1, .row > .col-xs-1 {
    height: auto;
    width: 8.3333%;
  }
  .row > .offset-1, .row > .offset-xs-1 {
    margin-left: 8.3333%;
  }
  .column > .col-1, .column > .col-xs-1 {
    height: 8.3333%;
    width: auto;
  }
  .row > .col-2, .row > .col-xs-2 {
    height: auto;
    width: 16.6667%;
  }
  .row > .offset-2, .row > .offset-xs-2 {
    margin-left: 16.6667%;
  }
  .column > .col-2, .column > .col-xs-2 {
    height: 16.6667%;
    width: auto;
  }
  .row > .col-3, .row > .col-xs-3 {
    height: auto;
    width: 25%;
  }
  .row > .offset-3, .row > .offset-xs-3 {
    margin-left: 25%;
  }
  .column > .col-3, .column > .col-xs-3 {
    height: 25%;
    width: auto;
  }
  .row > .col-4, .row > .col-xs-4 {
    height: auto;
    width: 33.3333%;
  }
  .row > .offset-4, .row > .offset-xs-4 {
    margin-left: 33.3333%;
  }
  .column > .col-4, .column > .col-xs-4 {
    height: 33.3333%;
    width: auto;
  }
  .row > .col-5, .row > .col-xs-5 {
    height: auto;
    width: 41.6667%;
  }
  .row > .offset-5, .row > .offset-xs-5 {
    margin-left: 41.6667%;
  }
  .column > .col-5, .column > .col-xs-5 {
    height: 41.6667%;
    width: auto;
  }
  .row > .col-6, .row > .col-xs-6 {
    height: auto;
    width: 50%;
  }
  .row > .offset-6, .row > .offset-xs-6 {
    margin-left: 50%;
  }
  .column > .col-6, .column > .col-xs-6 {
    height: 50%;
    width: auto;
  }
  .row > .col-7, .row > .col-xs-7 {
    height: auto;
    width: 58.3333%;
  }
  .row > .offset-7, .row > .offset-xs-7 {
    margin-left: 58.3333%;
  }
  .column > .col-7, .column > .col-xs-7 {
    height: 58.3333%;
    width: auto;
  }
  .row > .col-8, .row > .col-xs-8 {
    height: auto;
    width: 66.6667%;
  }
  .row > .offset-8, .row > .offset-xs-8 {
    margin-left: 66.6667%;
  }
  .column > .col-8, .column > .col-xs-8 {
    height: 66.6667%;
    width: auto;
  }
  .row > .col-9, .row > .col-xs-9 {
    height: auto;
    width: 75%;
  }
  .row > .offset-9, .row > .offset-xs-9 {
    margin-left: 75%;
  }
  .column > .col-9, .column > .col-xs-9 {
    height: 75%;
    width: auto;
  }
  .row > .col-10, .row > .col-xs-10 {
    height: auto;
    width: 83.3333%;
  }
  .row > .offset-10, .row > .offset-xs-10 {
    margin-left: 83.3333%;
  }
  .column > .col-10, .column > .col-xs-10 {
    height: 83.3333%;
    width: auto;
  }
  .row > .col-11, .row > .col-xs-11 {
    height: auto;
    width: 91.6667%;
  }
  .row > .offset-11, .row > .offset-xs-11 {
    margin-left: 91.6667%;
  }
  .column > .col-11, .column > .col-xs-11 {
    height: 91.6667%;
    width: auto;
  }
  .row > .col-12, .row > .col-xs-12 {
    height: auto;
    width: 100%;
  }
  .row > .offset-12, .row > .offset-xs-12 {
    margin-left: 100%;
  }
  .column > .col-12, .column > .col-xs-12 {
    height: 100%;
    width: auto;
  }
  .row > .col-all {
    height: auto;
    flex: 0 0 100%;
  }
}
@media (min-width: 600px) {
  .row > .col-sm, .flex > .col-sm, .row > .col-sm-auto, .row > .col-sm-12, .row > .col-sm-11, .row > .col-sm-10, .row > .col-sm-9, .row > .col-sm-8, .row > .col-sm-7, .row > .col-sm-6, .row > .col-sm-5, .row > .col-sm-4, .row > .col-sm-3, .row > .col-sm-2, .row > .col-sm-1, .row > .col-sm-0, .flex > .col-sm-auto, .flex > .col-sm-12, .flex > .col-sm-11, .flex > .col-sm-10, .flex > .col-sm-9, .flex > .col-sm-8, .flex > .col-sm-7, .flex > .col-sm-6, .flex > .col-sm-5, .flex > .col-sm-4, .flex > .col-sm-3, .flex > .col-sm-2, .flex > .col-sm-1, .flex > .col-sm-0, .row > .col-sm-grow, .flex > .col-sm-grow, .row > .col-sm-shrink, .flex > .col-sm-shrink {
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
  .column > .col-sm, .flex > .col-sm, .column > .col-sm-auto, .column > .col-sm-12, .column > .col-sm-11, .column > .col-sm-10, .column > .col-sm-9, .column > .col-sm-8, .column > .col-sm-7, .column > .col-sm-6, .column > .col-sm-5, .column > .col-sm-4, .column > .col-sm-3, .column > .col-sm-2, .column > .col-sm-1, .column > .col-sm-0, .flex > .col-sm-auto, .flex > .col-sm-12, .flex > .col-sm-11, .flex > .col-sm-10, .flex > .col-sm-9, .flex > .col-sm-8, .flex > .col-sm-7, .flex > .col-sm-6, .flex > .col-sm-5, .flex > .col-sm-4, .flex > .col-sm-3, .flex > .col-sm-2, .flex > .col-sm-1, .flex > .col-sm-0, .column > .col-sm-grow, .flex > .col-sm-grow, .column > .col-sm-shrink, .flex > .col-sm-shrink {
    height: auto;
    min-height: 0;
    max-height: 100%;
  }
  .col-sm {
    flex: 10000 1 0%;
  }
  .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col-sm-0 {
    flex: 0 0 auto;
  }
  .col-sm-grow {
    flex: 1 0 auto;
  }
  .col-sm-shrink {
    flex: 0 1 auto;
  }
  .row > .col-sm-0 {
    height: auto;
    width: 0%;
  }
  .row > .offset-sm-0 {
    margin-left: 0%;
  }
  .column > .col-sm-0 {
    height: 0%;
    width: auto;
  }
  .row > .col-sm-1 {
    height: auto;
    width: 8.3333%;
  }
  .row > .offset-sm-1 {
    margin-left: 8.3333%;
  }
  .column > .col-sm-1 {
    height: 8.3333%;
    width: auto;
  }
  .row > .col-sm-2 {
    height: auto;
    width: 16.6667%;
  }
  .row > .offset-sm-2 {
    margin-left: 16.6667%;
  }
  .column > .col-sm-2 {
    height: 16.6667%;
    width: auto;
  }
  .row > .col-sm-3 {
    height: auto;
    width: 25%;
  }
  .row > .offset-sm-3 {
    margin-left: 25%;
  }
  .column > .col-sm-3 {
    height: 25%;
    width: auto;
  }
  .row > .col-sm-4 {
    height: auto;
    width: 33.3333%;
  }
  .row > .offset-sm-4 {
    margin-left: 33.3333%;
  }
  .column > .col-sm-4 {
    height: 33.3333%;
    width: auto;
  }
  .row > .col-sm-5 {
    height: auto;
    width: 41.6667%;
  }
  .row > .offset-sm-5 {
    margin-left: 41.6667%;
  }
  .column > .col-sm-5 {
    height: 41.6667%;
    width: auto;
  }
  .row > .col-sm-6 {
    height: auto;
    width: 50%;
  }
  .row > .offset-sm-6 {
    margin-left: 50%;
  }
  .column > .col-sm-6 {
    height: 50%;
    width: auto;
  }
  .row > .col-sm-7 {
    height: auto;
    width: 58.3333%;
  }
  .row > .offset-sm-7 {
    margin-left: 58.3333%;
  }
  .column > .col-sm-7 {
    height: 58.3333%;
    width: auto;
  }
  .row > .col-sm-8 {
    height: auto;
    width: 66.6667%;
  }
  .row > .offset-sm-8 {
    margin-left: 66.6667%;
  }
  .column > .col-sm-8 {
    height: 66.6667%;
    width: auto;
  }
  .row > .col-sm-9 {
    height: auto;
    width: 75%;
  }
  .row > .offset-sm-9 {
    margin-left: 75%;
  }
  .column > .col-sm-9 {
    height: 75%;
    width: auto;
  }
  .row > .col-sm-10 {
    height: auto;
    width: 83.3333%;
  }
  .row > .offset-sm-10 {
    margin-left: 83.3333%;
  }
  .column > .col-sm-10 {
    height: 83.3333%;
    width: auto;
  }
  .row > .col-sm-11 {
    height: auto;
    width: 91.6667%;
  }
  .row > .offset-sm-11 {
    margin-left: 91.6667%;
  }
  .column > .col-sm-11 {
    height: 91.6667%;
    width: auto;
  }
  .row > .col-sm-12 {
    height: auto;
    width: 100%;
  }
  .row > .offset-sm-12 {
    margin-left: 100%;
  }
  .column > .col-sm-12 {
    height: 100%;
    width: auto;
  }
}
@media (min-width: 1024px) {
  .row > .col-md, .flex > .col-md, .row > .col-md-auto, .row > .col-md-12, .row > .col-md-11, .row > .col-md-10, .row > .col-md-9, .row > .col-md-8, .row > .col-md-7, .row > .col-md-6, .row > .col-md-5, .row > .col-md-4, .row > .col-md-3, .row > .col-md-2, .row > .col-md-1, .row > .col-md-0, .flex > .col-md-auto, .flex > .col-md-12, .flex > .col-md-11, .flex > .col-md-10, .flex > .col-md-9, .flex > .col-md-8, .flex > .col-md-7, .flex > .col-md-6, .flex > .col-md-5, .flex > .col-md-4, .flex > .col-md-3, .flex > .col-md-2, .flex > .col-md-1, .flex > .col-md-0, .row > .col-md-grow, .flex > .col-md-grow, .row > .col-md-shrink, .flex > .col-md-shrink {
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
  .column > .col-md, .flex > .col-md, .column > .col-md-auto, .column > .col-md-12, .column > .col-md-11, .column > .col-md-10, .column > .col-md-9, .column > .col-md-8, .column > .col-md-7, .column > .col-md-6, .column > .col-md-5, .column > .col-md-4, .column > .col-md-3, .column > .col-md-2, .column > .col-md-1, .column > .col-md-0, .flex > .col-md-auto, .flex > .col-md-12, .flex > .col-md-11, .flex > .col-md-10, .flex > .col-md-9, .flex > .col-md-8, .flex > .col-md-7, .flex > .col-md-6, .flex > .col-md-5, .flex > .col-md-4, .flex > .col-md-3, .flex > .col-md-2, .flex > .col-md-1, .flex > .col-md-0, .column > .col-md-grow, .flex > .col-md-grow, .column > .col-md-shrink, .flex > .col-md-shrink {
    height: auto;
    min-height: 0;
    max-height: 100%;
  }
  .col-md {
    flex: 10000 1 0%;
  }
  .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-md-0 {
    flex: 0 0 auto;
  }
  .col-md-grow {
    flex: 1 0 auto;
  }
  .col-md-shrink {
    flex: 0 1 auto;
  }
  .row > .col-md-0 {
    height: auto;
    width: 0%;
  }
  .row > .offset-md-0 {
    margin-left: 0%;
  }
  .column > .col-md-0 {
    height: 0%;
    width: auto;
  }
  .row > .col-md-1 {
    height: auto;
    width: 8.3333%;
  }
  .row > .offset-md-1 {
    margin-left: 8.3333%;
  }
  .column > .col-md-1 {
    height: 8.3333%;
    width: auto;
  }
  .row > .col-md-2 {
    height: auto;
    width: 16.6667%;
  }
  .row > .offset-md-2 {
    margin-left: 16.6667%;
  }
  .column > .col-md-2 {
    height: 16.6667%;
    width: auto;
  }
  .row > .col-md-3 {
    height: auto;
    width: 25%;
  }
  .row > .offset-md-3 {
    margin-left: 25%;
  }
  .column > .col-md-3 {
    height: 25%;
    width: auto;
  }
  .row > .col-md-4 {
    height: auto;
    width: 33.3333%;
  }
  .row > .offset-md-4 {
    margin-left: 33.3333%;
  }
  .column > .col-md-4 {
    height: 33.3333%;
    width: auto;
  }
  .row > .col-md-5 {
    height: auto;
    width: 41.6667%;
  }
  .row > .offset-md-5 {
    margin-left: 41.6667%;
  }
  .column > .col-md-5 {
    height: 41.6667%;
    width: auto;
  }
  .row > .col-md-6 {
    height: auto;
    width: 50%;
  }
  .row > .offset-md-6 {
    margin-left: 50%;
  }
  .column > .col-md-6 {
    height: 50%;
    width: auto;
  }
  .row > .col-md-7 {
    height: auto;
    width: 58.3333%;
  }
  .row > .offset-md-7 {
    margin-left: 58.3333%;
  }
  .column > .col-md-7 {
    height: 58.3333%;
    width: auto;
  }
  .row > .col-md-8 {
    height: auto;
    width: 66.6667%;
  }
  .row > .offset-md-8 {
    margin-left: 66.6667%;
  }
  .column > .col-md-8 {
    height: 66.6667%;
    width: auto;
  }
  .row > .col-md-9 {
    height: auto;
    width: 75%;
  }
  .row > .offset-md-9 {
    margin-left: 75%;
  }
  .column > .col-md-9 {
    height: 75%;
    width: auto;
  }
  .row > .col-md-10 {
    height: auto;
    width: 83.3333%;
  }
  .row > .offset-md-10 {
    margin-left: 83.3333%;
  }
  .column > .col-md-10 {
    height: 83.3333%;
    width: auto;
  }
  .row > .col-md-11 {
    height: auto;
    width: 91.6667%;
  }
  .row > .offset-md-11 {
    margin-left: 91.6667%;
  }
  .column > .col-md-11 {
    height: 91.6667%;
    width: auto;
  }
  .row > .col-md-12 {
    height: auto;
    width: 100%;
  }
  .row > .offset-md-12 {
    margin-left: 100%;
  }
  .column > .col-md-12 {
    height: 100%;
    width: auto;
  }
}
@media (min-width: 1440px) {
  .row > .col-lg, .flex > .col-lg, .row > .col-lg-auto, .row > .col-lg-12, .row > .col-lg-11, .row > .col-lg-10, .row > .col-lg-9, .row > .col-lg-8, .row > .col-lg-7, .row > .col-lg-6, .row > .col-lg-5, .row > .col-lg-4, .row > .col-lg-3, .row > .col-lg-2, .row > .col-lg-1, .row > .col-lg-0, .flex > .col-lg-auto, .flex > .col-lg-12, .flex > .col-lg-11, .flex > .col-lg-10, .flex > .col-lg-9, .flex > .col-lg-8, .flex > .col-lg-7, .flex > .col-lg-6, .flex > .col-lg-5, .flex > .col-lg-4, .flex > .col-lg-3, .flex > .col-lg-2, .flex > .col-lg-1, .flex > .col-lg-0, .row > .col-lg-grow, .flex > .col-lg-grow, .row > .col-lg-shrink, .flex > .col-lg-shrink {
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
  .column > .col-lg, .flex > .col-lg, .column > .col-lg-auto, .column > .col-lg-12, .column > .col-lg-11, .column > .col-lg-10, .column > .col-lg-9, .column > .col-lg-8, .column > .col-lg-7, .column > .col-lg-6, .column > .col-lg-5, .column > .col-lg-4, .column > .col-lg-3, .column > .col-lg-2, .column > .col-lg-1, .column > .col-lg-0, .flex > .col-lg-auto, .flex > .col-lg-12, .flex > .col-lg-11, .flex > .col-lg-10, .flex > .col-lg-9, .flex > .col-lg-8, .flex > .col-lg-7, .flex > .col-lg-6, .flex > .col-lg-5, .flex > .col-lg-4, .flex > .col-lg-3, .flex > .col-lg-2, .flex > .col-lg-1, .flex > .col-lg-0, .column > .col-lg-grow, .flex > .col-lg-grow, .column > .col-lg-shrink, .flex > .col-lg-shrink {
    height: auto;
    min-height: 0;
    max-height: 100%;
  }
  .col-lg {
    flex: 10000 1 0%;
  }
  .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-lg-0 {
    flex: 0 0 auto;
  }
  .col-lg-grow {
    flex: 1 0 auto;
  }
  .col-lg-shrink {
    flex: 0 1 auto;
  }
  .row > .col-lg-0 {
    height: auto;
    width: 0%;
  }
  .row > .offset-lg-0 {
    margin-left: 0%;
  }
  .column > .col-lg-0 {
    height: 0%;
    width: auto;
  }
  .row > .col-lg-1 {
    height: auto;
    width: 8.3333%;
  }
  .row > .offset-lg-1 {
    margin-left: 8.3333%;
  }
  .column > .col-lg-1 {
    height: 8.3333%;
    width: auto;
  }
  .row > .col-lg-2 {
    height: auto;
    width: 16.6667%;
  }
  .row > .offset-lg-2 {
    margin-left: 16.6667%;
  }
  .column > .col-lg-2 {
    height: 16.6667%;
    width: auto;
  }
  .row > .col-lg-3 {
    height: auto;
    width: 25%;
  }
  .row > .offset-lg-3 {
    margin-left: 25%;
  }
  .column > .col-lg-3 {
    height: 25%;
    width: auto;
  }
  .row > .col-lg-4 {
    height: auto;
    width: 33.3333%;
  }
  .row > .offset-lg-4 {
    margin-left: 33.3333%;
  }
  .column > .col-lg-4 {
    height: 33.3333%;
    width: auto;
  }
  .row > .col-lg-5 {
    height: auto;
    width: 41.6667%;
  }
  .row > .offset-lg-5 {
    margin-left: 41.6667%;
  }
  .column > .col-lg-5 {
    height: 41.6667%;
    width: auto;
  }
  .row > .col-lg-6 {
    height: auto;
    width: 50%;
  }
  .row > .offset-lg-6 {
    margin-left: 50%;
  }
  .column > .col-lg-6 {
    height: 50%;
    width: auto;
  }
  .row > .col-lg-7 {
    height: auto;
    width: 58.3333%;
  }
  .row > .offset-lg-7 {
    margin-left: 58.3333%;
  }
  .column > .col-lg-7 {
    height: 58.3333%;
    width: auto;
  }
  .row > .col-lg-8 {
    height: auto;
    width: 66.6667%;
  }
  .row > .offset-lg-8 {
    margin-left: 66.6667%;
  }
  .column > .col-lg-8 {
    height: 66.6667%;
    width: auto;
  }
  .row > .col-lg-9 {
    height: auto;
    width: 75%;
  }
  .row > .offset-lg-9 {
    margin-left: 75%;
  }
  .column > .col-lg-9 {
    height: 75%;
    width: auto;
  }
  .row > .col-lg-10 {
    height: auto;
    width: 83.3333%;
  }
  .row > .offset-lg-10 {
    margin-left: 83.3333%;
  }
  .column > .col-lg-10 {
    height: 83.3333%;
    width: auto;
  }
  .row > .col-lg-11 {
    height: auto;
    width: 91.6667%;
  }
  .row > .offset-lg-11 {
    margin-left: 91.6667%;
  }
  .column > .col-lg-11 {
    height: 91.6667%;
    width: auto;
  }
  .row > .col-lg-12 {
    height: auto;
    width: 100%;
  }
  .row > .offset-lg-12 {
    margin-left: 100%;
  }
  .column > .col-lg-12 {
    height: 100%;
    width: auto;
  }
}
@media (min-width: 1920px) {
  .row > .col-xl, .flex > .col-xl, .row > .col-xl-auto, .row > .col-xl-12, .row > .col-xl-11, .row > .col-xl-10, .row > .col-xl-9, .row > .col-xl-8, .row > .col-xl-7, .row > .col-xl-6, .row > .col-xl-5, .row > .col-xl-4, .row > .col-xl-3, .row > .col-xl-2, .row > .col-xl-1, .row > .col-xl-0, .flex > .col-xl-auto, .flex > .col-xl-12, .flex > .col-xl-11, .flex > .col-xl-10, .flex > .col-xl-9, .flex > .col-xl-8, .flex > .col-xl-7, .flex > .col-xl-6, .flex > .col-xl-5, .flex > .col-xl-4, .flex > .col-xl-3, .flex > .col-xl-2, .flex > .col-xl-1, .flex > .col-xl-0, .row > .col-xl-grow, .flex > .col-xl-grow, .row > .col-xl-shrink, .flex > .col-xl-shrink {
    width: auto;
    min-width: 0;
    max-width: 100%;
  }
  .column > .col-xl, .flex > .col-xl, .column > .col-xl-auto, .column > .col-xl-12, .column > .col-xl-11, .column > .col-xl-10, .column > .col-xl-9, .column > .col-xl-8, .column > .col-xl-7, .column > .col-xl-6, .column > .col-xl-5, .column > .col-xl-4, .column > .col-xl-3, .column > .col-xl-2, .column > .col-xl-1, .column > .col-xl-0, .flex > .col-xl-auto, .flex > .col-xl-12, .flex > .col-xl-11, .flex > .col-xl-10, .flex > .col-xl-9, .flex > .col-xl-8, .flex > .col-xl-7, .flex > .col-xl-6, .flex > .col-xl-5, .flex > .col-xl-4, .flex > .col-xl-3, .flex > .col-xl-2, .flex > .col-xl-1, .flex > .col-xl-0, .column > .col-xl-grow, .flex > .col-xl-grow, .column > .col-xl-shrink, .flex > .col-xl-shrink {
    height: auto;
    min-height: 0;
    max-height: 100%;
  }
  .col-xl {
    flex: 10000 1 0%;
  }
  .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-xl-0 {
    flex: 0 0 auto;
  }
  .col-xl-grow {
    flex: 1 0 auto;
  }
  .col-xl-shrink {
    flex: 0 1 auto;
  }
  .row > .col-xl-0 {
    height: auto;
    width: 0%;
  }
  .row > .offset-xl-0 {
    margin-left: 0%;
  }
  .column > .col-xl-0 {
    height: 0%;
    width: auto;
  }
  .row > .col-xl-1 {
    height: auto;
    width: 8.3333%;
  }
  .row > .offset-xl-1 {
    margin-left: 8.3333%;
  }
  .column > .col-xl-1 {
    height: 8.3333%;
    width: auto;
  }
  .row > .col-xl-2 {
    height: auto;
    width: 16.6667%;
  }
  .row > .offset-xl-2 {
    margin-left: 16.6667%;
  }
  .column > .col-xl-2 {
    height: 16.6667%;
    width: auto;
  }
  .row > .col-xl-3 {
    height: auto;
    width: 25%;
  }
  .row > .offset-xl-3 {
    margin-left: 25%;
  }
  .column > .col-xl-3 {
    height: 25%;
    width: auto;
  }
  .row > .col-xl-4 {
    height: auto;
    width: 33.3333%;
  }
  .row > .offset-xl-4 {
    margin-left: 33.3333%;
  }
  .column > .col-xl-4 {
    height: 33.3333%;
    width: auto;
  }
  .row > .col-xl-5 {
    height: auto;
    width: 41.6667%;
  }
  .row > .offset-xl-5 {
    margin-left: 41.6667%;
  }
  .column > .col-xl-5 {
    height: 41.6667%;
    width: auto;
  }
  .row > .col-xl-6 {
    height: auto;
    width: 50%;
  }
  .row > .offset-xl-6 {
    margin-left: 50%;
  }
  .column > .col-xl-6 {
    height: 50%;
    width: auto;
  }
  .row > .col-xl-7 {
    height: auto;
    width: 58.3333%;
  }
  .row > .offset-xl-7 {
    margin-left: 58.3333%;
  }
  .column > .col-xl-7 {
    height: 58.3333%;
    width: auto;
  }
  .row > .col-xl-8 {
    height: auto;
    width: 66.6667%;
  }
  .row > .offset-xl-8 {
    margin-left: 66.6667%;
  }
  .column > .col-xl-8 {
    height: 66.6667%;
    width: auto;
  }
  .row > .col-xl-9 {
    height: auto;
    width: 75%;
  }
  .row > .offset-xl-9 {
    margin-left: 75%;
  }
  .column > .col-xl-9 {
    height: 75%;
    width: auto;
  }
  .row > .col-xl-10 {
    height: auto;
    width: 83.3333%;
  }
  .row > .offset-xl-10 {
    margin-left: 83.3333%;
  }
  .column > .col-xl-10 {
    height: 83.3333%;
    width: auto;
  }
  .row > .col-xl-11 {
    height: auto;
    width: 91.6667%;
  }
  .row > .offset-xl-11 {
    margin-left: 91.6667%;
  }
  .column > .col-xl-11 {
    height: 91.6667%;
    width: auto;
  }
  .row > .col-xl-12 {
    height: auto;
    width: 100%;
  }
  .row > .offset-xl-12 {
    margin-left: 100%;
  }
  .column > .col-xl-12 {
    height: 100%;
    width: auto;
  }
}
  `
  }
]

const general: Rule<QuasarTheme>[] = [
  ...(['row', 'column', 'flex'] as const).map(
    (c) =>
      [
        new RegExp(`${c}`),
        function* ([, color], { theme, symbols }) {
          yield {
            display: 'flex',
            'flex-wrap': 'wrap'
          }
          yield {
            [symbols.selector]: (selector) => `${selector}.inline`,
            display: 'inline-flex'
          }
        }
      ] as Rule<QuasarTheme>
  ),
  [
    'row-reverse',
    {
      'flex-direction': 'row-reverse'
    }
  ],
  [
    new RegExp('column'),
    function* ([, color], { theme, symbols }) {
      yield {
        'flex-direction': 'column'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}.reverse`,
        'flex-direction': 'column-reverse'
      }
    }
  ],
  [
    new RegExp('wrap'),
    function* ([, color], { theme, symbols }) {
      yield {
        'flex-wrap': 'wrap'
      }
      yield {
        [symbols.selector]: (selector) => `no-${selector}`,
        'flex-wrap': 'no-wrap'
      }
      yield {
        [symbols.selector]: (selector) => `reverse-${selector}`,
        'flex-wrap': 'reverse-wrap'
      }
    }
  ],
  [
    new RegExp('order'),
    function* ([, color], { theme, symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}-first`,
        order: -10000
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-last`,
        order: 10000
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-none`,
        order: 'none'
      }
    }
  ],
  [
    'flex-center',
    {
      'justify-content': 'center',
      'align-items': 'center'
    }
  ] as Rule<QuasarTheme>,
  [
    new RegExp('justify'),
    function* ([, color], { theme, symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}-start`,
        'justify-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-end`,
        'justify-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-center`,
        'justify-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-between`,
        'justify-content': 'space-between'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-around`,
        'justify-content': 'space-around'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-evenly`,
        'justify-content': 'space-evenly'
      }
    }
  ],
  [
    new RegExp('items'),
    function* ([, color], { theme, symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}-start`,
        'align-items': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-end`,
        'align-items': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-center`,
        'align-items': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-baseline`,
        'align-items': 'baseline'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-stretch`,
        'align-items': 'stretch'
      }
    }
  ],
  [
    new RegExp('content'),
    function* ([, color], { theme, symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}-start`,
        'align-content': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-end`,
        'align-content': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-center`,
        'align-content': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-stretch`,
        'align-content': 'stretch'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-between`,
        'align-content': 'space-between'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-around`,
        'align-content': 'space-around'
      }
    }
  ] as Rule<QuasarTheme>,
  [
    new RegExp('self'),
    function* ([, color], { theme, symbols }) {
      yield {
        [symbols.selector]: (selector) => `${selector}-start`,
        'align-self': 'flex-start'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-end`,
        'align-self': 'flex-end'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-center`,
        'align-self': 'center'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-baseline`,
        'align-self': 'baseline'
      }
      yield {
        [symbols.selector]: (selector) => `${selector}-stretch`,
        'align-self': 'stretch'
      }
    }
  ] as Rule<QuasarTheme>,
  // [
  //   new RegExp('^q-gutter-(x|y)-(none|xs|sm|md|lg|xl)$'),
  //   function* ([, direction, size], { theme, symbols }) {
  //     const d = direction as 'x' | 'y'
  //     const s = size as 'none' | 'sm' | 'md' | 'lg' | 'xl'

  //     yield {
  //       'margin-left': d === 'x' ? `-${gutter[s]}` : undefined,
  //       'margin-top': d === 'y' ? `-${gutter[s]}` : undefined
  //     }
  //     yield {
  //       [symbols.selector]: (selector) => `${selector} > *`,
  //       'margin-left': d === 'x' ? `${gutter[s]}` : undefined,
  //       'margin-top': d === 'y' ? `${gutter[s]}` : undefined
  //     }
  //   }
  // ] as Rule<QuasarTheme>,
  // [
  //   new RegExp('^q-col-gutter-(x|y)-(none|xs|sm|md|lg|xl)$'),
  //   function* ([, direction, size], { theme, symbols }) {
  //     const d = direction as 'x' | 'y'
  //     const s = size as 'none' | 'sm' | 'md' | 'lg' | 'xl'

  //     yield {
  //       'margin-left': d === 'x' ? `-${gutter[s]}` : undefined,
  //       'margin-top': d === 'y' ? `-${gutter[s]}` : undefined
  //     }
  //     yield {
  //       [symbols.selector]: (selector) => `${selector} > *`,
  //       'padding-left': d === 'x' ? `${gutter[s]}` : undefined,
  //       'padding-top': d === 'y' ? `${gutter[s]}` : undefined
  //     }
  //   }
  // ] as Rule<QuasarTheme>,
  // [
  //   new RegExp('^(row|column)$'),
  //   function* ([, direction, size], { theme, symbols }) {
  //     const d = direction as 'x' | 'y'
  //     const s = size as 'none' | 'sm' | 'md' | 'lg' | 'xl'

  //     yield {
  //       [symbols.selector]: (selector) =>
  //         `${selector} > .col, .flex > .col, .row > .col-auto, .flex > .col-auto, .row > .col-grow, .flex > .col-grow, .row > .col-shrink, .flex > .col-shrink, .row > .col-xs, .flex > .col-xs, .row > .col-xs-auto, .row > .col-12, .row > .col-xs-12, .row > .col-11, .row > .col-xs-11, .row > .col-10, .row > .col-xs-10, .row > .col-9, .row > .col-xs-9, .row > .col-8, .row > .col-xs-8, .row > .col-7, .row > .col-xs-7, .row > .col-6, .row > .col-xs-6, .row > .col-5, .row > .col-xs-5, .row > .col-4, .row > .col-xs-4, .row > .col-3, .row > .col-xs-3, .row > .col-2, .row > .col-xs-2, .row > .col-1, .row > .col-xs-1, .row > .col-0, .row > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .row > .col-xs-grow, .flex > .col-xs-grow, .row > .col-xs-shrink, .flex > .col-xs-shrink`,
  //       width: 'auto',
  //       'min-width': 0,
  //       'max-width': '100%'
  //     }
  //     yield {
  //       [symbols.selector]: (selector) =>
  //         `${selector}      > .col, .flex > .col, .column > .col-auto, .flex > .col-auto, .column > .col-grow, .flex > .col-grow, .column > .col-shrink, .flex > .col-shrink, .column > .col-xs, .flex > .col-xs, .column > .col-xs-auto, .column > .col-12, .column > .col-xs-12, .column > .col-11, .column > .col-xs-11, .column > .col-10, .column > .col-xs-10, .column > .col-9, .column > .col-xs-9, .column > .col-8, .column > .col-xs-8, .column > .col-7, .column > .col-xs-7, .column > .col-6, .column > .col-xs-6, .column > .col-5, .column > .col-xs-5, .column > .col-4, .column > .col-xs-4, .column > .col-3, .column > .col-xs-3, .column > .col-2, .column > .col-xs-2, .column > .col-1, .column > .col-xs-1, .column > .col-0, .column > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .column > .col-xs-grow, .flex > .col-xs-grow, .column > .col-xs-shrink, .flex > .col-xs-shrink`,
  //       height: 'auto',
  //       'min-height': 0,
  //       'max-height': '100%'
  //     }
  //   }
  // ] as Rule<QuasarTheme>,
  ...['col', 'col-xs'].map(
    (c) =>
      [
        c,
        {
          flex: '10000 1 0%;'
        }
      ] as Rule<QuasarTheme>
  ),
  ...['auto', ...grid].reduce((acc, c) => {
    acc.push([
      `col-${c}`,
      {
        flex: '0 0 auto'
      }
    ])
    acc.push([
      `col-xs-${c}`,
      {
        flex: '0 0 auto'
      }
    ])
    return acc
  }, [] as Rule<QuasarTheme>[]),
  ...['col-grow', 'col-xs-grow'].map(
    (c) =>
      [
        c,
        {
          flex: '1 0 auto'
        }
      ] as Rule<QuasarTheme>
  ),
  ...['col-shrink', 'col-xs-shrink'].map(
    (c) =>
      [
        c,
        {
          flex: '0 1 auto'
        }
      ] as Rule<QuasarTheme>
  )
  // ...grid.map(size => [
  //   new RegExp(`^row > .col-${size}, .row > .col-xs-${size}$`),
  //   () => ({
  //     height: 'auto',
  //     width: `${(size / cols * 1000).toFixed(4)}%`
  //   })
  // ] as Rule<QuasarTheme>,
  // ),
  // ...grid.map(size => [
  //   new RegExp(`^row > .offset-${size}, .row > .offset-xs-${size}$`),
  //   () => ({
  //     'margin-left': `${(size / cols * 1000).toFixed(4)}%`
  //   })
  // ] as Rule<QuasarTheme>,
  // ),
  // ...grid.map(size => [
  //   new RegExp(`^column > .col-${size}, .column > .col-xs-${size}$`),
  //   () => ({
  //     'height': `${(size / cols * 1000).toFixed(4)}%`,
  //     width: 'auto'
  //   })
  // ] as Rule<QuasarTheme>,
  // ),
  // ['row > col-all', {
  //   height: 'auto',
  //   flex: '0 0 100%'
  // }]
  // ...grid.map(
  //   (size) =>
  //     [
  //       new RegExp('^(row|column)$'),
  //       function* ([, direction, size], { theme, symbols }) {
  //         const d = direction as 'x' | 'y'
  //         const s = size as 'none' | 'sm' | 'md' | 'lg' | 'xl'

  //         yield {
  //           [symbols.selector]: (selector) =>
  //             `${selector} > .col, .flex > .col, .row > .col-auto, .flex > .col-auto, .row > .col-grow, .flex > .col-grow, .row > .col-shrink, .flex > .col-shrink, .row > .col-xs, .flex > .col-xs, .row > .col-xs-auto, .row > .col-12, .row > .col-xs-12, .row > .col-11, .row > .col-xs-11, .row > .col-10, .row > .col-xs-10, .row > .col-9, .row > .col-xs-9, .row > .col-8, .row > .col-xs-8, .row > .col-7, .row > .col-xs-7, .row > .col-6, .row > .col-xs-6, .row > .col-5, .row > .col-xs-5, .row > .col-4, .row > .col-xs-4, .row > .col-3, .row > .col-xs-3, .row > .col-2, .row > .col-xs-2, .row > .col-1, .row > .col-xs-1, .row > .col-0, .row > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .row > .col-xs-grow, .flex > .col-xs-grow, .row > .col-xs-shrink, .flex > .col-xs-shrink`,
  //           width: 'auto',
  //           'min-width': 0,
  //           'max-width': '100%'
  //         }
  //         yield {
  //           [symbols.selector]: (selector) =>
  //             `${selector}      > .col, .flex > .col, .column > .col-auto, .flex > .col-auto, .column > .col-grow, .flex > .col-grow, .column > .col-shrink, .flex > .col-shrink, .column > .col-xs, .flex > .col-xs, .column > .col-xs-auto, .column > .col-12, .column > .col-xs-12, .column > .col-11, .column > .col-xs-11, .column > .col-10, .column > .col-xs-10, .column > .col-9, .column > .col-xs-9, .column > .col-8, .column > .col-xs-8, .column > .col-7, .column > .col-xs-7, .column > .col-6, .column > .col-xs-6, .column > .col-5, .column > .col-xs-5, .column > .col-4, .column > .col-xs-4, .column > .col-3, .column > .col-xs-3, .column > .col-2, .column > .col-xs-2, .column > .col-1, .column > .col-xs-1, .column > .col-0, .column > .col-xs-0, .flex > .col-xs-auto, .flex > .col-12, .flex > .col-xs-12, .flex > .col-11, .flex > .col-xs-11, .flex > .col-10, .flex > .col-xs-10, .flex > .col-9, .flex > .col-xs-9, .flex > .col-8, .flex > .col-xs-8, .flex > .col-7, .flex > .col-xs-7, .flex > .col-6, .flex > .col-xs-6, .flex > .col-5, .flex > .col-xs-5, .flex > .col-4, .flex > .col-xs-4, .flex > .col-3, .flex > .col-xs-3, .flex > .col-2, .flex > .col-xs-2, .flex > .col-1, .flex > .col-xs-1, .flex > .col-0, .flex > .col-xs-0, .column > .col-xs-grow, .flex > .col-xs-grow, .column > .col-xs-shrink, .flex > .col-xs-shrink`,
  //           height: 'auto',
  //           'min-height': 0,
  //           'max-height': '100%'
  //         }
  //       }
  //     ] as Rule<QuasarTheme>
  // )
]

const rules: Rule<QuasarTheme>[] = [...general]

export default rules
