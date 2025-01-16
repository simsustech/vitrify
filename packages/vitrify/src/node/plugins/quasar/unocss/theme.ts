import { type QuasarPresetOptions } from './index.js'

export interface QuasarTheme {
  colors: {
    primary: string
    secondary: string
    accent: string

    positive: string
    negative: string
    info: string
    warning: string

    'dark-page': string
    'q-dark': string

    red: string
    'red-1 ': string
    'red-2 ': string
    'red-3 ': string
    'red-4 ': string
    'red-5 ': string
    'red-6 ': string
    'red-7 ': string
    'red-8 ': string
    'red-9 ': string
    'red-10 ': string
    'red-11 ': string
    'red-12 ': string
    'red-13 ': string
    'red-14 ': string
    'pink ': string
    'pink-1 ': string
    'pink-2 ': string
    'pink-3 ': string
    'pink-4 ': string
    'pink-5 ': string
    'pink-6 ': string
    'pink-7 ': string
    'pink-8 ': string
    'pink-9 ': string
    'pink-10 ': string
    'pink-11 ': string
    'pink-12 ': string
    'pink-13 ': string
    'pink-14 ': string
    'purple ': string
    'purple-1 ': string
    'purple-2 ': string
    'purple-3 ': string
    'purple-4 ': string
    'purple-5 ': string
    'purple-6 ': string
    'purple-7 ': string
    'purple-8 ': string
    'purple-9 ': string
    'purple-10 ': string
    'purple-11 ': string
    'purple-12 ': string
    'purple-13 ': string
    'purple-14 ': string
    'deep-purple ': string
    'deep-purple-1 ': string
    'deep-purple-2 ': string
    'deep-purple-3 ': string
    'deep-purple-4 ': string
    'deep-purple-5 ': string
    'deep-purple-6 ': string
    'deep-purple-7 ': string
    'deep-purple-8 ': string
    'deep-purple-9 ': string
    'deep-purple-10 ': string
    'deep-purple-11 ': string
    'deep-purple-12 ': string
    'deep-purple-13 ': string
    'deep-purple-14 ': string
    'indigo ': string
    'indigo-1 ': string
    'indigo-2 ': string
    'indigo-3 ': string
    'indigo-4 ': string
    'indigo-5 ': string
    'indigo-6 ': string
    'indigo-7 ': string
    'indigo-8 ': string
    'indigo-9 ': string
    'indigo-10 ': string
    'indigo-11 ': string
    'indigo-12 ': string
    'indigo-13 ': string
    'indigo-14 ': string
    'blue ': string
    'blue-1 ': string
    'blue-2 ': string
    'blue-3 ': string
    'blue-4 ': string
    'blue-5 ': string
    'blue-6 ': string
    'blue-7 ': string
    'blue-8 ': string
    'blue-9 ': string
    'blue-10 ': string
    'blue-11 ': string
    'blue-12 ': string
    'blue-13 ': string
    'blue-14 ': string
    'light-blue ': string
    'light-blue-1 ': string
    'light-blue-2 ': string
    'light-blue-3 ': string
    'light-blue-4 ': string
    'light-blue-5 ': string
    'light-blue-6 ': string
    'light-blue-7 ': string
    'light-blue-8 ': string
    'light-blue-9 ': string
    'light-blue-10 ': string
    'light-blue-11 ': string
    'light-blue-12 ': string
    'light-blue-13 ': string
    'light-blue-14 ': string
    'cyan ': string
    'cyan-1 ': string
    'cyan-2 ': string
    'cyan-3 ': string
    'cyan-4 ': string
    'cyan-5 ': string
    'cyan-6 ': string
    'cyan-7 ': string
    'cyan-8 ': string
    'cyan-9 ': string
    'cyan-10 ': string
    'cyan-11 ': string
    'cyan-12 ': string
    'cyan-13 ': string
    'cyan-14 ': string
    'teal ': string
    'teal-1 ': string
    'teal-2 ': string
    'teal-3 ': string
    'teal-4 ': string
    'teal-5 ': string
    'teal-6 ': string
    'teal-7 ': string
    'teal-8 ': string
    'teal-9 ': string
    'teal-10 ': string
    'teal-11 ': string
    'teal-12 ': string
    'teal-13 ': string
    'teal-14 ': string
    'green ': string
    'green-1 ': string
    'green-2 ': string
    'green-3 ': string
    'green-4 ': string
    'green-5 ': string
    'green-6 ': string
    'green-7 ': string
    'green-8 ': string
    'green-9 ': string
    'green-10 ': string
    'green-11 ': string
    'green-12 ': string
    'green-13 ': string
    'green-14 ': string
    'light-green ': string
    'light-green-1 ': string
    'light-green-2 ': string
    'light-green-3 ': string
    'light-green-4 ': string
    'light-green-5 ': string
    'light-green-6 ': string
    'light-green-7 ': string
    'light-green-8 ': string
    'light-green-9 ': string
    'light-green-10 ': string
    'light-green-11 ': string
    'light-green-12 ': string
    'light-green-13 ': string
    'light-green-14 ': string
    'lime ': string
    'lime-1 ': string
    'lime-2 ': string
    'lime-3 ': string
    'lime-4 ': string
    'lime-5 ': string
    'lime-6 ': string
    'lime-7 ': string
    'lime-8 ': string
    'lime-9 ': string
    'lime-10 ': string
    'lime-11 ': string
    'lime-12 ': string
    'lime-13 ': string
    'lime-14 ': string
    'yellow ': string
    'yellow-1 ': string
    'yellow-2 ': string
    'yellow-3 ': string
    'yellow-4 ': string
    'yellow-5 ': string
    'yellow-6 ': string
    'yellow-7 ': string
    'yellow-8 ': string
    'yellow-9 ': string
    'yellow-10 ': string
    'yellow-11 ': string
    'yellow-12 ': string
    'yellow-13 ': string
    'yellow-14 ': string
    'amber ': string
    'amber-1 ': string
    'amber-2 ': string
    'amber-3 ': string
    'amber-4 ': string
    'amber-5 ': string
    'amber-6 ': string
    'amber-7 ': string
    'amber-8 ': string
    'amber-9 ': string
    'amber-10 ': string
    'amber-11 ': string
    'amber-12 ': string
    'amber-13 ': string
    'amber-14 ': string
    'orange ': string
    'orange-1 ': string
    'orange-2 ': string
    'orange-3 ': string
    'orange-4 ': string
    'orange-5 ': string
    'orange-6 ': string
    'orange-7 ': string
    'orange-8 ': string
    'orange-9 ': string
    'orange-10 ': string
    'orange-11 ': string
    'orange-12 ': string
    'orange-13 ': string
    'orange-14 ': string
    'deep-orange ': string
    'deep-orange-1 ': string
    'deep-orange-2 ': string
    'deep-orange-3 ': string
    'deep-orange-4 ': string
    'deep-orange-5 ': string
    'deep-orange-6 ': string
    'deep-orange-7 ': string
    'deep-orange-8 ': string
    'deep-orange-9 ': string
    'deep-orange-10 ': string
    'deep-orange-11 ': string
    'deep-orange-12 ': string
    'deep-orange-13 ': string
    'deep-orange-14 ': string
    'brown ': string
    'brown-1 ': string
    'brown-2 ': string
    'brown-3 ': string
    'brown-4 ': string
    'brown-5 ': string
    'brown-6 ': string
    'brown-7 ': string
    'brown-8 ': string
    'brown-9 ': string
    'brown-10 ': string
    'brown-11 ': string
    'brown-12 ': string
    'brown-13 ': string
    'brown-14 ': string
    'grey ': string
    'grey-1 ': string
    'grey-2 ': string
    'grey-3 ': string
    'grey-4 ': string
    'grey-5 ': string
    'grey-6 ': string
    'grey-7 ': string
    'grey-8 ': string
    'grey-9 ': string
    'grey-10 ': string
    'grey-11 ': string
    'grey-12 ': string
    'grey-13 ': string
    'grey-14 ': string
    'blue-grey ': string
    'blue-grey-1 ': string
    'blue-grey-2 ': string
    'blue-grey-3 ': string
    'blue-grey-4 ': string
    'blue-grey-5 ': string
    'blue-grey-6 ': string
    'blue-grey-7 ': string
    'blue-grey-8 ': string
    'blue-grey-9 ': string
    'blue-grey-10 ': string
    'blue-grey-11 ': string
    'blue-grey-12 ': string
    'blue-grey-13 ': string
    'blue-grey-14 ': '#455a64'
  }
  quasar: {
    components?: {
      'q-icon'?: string
      'q-panel'?: string
      'q-panel-parent'?: string
      'q-loading-bar'?: string
      'q-loading-bar--top'?: string
      'q-loading-bar--bottom'?: string
      'q-loading-bar--right'?: string
      'q-loading-bar--left'?: string
      'q-avatar'?: string
      'q-avatar__content'?: string
      'q-avatar--square'?: string
      'q-badge'?: string
      'q-badge--single-line'?: string
      'q-badge--multi-line'?: string
      'q-badge--floating'?: string
      'q-badge--transparent'?: string
      'q-badge--outline'?: string
      'q-badge--rounded'?: string
      'q-banner'?: string
      'q-banner--top-padding'?: string
      'q-banner__avatar'?: string
      'q-banner__actions'?: string
      'q-banner--dense'?: string
      'q-bar'?: string
      'q-bar--standard'?: string
      'q-bar--dense'?: string
      'q-bar--dark'?: string
      'q-breadcrumbs__el'?: string
      'q-breadcrumbs__el-icon'?: string
      'q-breadcrumbs__el-icon--with-label'?: string
      'q-btn'?: string
      'q-btn--actionable'?: string
      'q-btn--no-uppercase'?: string
      'q-btn--rectangle'?: string
      'q-btn--outline'?: string
      'q-btn--push'?: string
      'q-btn--rounded'?: string
      'q-btn--round'?: string
      'q-btn--square'?: string
      'q-btn--flat'?: string
      'q-btn--unelevated'?: string
      'q-btn--dense'?: string
      'q-btn--fab'?: string
      'q-btn--fab-mini'?: string
      'q-btn__content'?: string
      'q-btn__content--hidden'?: string
      'q-btn__progress'?: string
      'q-btn__progress-indicator'?: string
      'q-btn__progress--dark'?: string
      'q-btn-dropdown--split'?: string
      'q-btn-dropdown--simple'?: string
      'q-btn-dropdown__arrow'?: string
      'q-btn-dropdown--current'?: string
      'q-btn-group'?: string
      'q-btn-group--push'?: string
      'q-btn-group--rounded'?: string
      'q-btn-group--square'?: string
      'q-btn-group--flat'?: string
      'q-btn-group--outline'?: string
      'q-btn-group--unelevated'?: string
      'q-btn-group--stretch'?: string
      'q-btn-group--glossy'?: string
      'q-btn-group--spread'?: string
      'q-btn-toggle'?: string
      'q-card'?: string
      'q-card--bordered'?: string
      'q-card--dark'?: string
      'q-card__section'?: string
      'q-card__section--vert'?: string
      'q-card__section--horiz'?: string
      'q-card__actions'?: string
      'q-card__actions--horiz'?: string
      'q-card__actions--vert'?: string
      'q-carousel'?: string
      'q-carousel__slide'?: string
      'q-carousel__slides-container'?: string
      'q-carousel__control'?: string
      'q-carousel__arrow'?: string
      'q-carousel__prev-arrow--horizontal'?: string
      'q-carousel__next-arrow--horizontal'?: string
      'q-carousel__prev-arrow--vertical'?: string
      'q-carousel__next-arrow--vertical'?: string
      'q-carousel__navigation--top'?: string
      'q-carousel__navigation--bottom'?: string
      'q-carousel__navigation--left'?: string
      'q-carousel__navigation--right'?: string
      'q-carousel__navigation-inner'?: string
      'q-carousel__navigation'?: string
      'q-carousel__navigation-icon--inactive'?: string
      'q-carousel--navigation-top'?: string
      'q-carousel--arrows-vertical'?: string
      'q-carousel--navigation-bottom'?: string
      'q-carousel--navigation-left'?: string
      'q-carousel--arrows-horizontal'?: string
      'q-carousel--navigation-right'?: string
      'q-message-name'?: string
      'q-message-label'?: string
      'q-message-stamp'?: string
      'q-message-avatar'?: string
      'q-message'?: string
      'q-message-avatar--received'?: string
      'q-message-text--received'?: string
      'q-message-text-content--received'?: string
      'q-message-name--sent'?: string
      'q-message-avatar--sent'?: string
      'q-message-container--sent'?: string
      'q-message-text--sent'?: string
      'q-message-text-content--sent'?: string
      'q-message-text'?: string
      'q-checkbox'?: string
      'q-checkbox__native'?: string
      'q-checkbox__bg'?: string
      'q-checkbox__icon-container'?: string
      'q-checkbox__icon'?: string
      'q-checkbox__svg'?: string
      'q-checkbox__truthy'?: string
      'q-checkbox__indet'?: string
      'q-checkbox__inner'?: string
      'q-checkbox__inner--truthy'?: string
      'q-checkbox__inner--indet'?: string
      'q-checkbox--dark'?: string
      'q-checkbox--dense'?: string
      'q-chip'?: string
      'q-chip--colored'?: string
      'q-chip--dark'?: string
      'q-chip--outline'?: string
      'q-chip--selected'?: string
      'q-chip__icon'?: string
      'q-chip__icon--left'?: string
      'q-chip__icon--right'?: string
      'q-chip__icon--remove'?: string
      'q-chip__content'?: string
      'q-chip--dense'?: string
      'q-chip--square'?: string
      'q-circular-progress'?: string
      'q-circular-progress__svg'?: string
      'q-circular-progress__text'?: string
      'q-circular-progress--indeterminate'?: string
      'q-color-picker'?: string
      'q-color-picker--bordered'?: string
      'q-color-picker__header-tabs'?: string
      'q-color-picker__header-banner'?: string
      'q-color-picker__header'?: string
      'q-color-picker__error-icon'?: string
      'q-color-picker__header-content'?: string
      'q-color-picker__header-content--light'?: string
      'q-color-picker__header-content--dark'?: string
      'q-color-picker__header-bg'?: string
      'q-color-picker__footer'?: string
      'q-color-picker__spectrum'?: string
      'q-color-picker__spectrum-tab'?: string
      'q-color-picker__spectrum-white'?: string
      'q-color-picker__spectrum-black'?: string
      'q-color-picker__spectrum-circle'?: string
      'q-color-picker__hue'?: string
      'q-color-picker__alpha'?: string
      'q-color-picker__sliders'?: string
      'q-color-picker__tune-tab'?: string
      'q-color-picker__palette-tab'?: string
      'q-color-picker__palette-rows--editable'?: string
      'q-color-picker__cube'?: string
      'q-color-picker--dark'?: string
      'q-date'?: string
      'q-date--bordered'?: string
      'q-date__header'?: string
      'q-date__actions'?: string
      'q-date__content'?: string
      'q-date__main'?: string
      'q-date__header-link'?: string
      'q-date__header-link--active'?: string
      'q-date__header-subtitle'?: string
      'q-date__header-title-label'?: string
      'q-date__view'?: string
      'q-date__navigation'?: string
      'q-date__calendar-weekdays'?: string
      'q-date__calendar-item'?: string
      'q-date__calendar-item--out'?: string
      'q-date__calendar-item--fill'?: string
      'q-date__range'?: string
      'q-date__range-from'?: string
      'q-date__range-to'?: string
      'q-date__edit-range'?: string
      'q-date__edit-range-from'?: string
      'q-date__edit-range-from-to'?: string
      'q-date__edit-range-to'?: string
      'q-date__calendar-days-container'?: string
      'q-date__calendar-days'?: string
      'q-date__event'?: string
      'q-date__today'?: string
      'q-date__years-content'?: string
      'q-date__years-item'?: string
      'q-date__months-item'?: string
      'q-date--readonly'?: string
      'q-date--portrait'?: string
      'q-date--portrait-standard'?: string
      'q-date--portrait-minimal'?: string
      'q-date--landscape'?: string
      'q-date--landscape-standard'?: string
      'q-date--landscape-minimal'?: string
      'q-date--dark'?: string
      'q-dialog__title'?: string
      'q-dialog__progress'?: string
      'q-dialog__inner'?: string
      'q-dialog__inner--square'?: string
      'q-dialog__inner--minimized'?: string
      'q-dialog__inner--maximized'?: string
      'q-dialog__inner--top'?: string
      'q-dialog__inner--bottom'?: string
      'q-dialog__inner--right'?: string
      'q-dialog__inner--left'?: string
      'q-dialog__inner--fullwidth'?: string
      'q-dialog__inner--fullheight'?: string
      'q-dialog__backdrop'?: string
      'q-body--dialog'?: string
      'q-editor'?: string
      'q-editor__toolbars-container'?: string
      'q-editor__content'?: string
      'q-editor__toolbar'?: string
      'q-editor__toolbar-group'?: string
      'q-editor__link-input'?: string
      'q-editor--flat'?: string
      'q-editor--dense'?: string
      'q-editor--dark'?: string
      'q-expansion-item__border'?: string
      'q-expansion-item__toggle-icon'?: string
      'q-expansion-item__toggle-icon--rotated'?: string
      'q-expansion-item__toggle-focus'?: string
      'q-expansion-item--standard'?: string
      'q-expansion-item--popup'?: string
      'q-expansion-item__content'?: string
      'q-expansion-item'?: string
      'q-expansion-item--expanded'?: string
      'q-fab'?: string
      'q-fab--form-rounded'?: string
      'q-fab--form-square'?: string
      'q-fab__icon'?: string
      'q-fab__active-icon'?: string
      'q-fab__label--external'?: string
      'q-fab__label--external-hidden'?: string
      'q-fab__label--external-left'?: string
      'q-fab__label--external-right'?: string
      'q-fab__label--external-bottom'?: string
      'q-fab__label--external-top'?: string
      'q-fab__label--internal'?: string
      'q-fab__label--internal-hidden'?: string
      'q-fab__label--internal-top'?: string
      'q-fab__label--internal-bottom'?: string
      'q-fab__label--internal-left'?: string
      'q-fab__label--internal-right'?: string
      'q-fab__icon-holder'?: string
      'q-fab__icon-holder--opened'?: string
      'q-fab__actions'?: string
      'q-fab__actions--right'?: string
      'q-fab__actions--left'?: string
      'q-fab__actions--up'?: string
      'q-fab__actions--down'?: string
      'q-fab__actions--opened'?: string
      'q-fab--align-left'?: string
      'q-fab--align-right'?: string
      'q-field'?: string
      'q-field--with-bottom'?: string
      'q-field__marginal'?: string
      'q-field__before'?: string
      'q-field__prepend'?: string
      'q-field__after'?: string
      'q-field__append'?: string
      'q-field__inner'?: string
      'q-field__bottom'?: string
      'q-field__bottom--animated'?: string
      'q-field__messages'?: string
      'q-field__counter'?: string
      'q-field--item-aligned'?: string
      'q-field__control-container'?: string
      'q-field__control'?: string
      'q-field__shadow'?: string
      'q-field__native'?: string
      'q-field__prefix'?: string
      'q-field__suffix'?: string
      'q-field__input'?: string
      'q-field--readonly'?: string
      'q-field--disabled'?: string
      'q-field__label'?: string
      'q-field--float'?: string
      'q-field--highlighted'?: string
      'q-field--filled'?: string
      'q-field--outlined'?: string
      'q-field--standard'?: string
      'q-field--dark'?: string
      'q-field--standout'?: string
      'q-field--labeled'?: string
      'q-field--dense'?: string
      'q-field--borderless'?: string
      'q-field--error'?: string
      'q-field__focusable-action'?: string
      'q-field--auto-height'?: string
      'q-field--square'?: string
      'q-transition--field-message-enter-active'?: string
      'q-transition--field-message-leave-active'?: string
      'q-transition--field-message-enter-from'?: string
      'q-transition--field-message-leave-to'?: string
      'q-transition--field-message-leave-from'?: string
      'q-file'?: string
      'q-file__filler'?: string
      'q-file__dnd'?: string
      'q-form'?: string
      'q-img'?: string
      'q-img__loading'?: string
      'q-img__container'?: string
      'q-img__image'?: string
      'q-img__image--with-transition'?: string
      'q-img__image--loaded'?: string
      'q-img__content'?: string
      'q-img--no-menu'?: string
      'q-inner-loading'?: string
      'q-inner-loading--dark'?: string
      'q-inner-loading__label'?: string
      'q-textarea'?: string
      'q-textarea--autogrow'?: string
      'q-intersection'?: string
      'q-item'?: string
      'q-item__section--side'?: string
      'q-item__section--avatar'?: string
      'q-item__section--thumbnail'?: string
      'q-item__section--nowrap'?: string
      'q-item__label'?: string
      'q-item__label--overline'?: string
      'q-item__label--caption'?: string
      'q-item__label--header'?: string
      'q-separator--spaced'?: string
      'q-list--padding'?: string
      'q-item__section--main'?: string
      'q-list--bordered'?: string
      'q-list--separator'?: string
      'q-list--dense'?: string
      'q-item--dense'?: string
      'q-list--dark'?: string
      'q-item--dark'?: string
      'q-item--active'?: string
      'q-knob'?: string
      'q-knob--editable'?: string
      'q-layout'?: string
      'q-layout-container'?: string
      'q-layout__shadow'?: string
      'q-layout__section--marginal'?: string
      'q-header--hidden'?: string
      'q-header--bordered'?: string
      'q-header'?: string
      'q-footer--hidden'?: string
      'q-footer--bordered'?: string
      'q-footer'?: string
      'q-drawer'?: string
      'q-drawer--on-top'?: string
      'q-drawer--left'?: string
      'q-drawer--right'?: string
      'q-drawer-container'?: string
      'q-drawer--mini'?: string
      'q-drawer--mini-animate'?: string
      'q-drawer--standard'?: string
      'q-drawer--mobile'?: string
      'q-drawer__backdrop'?: string
      'q-drawer__opener'?: string
      'q-page'?: string
      'q-page-sticky--shrink'?: string
      'q-body--layout-animate'?: string
      'q-body--drawer-toggle'?: string
      'q-linear-progress'?: string
      'q-linear-progress__model'?: string
      'q-linear-progress__track'?: string
      'q-linear-progress__model--with-transition'?: string
      'q-linear-progress__track--with-transition'?: string
      'q-linear-progress--reverse'?: string
      'q-linear-progress__model--determinate'?: string
      'q-linear-progress__model--indeterminate'?: string
      'q-linear-progress__model--query'?: string
      'q-linear-progress__track--light'?: string
      'q-linear-progress__track--dark'?: string
      'q-linear-progress__stripe'?: string
      'q-linear-progress__stripe--with-transition'?: string
      'q-menu'?: string
      'q-menu--square'?: string
      'q-menu--dark'?: string
      'q-option-group--inline'?: string
      'q-pagination'?: string
      'q-pagination__content'?: string
      'q-pagination__middle'?: string
      'q-parallax'?: string
      'q-parallax__media'?: string
      'q-popup-edit'?: string
      'q-popup-edit__buttons'?: string
      'q-pull-to-refresh'?: string
      'q-pull-to-refresh__puller'?: string
      'q-pull-to-refresh__puller--animating'?: string
      'q-radio'?: string
      'q-radio__native'?: string
      'q-radio__bg'?: string
      'q-radio__icon-container'?: string
      'q-radio__icon'?: string
      'q-radio__check'?: string
      'q-radio__inner'?: string
      'q-radio__inner--truthy'?: string
      'q-radio--dark'?: string
      'q-radio--dense'?: string
      'q-rating'?: string
      'q-rating__icon-container'?: string
      'q-rating__icon'?: string
      'q-rating__icon--hovered'?: string
      'q-rating__icon--active'?: string
      'q-rating__icon--exselected'?: string
      'q-rating--no-dimming'?: string
      'q-rating--editable'?: string
      'q-responsive'?: string
      'q-responsive__filler'?: string
      'q-responsive__content'?: string
      'q-scrollarea'?: string
      'q-scrollarea__bar'?: string
      'q-scrollarea__thumb'?: string
      'q-scrollarea__bar--v'?: string
      'q-scrollarea__thumb--v'?: string
      'q-scrollarea__bar--h'?: string
      'q-scrollarea__thumb--h'?: string
      'q-scrollarea__bar--invisible'?: string
      'q-scrollarea__thumb--invisible'?: string
      'q-scrollarea__content'?: string
      'q-scrollarea--dark'?: string
      'q-select--without-input'?: string
      'q-select--with-input'?: string
      'q-select'?: string
      'q-select__focus-target'?: string
      'q-select__autocomplete-input'?: string
      'q-select__dropdown-icon'?: string
      'q-select__dialog'?: string
      'q-separator'?: string
      'q-separator--dark'?: string
      'q-separator--horizontal'?: string
      'q-separator--horizontal-inset'?: string
      'q-separator--horizontal-item-inset'?: string
      'q-separator--horizontal-item-thumbnail-inset'?: string
      'q-separator--vertical'?: string
      'q-separator--vertical-inset'?: string
      'q-skeleton'?: string
      'q-skeleton--anim'?: string
      'q-skeleton--type-text'?: string
      'q-skeleton--type-circle'?: string
      'q-skeleton--type-QAvatar'?: string
      'q-skeleton--type-QBtn'?: string
      'q-skeleton--type-QBadge'?: string
      'q-skeleton--type-QChip'?: string
      'q-skeleton--type-QToolbar'?: string
      'q-skeleton--type-QCheckbox'?: string
      'q-skeleton--type-QRadio'?: string
      'q-skeleton--type-QToggle'?: string
      'q-skeleton--type-QSlider'?: string
      'q-skeleton--type-QRange'?: string
      'q-skeleton--type-QInput'?: string
      'q-skeleton--bordered'?: string
      'q-skeleton--square'?: string
      'q-skeleton--anim-fade'?: string
      'q-skeleton--anim-pulse'?: string
      'q-skeleton--anim-pulse-x'?: string
      'q-skeleton--anim-pulse-y'?: string
      'q-skeleton--anim-wave'?: string
      'q-skeleton--anim-blink'?: string
      'q-skeleton--anim-pop'?: string
      'q-skeleton--dark'?: string
      'q-slide-item'?: string
      'q-slide-item__left'?: string
      'q-slide-item__right'?: string
      'q-slide-item__top'?: string
      'q-slide-item__bottom'?: string
      'q-slide-item__content'?: string
      'q-slider'?: string
      'q-slider--h'?: string
      'q-slider--v'?: string
      'q-slider--editable'?: string
      'q-slider__track-container'?: string
      'q-slider__track-container--h'?: string
      'q-slider__track-container--v'?: string
      'q-slider__track'?: string
      'q-slider__inner'?: string
      'q-slider__selection'?: string
      'q-slider__markers'?: string
      'q-slider__markers--h'?: string
      'q-slider__markers--v'?: string
      'q-slider__marker-labels-container'?: string
      'q-slider__marker-labels'?: string
      'q-slider__marker-labels--h-standard'?: string
      'q-slider__marker-labels--h-switched'?: string
      'q-slider__marker-labels--h-ltr'?: string
      'q-slider__marker-labels--h-rtl'?: string
      'q-slider__marker-labels--v-standard'?: string
      'q-slider__marker-labels--v-switched'?: string
      'q-slider__marker-labels--v-ltr'?: string
      'q-slider__marker-labels--v-rtl'?: string
      'q-slider__thumb'?: string
      'q-slider__thumb--h'?: string
      'q-slider__thumb--h-ltr'?: string
      'q-slider__thumb--h-rtl'?: string
      'q-slider__thumb--v'?: string
      'q-slider__thumb--v-ltr'?: string
      'q-slider__thumb--v-rtl'?: string
      'q-slider__thumb-shape'?: string
      'q-slider__focus-ring'?: string
      'q-slider__pin'?: string
      'q-slider__pin--h'?: string
      'q-slider__pin--h-standard'?: string
      'q-slider__pin--h-switched'?: string
      'q-slider__pin--v'?: string
      'q-slider__pin--v-standard'?: string
      'q-slider__pin--v-switched'?: string
      'q-slider__label'?: string
      'q-slider__label--h'?: string
      'q-slider__label--h-standard'?: string
      'q-slider__label--h-switched'?: string
      'q-slider__label--v'?: string
      'q-slider__label--v-standard'?: string
      'q-slider__label--v-switched'?: string
      'q-slider__text-container'?: string
      'q-slider__text'?: string
      'q-slider--no-value'?: string
      'q-slider--focus'?: string
      'q-slider--inactive'?: string
      'q-slider--active'?: string
      'q-slider--label'?: string
      'q-slider--dark'?: string
      'q-slider--dense'?: string
      'q-space'?: string
      'q-spinner'?: string
      'q-spinner-mat'?: string
      'q-splitter__panel'?: string
      'q-splitter__separator'?: string
      'q-splitter__separator-area'?: string
      'q-splitter--dark'?: string
      'q-splitter--vertical'?: string
      'q-splitter--horizontal'?: string
      'q-splitter__before'?: string
      'q-splitter__after'?: string
      'q-stepper'?: string
      'q-stepper__title'?: string
      'q-stepper__caption'?: string
      'q-stepper__dot'?: string
      'q-stepper__tab'?: string
      'q-stepper--dark'?: string
      'q-stepper__tab--navigation'?: string
      'q-stepper__tab--active'?: string
      'q-stepper__tab--done'?: string
      'q-stepper__tab--disabled'?: string
      'q-stepper__tab--error'?: string
      'q-stepper__tab--error-with-icon'?: string
      'q-stepper__header'?: string
      'q-stepper__header--border'?: string
      'q-stepper__header--standard-labels'?: string
      'q-stepper__header--alternative-labels'?: string
      'q-stepper__header--contracted'?: string
      'q-stepper__nav'?: string
      'q-stepper--flat'?: string
      'q-stepper--bordered'?: string
      'q-stepper--horizontal'?: string
      'q-stepper--vertical'?: string
      'q-tab-panels'?: string
      'q-tab-panel'?: string
      'q-markup-table'?: string
      'q-table'?: string
      'q-table__card'?: string
      'q-table__container'?: string
      'q-table__top'?: string
      'q-table__title'?: string
      'q-table__separator'?: string
      'q-table__progress'?: string
      'q-table__middle'?: string
      'q-table__bottom'?: string
      'q-table__bottom-nodata-icon'?: string
      'q-table__bottom-item'?: string
      'q-table__control'?: string
      'q-table__sort-icon'?: string
      'q-table__sort-icon--left'?: string
      'q-table__sort-icon--center'?: string
      'q-table__sort-icon--right'?: string
      'q-table--col-auto-width'?: string
      'q-table__card--dark'?: string
      'q-table--dark'?: string
      'q-table--flat'?: string
      'q-table--bordered'?: string
      'q-table--square'?: string
      'q-table__linear-progress'?: string
      'q-table--no-wrap'?: string
      'q-table--grid'?: string
      'q-table__grid-item-card'?: string
      'q-table__grid-item-row'?: string
      'q-table__grid-item-title'?: string
      'q-table__grid-item-value'?: string
      'q-table__grid-item'?: string
      'q-table__grid-item--selected'?: string
      'q-table--horizontal-separator'?: string
      'q-table--cell-separator'?: string
      'q-table--vertical-separator'?: string
      'q-table--dense'?: string
      'q-tab'?: string
      'q-tab--full'?: string
      'q-tab--no-caps'?: string
      'q-tab__content'?: string
      'q-tab__content--inline'?: string
      'q-tab__icon'?: string
      'q-tab__label'?: string
      'q-tab__alert'?: string
      'q-tab__alert-icon'?: string
      'q-tab__indicator'?: string
      'q-tab--active'?: string
      'q-tab--inactive'?: string
      'q-tabs'?: string
      'q-tabs--scrollable'?: string
      'q-tabs--not-scrollable'?: string
      'q-tabs__arrow'?: string
      'q-tabs__content'?: string
      'q-tabs__content--align-center'?: string
      'q-tabs__content--align-right'?: string
      'q-tabs__content--align-justify'?: string
      'q-tabs__offset'?: string
      'q-tabs--horizontal'?: string
      'q-tabs--vertical'?: string
      'q-tabs--dense'?: string
      'q-time'?: string
      'q-time--bordered'?: string
      'q-time__header'?: string
      'q-time__actions'?: string
      'q-time__header-label'?: string
      'q-time__link'?: string
      'q-time__link--active'?: string
      'q-time__header-ampm'?: string
      'q-time__content'?: string
      'q-time__container-parent'?: string
      'q-time__container-child'?: string
      'q-time__clock'?: string
      'q-time__clock-circle'?: string
      'q-time__clock-center'?: string
      'q-time__clock-pointer'?: string
      'q-time__clock-position'?: string
      'q-time__clock-position--disable'?: string
      'q-time__clock-position--active'?: string
      'q-time__clock-pos-0'?: string
      'q-time__clock-pos-1'?: string
      'q-time__clock-pos-2'?: string
      'q-time__clock-pos-3'?: string
      'q-time__clock-pos-4'?: string
      'q-time__clock-pos-5'?: string
      'q-time__clock-pos-6'?: string
      'q-time__clock-pos-7'?: string
      'q-time__clock-pos-8'?: string
      'q-time__clock-pos-9'?: string
      'q-time__clock-pos-10'?: string
      'q-time__clock-pos-11'?: string
      'q-time__clock-pos-12'?: string
      'q-time__clock-pos-13'?: string
      'q-time__clock-pos-14'?: string
      'q-time__clock-pos-15'?: string
      'q-time__clock-pos-16'?: string
      'q-time__clock-pos-17'?: string
      'q-time__clock-pos-18'?: string
      'q-time__clock-pos-19'?: string
      'q-time__clock-pos-20'?: string
      'q-time__clock-pos-21'?: string
      'q-time__clock-pos-22'?: string
      'q-time__clock-pos-23'?: string
      'q-time__now-button'?: string
      'q-time--readonly'?: string
      'q-time--portrait'?: string
      'q-time--landscape'?: string
      'q-time--dark'?: string
      'q-timeline'?: string
      'q-timeline--dark'?: string
      'q-timeline__content'?: string
      'q-timeline__title'?: string
      'q-timeline__subtitle'?: string
      'q-timeline__dot'?: string
      'q-timeline__dot-img'?: string
      'q-timeline__heading'?: string
      'q-timeline__heading-title'?: string
      'q-timeline__entry'?: string
      'q-timeline__entry--icon'?: string
      'q-timeline--dense--right'?: string
      'q-timeline--dense--left'?: string
      'q-timeline--comfortable'?: string
      'q-timeline--comfortable--right'?: string
      'q-timeline--comfortable--left'?: string
      'q-timeline--loose'?: string
      'q-toggle'?: string
      'q-toggle__native'?: string
      'q-toggle__track'?: string
      'q-toggle__thumb'?: string
      'q-toggle__inner'?: string
      'q-toggle__inner--indet'?: string
      'q-toggle__inner--truthy'?: string
      'q-toggle--dark'?: string
      'q-toggle--dense'?: string
      'q-toolbar'?: string
      'q-toolbar--inset'?: string
      'q-toolbar__title'?: string
      'q-tooltip--style'?: string
      'q-tooltip'?: string
      'q-tree'?: string
      'q-tree__node'?: string
      'q-tree__node--disabled'?: string
      'q-tree__node-header'?: string
      'q-tree__children'?: string
      'q-tree__node-body'?: string
      'q-tree__node--parent'?: string
      'q-tree__node--link'?: string
      'q-tree__node-header-content'?: string
      'q-tree__node--selected'?: string
      'q-tree__icon'?: string
      'q-tree__img'?: string
      'q-tree__avatar'?: string
      'q-tree__arrow'?: string
      'q-tree__spinner'?: string
      'q-tree__arrow--rotate'?: string
      'q-tree__tickbox'?: string
      'q-tree--dark'?: string
      'q-tree--no-connectors'?: string
      'q-tree--dense'?: string
      'q-uploader'?: string
      'q-uploader--bordered'?: string
      'q-uploader__input'?: string
      'q-uploader__file'?: string
      'q-uploader__header'?: string
      'q-uploader__spinner'?: string
      'q-uploader__header-content'?: string
      'q-uploader__dnd'?: string
      'q-uploader__overlay'?: string
      'q-uploader__list'?: string
      'q-uploader__file--img'?: string
      'q-uploader__file-header'?: string
      'q-uploader__file-header-content'?: string
      'q-uploader__file-status'?: string
      'q-uploader__title'?: string
      'q-uploader__subtitle'?: string
      'q-uploader--disable'?: string
      'q-uploader--dark'?: string
      'q-video'?: string
      'q-video--responsive'?: string
      'q-virtual-scroll'?: string
      'q-virtual-scroll__content'?: string
      'q-virtual-scroll__padding'?: string
      'q-virtual-scroll--horizontal'?: string
      'q-ripple'?: string
      'q-ripple__inner'?: string
      'q-ripple__inner--enter'?: string
      'q-ripple__inner--leave'?: string
      'q-morph--invisible'?: string
      'q-morph--internal'?: string
      'q-bottom-sheet'?: string
      'q-bottom-sheet__avatar'?: string
      'q-bottom-sheet--list'?: string
      'q-bottom-sheet--grid'?: string
      'q-bottom-sheet__item'?: string
      'q-dialog-plugin'?: string
      'q-dialog-plugin__form'?: string
      'q-dialog-plugin--progress'?: string
      'q-loading'?: string
      'q-loading__backdrop'?: string
      'q-loading__box'?: string
      'q-loading__message'?: string
      'q-notifications__list'?: string
      'q-notifications__list--center'?: string
      'q-notifications__list--top'?: string
      'q-notifications__list--bottom'?: string
      'q-notification'?: string
      'q-notification__icon'?: string
      'q-notification__icon--additional'?: string
      'q-notification__avatar'?: string
      'q-notification__avatar--additional'?: string
      'q-notification__spinner'?: string
      'q-notification__spinner--additional'?: string
      'q-notification__message'?: string
      'q-notification__caption'?: string
      'q-notification__actions'?: string
      'q-notification__badge'?: string
      'q-notification__badge--top-left'?: string
      'q-notification__badge--top-right'?: string
      'q-notification__badge--bottom-left'?: string
      'q-notification__badge--bottom-right'?: string
      'q-notification__progress'?: string
      'q-notification--standard'?: string
      'q-notification--multi-line'?: string
      'q-notification--top-left-enter-from'?: string
      'q-notification--top-left-leave-to'?: string
      'q-notification--top-enter-from'?: string
      'q-notification--top-leave-to'?: string
      'q-notification--top-right-enter-from'?: string
      'q-notification--top-right-leave-to'?: string
      'q-notification--left-enter-from'?: string
      'q-notification--left-leave-to'?: string
      'q-notification--center-enter-from'?: string
      'q-notification--center-leave-to'?: string
      'q-notification--right-enter-from'?: string
      'q-notification--right-leave-to'?: string
      'q-notification--bottom-left-enter-from'?: string
      'q-notification--bottom-left-leave-to'?: string
      'q-notification--bottom-enter-from'?: string
      'q-notification--bottom-leave-to'?: string
      'q-notification--bottom-right-enter-from'?: string
      'q-notification--bottom-right-leave-to'?: string
      'q-notification--top-left-leave-active'?: string
      'q-notification--top-leave-active'?: string
      'q-notification--top-right-leave-active'?: string
      'q-notification--left-leave-active'?: string
      'q-notification--center-leave-active'?: string
      'q-notification--right-leave-active'?: string
      'q-notification--bottom-left-leave-active'?: string
      'q-notification--bottom-leave-active'?: string
      'q-notification--bottom-right-leave-active'?: string
    }
    z: {
      fab: number
      side: number
      marginals: number
      'fixed-drawer': number
      fullscreen: number
      menu: number
      top: number
      tooltip: number
      notify: number
      max: number
    }
    transition: {
      duration: string
      easing: string
    }
  }
}

const defaultTheme: QuasarTheme = {
  colors: {
    primary: '#1976d2',
    secondary: '#26A69A',
    accent: '#9C27B0',

    positive: '#21BA45',
    negative: '#C10015',
    info: '#31CCEC',
    warning: '#F2C037',

    'dark-page': '#121212',
    'q-dark': '#1d1d1d',

    red: '#f44336',
    'red-1 ': '#ffebee',
    'red-2 ': '#ffcdd2',
    'red-3 ': '#ef9a9a',
    'red-4 ': '#e57373',
    'red-5 ': '#ef5350',
    'red-6 ': '#f44336',
    'red-7 ': '#e53935',
    'red-8 ': '#d32f2f',
    'red-9 ': '#c62828',
    'red-10 ': '#b71c1c',
    'red-11 ': '#ff8a80',
    'red-12 ': '#ff5252',
    'red-13 ': '#ff1744',
    'red-14 ': '#d50000',
    'pink ': '#e91e63',
    'pink-1 ': '#fce4ec',
    'pink-2 ': '#f8bbd0',
    'pink-3 ': '#f48fb1',
    'pink-4 ': '#f06292',
    'pink-5 ': '#ec407a',
    'pink-6 ': '#e91e63',
    'pink-7 ': '#d81b60',
    'pink-8 ': '#c2185b',
    'pink-9 ': '#ad1457',
    'pink-10 ': '#880e4f',
    'pink-11 ': '#ff80ab',
    'pink-12 ': '#ff4081',
    'pink-13 ': '#f50057',
    'pink-14 ': '#c51162',
    'purple ': '#9c27b0',
    'purple-1 ': '#f3e5f5',
    'purple-2 ': '#e1bee7',
    'purple-3 ': '#ce93d8',
    'purple-4 ': '#ba68c8',
    'purple-5 ': '#ab47bc',
    'purple-6 ': '#9c27b0',
    'purple-7 ': '#8e24aa',
    'purple-8 ': '#7b1fa2',
    'purple-9 ': '#6a1b9a',
    'purple-10 ': '#4a148c',
    'purple-11 ': '#ea80fc',
    'purple-12 ': '#e040fb',
    'purple-13 ': '#d500f9',
    'purple-14 ': '#aa00ff',
    'deep-purple ': '#673ab7',
    'deep-purple-1 ': '#ede7f6',
    'deep-purple-2 ': '#d1c4e9',
    'deep-purple-3 ': '#b39ddb',
    'deep-purple-4 ': '#9575cd',
    'deep-purple-5 ': '#7e57c2',
    'deep-purple-6 ': '#673ab7',
    'deep-purple-7 ': '#5e35b1',
    'deep-purple-8 ': '#512da8',
    'deep-purple-9 ': '#4527a0',
    'deep-purple-10 ': '#311b92',
    'deep-purple-11 ': '#b388ff',
    'deep-purple-12 ': '#7c4dff',
    'deep-purple-13 ': '#651fff',
    'deep-purple-14 ': '#6200ea',
    'indigo ': '#3f51b5',
    'indigo-1 ': '#e8eaf6',
    'indigo-2 ': '#c5cae9',
    'indigo-3 ': '#9fa8da',
    'indigo-4 ': '#7986cb',
    'indigo-5 ': '#5c6bc0',
    'indigo-6 ': '#3f51b5',
    'indigo-7 ': '#3949ab',
    'indigo-8 ': '#303f9f',
    'indigo-9 ': '#283593',
    'indigo-10 ': '#1a237e',
    'indigo-11 ': '#8c9eff',
    'indigo-12 ': '#536dfe',
    'indigo-13 ': '#3d5afe',
    'indigo-14 ': '#304ffe',
    'blue ': '#2196f3',
    'blue-1 ': '#e3f2fd',
    'blue-2 ': '#bbdefb',
    'blue-3 ': '#90caf9',
    'blue-4 ': '#64b5f6',
    'blue-5 ': '#42a5f5',
    'blue-6 ': '#2196f3',
    'blue-7 ': '#1e88e5',
    'blue-8 ': '#1976d2',
    'blue-9 ': '#1565c0',
    'blue-10 ': '#0d47a1',
    'blue-11 ': '#82b1ff',
    'blue-12 ': '#448aff',
    'blue-13 ': '#2979ff',
    'blue-14 ': '#2962ff',
    'light-blue ': '#03a9f4',
    'light-blue-1 ': '#e1f5fe',
    'light-blue-2 ': '#b3e5fc',
    'light-blue-3 ': '#81d4fa',
    'light-blue-4 ': '#4fc3f7',
    'light-blue-5 ': '#29b6f6',
    'light-blue-6 ': '#03a9f4',
    'light-blue-7 ': '#039be5',
    'light-blue-8 ': '#0288d1',
    'light-blue-9 ': '#0277bd',
    'light-blue-10 ': '#01579b',
    'light-blue-11 ': '#80d8ff',
    'light-blue-12 ': '#40c4ff',
    'light-blue-13 ': '#00b0ff',
    'light-blue-14 ': '#0091ea',
    'cyan ': '#00bcd4',
    'cyan-1 ': '#e0f7fa',
    'cyan-2 ': '#b2ebf2',
    'cyan-3 ': '#80deea',
    'cyan-4 ': '#4dd0e1',
    'cyan-5 ': '#26c6da',
    'cyan-6 ': '#00bcd4',
    'cyan-7 ': '#00acc1',
    'cyan-8 ': '#0097a7',
    'cyan-9 ': '#00838f',
    'cyan-10 ': '#006064',
    'cyan-11 ': '#84ffff',
    'cyan-12 ': '#18ffff',
    'cyan-13 ': '#00e5ff',
    'cyan-14 ': '#00b8d4',
    'teal ': '#009688',
    'teal-1 ': '#e0f2f1',
    'teal-2 ': '#b2dfdb',
    'teal-3 ': '#80cbc4',
    'teal-4 ': '#4db6ac',
    'teal-5 ': '#26a69a',
    'teal-6 ': '#009688',
    'teal-7 ': '#00897b',
    'teal-8 ': '#00796b',
    'teal-9 ': '#00695c',
    'teal-10 ': '#004d40',
    'teal-11 ': '#a7ffeb',
    'teal-12 ': '#64ffda',
    'teal-13 ': '#1de9b6',
    'teal-14 ': '#00bfa5',
    'green ': '#4caf50',
    'green-1 ': '#e8f5e9',
    'green-2 ': '#c8e6c9',
    'green-3 ': '#a5d6a7',
    'green-4 ': '#81c784',
    'green-5 ': '#66bb6a',
    'green-6 ': '#4caf50',
    'green-7 ': '#43a047',
    'green-8 ': '#388e3c',
    'green-9 ': '#2e7d32',
    'green-10 ': '#1b5e20',
    'green-11 ': '#b9f6ca',
    'green-12 ': '#69f0ae',
    'green-13 ': '#00e676',
    'green-14 ': '#00c853',
    'light-green ': '#8bc34a',
    'light-green-1 ': '#f1f8e9',
    'light-green-2 ': '#dcedc8',
    'light-green-3 ': '#c5e1a5',
    'light-green-4 ': '#aed581',
    'light-green-5 ': '#9ccc65',
    'light-green-6 ': '#8bc34a',
    'light-green-7 ': '#7cb342',
    'light-green-8 ': '#689f38',
    'light-green-9 ': '#558b2f',
    'light-green-10 ': '#33691e',
    'light-green-11 ': '#ccff90',
    'light-green-12 ': '#b2ff59',
    'light-green-13 ': '#76ff03',
    'light-green-14 ': '#64dd17',
    'lime ': '#cddc39',
    'lime-1 ': '#f9fbe7',
    'lime-2 ': '#f0f4c3',
    'lime-3 ': '#e6ee9c',
    'lime-4 ': '#dce775',
    'lime-5 ': '#d4e157',
    'lime-6 ': '#cddc39',
    'lime-7 ': '#c0ca33',
    'lime-8 ': '#afb42b',
    'lime-9 ': '#9e9d24',
    'lime-10 ': '#827717',
    'lime-11 ': '#f4ff81',
    'lime-12 ': '#eeff41',
    'lime-13 ': '#c6ff00',
    'lime-14 ': '#aeea00',
    'yellow ': '#ffeb3b',
    'yellow-1 ': '#fffde7',
    'yellow-2 ': '#fff9c4',
    'yellow-3 ': '#fff59d',
    'yellow-4 ': '#fff176',
    'yellow-5 ': '#ffee58',
    'yellow-6 ': '#ffeb3b',
    'yellow-7 ': '#fdd835',
    'yellow-8 ': '#fbc02d',
    'yellow-9 ': '#f9a825',
    'yellow-10 ': '#f57f17',
    'yellow-11 ': '#ffff8d',
    'yellow-12 ': '#ffff00',
    'yellow-13 ': '#ffea00',
    'yellow-14 ': '#ffd600',
    'amber ': '#ffc107',
    'amber-1 ': '#fff8e1',
    'amber-2 ': '#ffecb3',
    'amber-3 ': '#ffe082',
    'amber-4 ': '#ffd54f',
    'amber-5 ': '#ffca28',
    'amber-6 ': '#ffc107',
    'amber-7 ': '#ffb300',
    'amber-8 ': '#ffa000',
    'amber-9 ': '#ff8f00',
    'amber-10 ': '#ff6f00',
    'amber-11 ': '#ffe57f',
    'amber-12 ': '#ffd740',
    'amber-13 ': '#ffc400',
    'amber-14 ': '#ffab00',
    'orange ': '#ff9800',
    'orange-1 ': '#fff3e0',
    'orange-2 ': '#ffe0b2',
    'orange-3 ': '#ffcc80',
    'orange-4 ': '#ffb74d',
    'orange-5 ': '#ffa726',
    'orange-6 ': '#ff9800',
    'orange-7 ': '#fb8c00',
    'orange-8 ': '#f57c00',
    'orange-9 ': '#ef6c00',
    'orange-10 ': '#e65100',
    'orange-11 ': '#ffd180',
    'orange-12 ': '#ffab40',
    'orange-13 ': '#ff9100',
    'orange-14 ': '#ff6d00',
    'deep-orange ': '#ff5722',
    'deep-orange-1 ': '#fbe9e7',
    'deep-orange-2 ': '#ffccbc',
    'deep-orange-3 ': '#ffab91',
    'deep-orange-4 ': '#ff8a65',
    'deep-orange-5 ': '#ff7043',
    'deep-orange-6 ': '#ff5722',
    'deep-orange-7 ': '#f4511e',
    'deep-orange-8 ': '#e64a19',
    'deep-orange-9 ': '#d84315',
    'deep-orange-10 ': '#bf360c',
    'deep-orange-11 ': '#ff9e80',
    'deep-orange-12 ': '#ff6e40',
    'deep-orange-13 ': '#ff3d00',
    'deep-orange-14 ': '#dd2c00',
    'brown ': '#795548',
    'brown-1 ': '#efebe9',
    'brown-2 ': '#d7ccc8',
    'brown-3 ': '#bcaaa4',
    'brown-4 ': '#a1887f',
    'brown-5 ': '#8d6e63',
    'brown-6 ': '#795548',
    'brown-7 ': '#6d4c41',
    'brown-8 ': '#5d4037',
    'brown-9 ': '#4e342e',
    'brown-10 ': '#3e2723',
    'brown-11 ': '#d7ccc8',
    'brown-12 ': '#bcaaa4',
    'brown-13 ': '#8d6e63',
    'brown-14 ': '#5d4037',
    'grey ': '#9e9e9e',
    'grey-1 ': '#fafafa',
    'grey-2 ': '#f5f5f5',
    'grey-3 ': '#eeeeee',
    'grey-4 ': '#e0e0e0',
    'grey-5 ': '#bdbdbd',
    'grey-6 ': '#9e9e9e',
    'grey-7 ': '#757575',
    'grey-8 ': '#616161',
    'grey-9 ': '#424242',
    'grey-10 ': '#212121',
    'grey-11 ': '#f5f5f5',
    'grey-12 ': '#eeeeee',
    'grey-13 ': '#bdbdbd',
    'grey-14 ': '#616161',
    'blue-grey ': '#607d8b',
    'blue-grey-1 ': '#eceff1',
    'blue-grey-2 ': '#cfd8dc',
    'blue-grey-3 ': '#b0bec5',
    'blue-grey-4 ': '#90a4ae',
    'blue-grey-5 ': '#78909c',
    'blue-grey-6 ': '#607d8b',
    'blue-grey-7 ': '#546e7a',
    'blue-grey-8 ': '#455a64',
    'blue-grey-9 ': '#37474f',
    'blue-grey-10 ': '#263238',
    'blue-grey-11 ': '#cfd8dc',
    'blue-grey-12 ': '#b0bec5',
    'blue-grey-13 ': '#78909c',
    'blue-grey-14 ': '#455a64'
  },
  quasar: {
    z: {
      fab: 990,
      side: 1000,
      marginals: 2000,
      'fixed-drawer': 3000,
      fullscreen: 6000,
      menu: 6000,
      top: 7000,
      tooltip: 9000,
      notify: 9500,
      max: 9998
    },
    transition: {
      duration: '.3s',
      easing: 'cubic-bezier(0.215,0.61,0.355,1)'
    }
  }
}

export { defaultTheme }
