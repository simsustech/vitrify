// Import normalize and animate css
import {
  definePreset,
  type Preflight,
  type Preset,
  presetIcons,
  type Rule,
  transformerVariantGroup,
  type UserShortcuts
} from 'unocss'
import presetUno from '@unocss/preset-uno'
import { defaultTheme, type QuasarTheme } from './theme.js'
import { animatedUno } from 'animated-unocss'

import { shortcuts as QIconShortcuts } from './components/QIcon.unocss.js'
import { shortcuts as QAjaxBarShortcuts } from './components/QAjaxBar.unocss.js'
import { shortcuts as QBtnShortcuts } from './components/QBtn.unocss.js'
import { shortcuts as PanelShortcuts } from './composables/panel.unocss.js'
import { shortcuts as QAvatarShortcuts } from './components/QAvatar.unocss.js'
import { shortcuts as QBadgeShortcuts } from './components/QBadge.unocss.js'
import { shortcuts as QBannerShortcuts } from './components/QBanner.unocss.js'
import { shortcuts as QBarShortcuts } from './components/QBar.unocss.js'
import {
  preflights as QBreadcrumbsPreflights,
  shortcuts as QBreadcrumbsShortcuts
} from './components/QBreadcrumbs.unocss.js'
import { shortcuts as QBtnDropdownShortcuts } from './components/QBtnDropdown.unocss.js'
import { shortcuts as QBtnGroupShortcuts } from './components/QBtnGroup.unocss.js'
import { shortcuts as QBtnToggleShortcuts } from './components/QBtnToggle.unocss.js'
import { shortcuts as QCardShortcuts } from './components/QCard.unocss.js'
import { shortcuts as QCarouselShortcuts } from './components/QCarousel.unocss.js'
import { shortcuts as QChatMessageShortcuts } from './components/QChatMessage.unocss.js'
import {
  preflights as QCheckboxPreflights,
  shortcuts as QCheckboxShortcuts
} from './components/QCheckbox.unocss.js'
import {
  preflights as QChipPreflights,
  shortcuts as QChipShortcuts
} from './components/QChip.unocss.js'
import {
  preflights as QCircularProgressPreflights,
  shortcuts as QCircularProgressShortcuts
} from './components/QCircularProgress.unocss.js'
import { shortcuts as QColorPickerShortcuts } from './components/QColorPicker.unocss.js'
import { shortcuts as QDateShortcuts } from './components/QDate.unocss.js'
import {
  preflights as QDialogPreflights,
  shortcuts as QDialogShortcuts
} from './components/QDialog.unocss.js'
import { shortcuts as QEditorShortcuts } from './components/QEditor.unocss.js'
import { shortcuts as QExpansionItemShortcuts } from './components/QExpansionItem.unocss.js'
import { shortcuts as QFabShortcuts } from './components/QFab.unocss.js'
import {
  shortcuts as QFieldShortcuts,
  preflights as QFieldPreflights
} from './components/QField.unocss.js'
import { shortcuts as QFileShortcuts } from './components/QFile.unocss.js'
import { shortcuts as QFormShortcuts } from './components/QForm.unocss.js'
import { shortcuts as QImgShortcuts } from './components/QImg.unocss.js'
import { shortcuts as QInnerLoadingShortcuts } from './components/QInnerLoading.unocss.js'
import { shortcuts as QInputShortcuts } from './components/QInput.unocss.js'
import { shortcuts as QIntersectionShortcuts } from './components/QIntersection.unocss.js'
import { shortcuts as QItemShortcuts } from './components/QItem.unocss.js'
import { shortcuts as QKnobShortcuts } from './components/QKnob.unocss.js'
import {
  shortcuts as QLayoutShortcuts,
  preflights as QLayoutPreflights
} from './components/QLayout.unocss.js'
import {
  shortcuts as QLinearProgressShortcuts,
  preflights as QLinearProgressPreflights
} from './components/QLinearProgress.unocss.js'
import { shortcuts as QMenuShortcuts } from './components/QMenu.unocss.js'
import { shortcuts as QOptionGroupShortcuts } from './components/QOptionGroup.unocss.js'
import { shortcuts as QPageShortcuts } from './components/QPage.unocss.js'
import { shortcuts as QPageStickyShortcuts } from './components/QPageSticky.unocss.js'
import { shortcuts as QPaginationShortcuts } from './components/QPagination.unocss.js'
import { shortcuts as QParallaxShortcuts } from './components/QParallax.unocss.js'
import { shortcuts as QPopupEditShortcuts } from './components/QPopupEdit.unocss.js'
import { shortcuts as QPullToRefreshShortcuts } from './components/QPullToRefresh.unocss.js'
import {
  shortcuts as QRadioShortcuts,
  preflights as QRadioPreflights
} from './components/QRadio.unocss.js'
import { shortcuts as QRatingShortcuts } from './components/QRating.unocss.js'
import { shortcuts as QResponsiveShortcuts } from './components/QResponsive.unocss.js'
import { shortcuts as QScrollareaShortcuts } from './components/QScrollarea.unocss.js'
import {
  shortcuts as QSelectShortcuts,
  preflights as QSelectPreflights
} from './components/QSelect.unocss.js'
import { shortcuts as QSeparatorShortcuts } from './components/QSeparator.unocss.js'
import {
  shortcuts as QSkeletonShortcuts,
  preflights as QSkeletonPreflights
} from './components/QSkeleton.unocss.js'
import { shortcuts as QSlideItemShortcuts } from './components/QSlideItem.unocss.js'
import { shortcuts as QSliderShortcuts } from './components/QSlider.unocss.js'
import { shortcuts as QSpaceShortcuts } from './components/QSpace.unocss.js'
import {
  shortcuts as QSpinnerShortcuts,
  preflights as QSpinnerPreflights
} from './components/QSpinner.unocss.js'
import { shortcuts as QSplitterShortcuts } from './components/QSplitter.unocss.js'
import { shortcuts as QStepperShortcuts } from './components/QStepper.unocss.js'
import { shortcuts as QTabPanelShortcuts } from './components/QTabPanel.unocss.js'
import {
  shortcuts as QTableShortcuts,
  preflights as QTablePreflights
} from './components/QTable.unocss.js'
import { shortcuts as QTabsShortcuts } from './components/QTabs.unocss.js'
import { shortcuts as QTimeShortcuts } from './components/QTime.unocss.js'
import { shortcuts as QTimelineShortcuts } from './components/QTimeline.unocss.js'
import {
  shortcuts as QToggleShortcuts,
  preflights as QTogglePreflights
} from './components/QToggle.unocss.js'
import { shortcuts as QToolbarShortcuts } from './components/QToolbar.unocss.js'
import { shortcuts as QTooltipShortcuts } from './components/QTooltip.unocss.js'
import {
  shortcuts as QTreeShortcuts,
  preflights as QTreePreflights
} from './components/QTree.unocss.js'
import { shortcuts as QUploaderShortcuts } from './components/QUploader.unocss.js'
import { shortcuts as QVideoShortcuts } from './components/QVideo.unocss.js'
import { shortcuts as QVirtualScrollShortcuts } from './components/QVirtualScroll.unocss.js'

import { shortcuts as QMorphShortcuts } from './directives/QMorph.unocss.js'
import { shortcuts as QRippleShortcuts } from './directives/QRipple.unocss.js'

import { shortcuts as QBottomSheetShortcuts } from './plugins/QBottomSheet.unocss.js'
import { shortcuts as QDialogPluginShortcuts } from './plugins/QDialogPlugin.unocss.js'
import { shortcuts as QLoadingShortcuts } from './plugins/QLoading.unocss.js'
import { shortcuts as QNotifyShortcuts } from './plugins/QNotify.unocss.js'

import { preflights as ColorPreflights } from './core/colors.unocss.js'
import {
  preflights as DarkPreflights,
  shortcuts as DarkShortcuts
} from './core/dark.unocss.js'
import {
  shortcuts as ElevationShortcuts,
  rules as ElevationRules
} from './core/elevation.unocss.js'
import { shortcuts as FlexShortcuts } from './core/flex.unocss.js'
import {
  rules as HelperRules,
  preflights as HelperPreflights,
  shortcuts as HelperShortcuts
} from './core/helpers.unocss.js'
import {
  preflights as MousePreflights,
  shortcuts as MouseShortcuts,
  rules as MouseRules
} from './core/mouse.unocss.js'
import { shortcuts as OrientationShortcuts } from './core/orientation.unocss.js'
import { shortcuts as PositionShortcuts } from './core/position.unocss.js'
import {
  preflights as SizePreflights,
  shortcuts as SizeShortcuts
} from './core/size.unocss.js'
import { shortcuts as TouchShortcuts } from './core/touch.unocss.js'
import {
  preflights as TransitionPreflights,
  shortcuts as TransitionsShortcuts
} from './core/transitions.unocss.js'
import {
  preflights as TypographyPreflights,
  shortcuts as TypographyShortcuts
} from './core/typography.unocss.js'
import {
  rules as VisibilityRules,
  preflights as VisibilityPreflights,
  shortcuts as VisibilityShortcuts
} from './core/visibility.unocss.js'

import { shortcuts as QHeaderShortcuts } from './components/QHeader.unocss.js'
import { shortcuts as QFooterShortcuts } from './components/QFooter.unocss.js'
import { shortcuts as QDrawerShortcuts } from './components/QDrawer.unocss.js'
import {
  type QuasarComponents,
  type QuasarIconSet,
  type QuasarPlugins
} from 'quasar'

export interface QuasarPresetOptions {
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
}

const extractKeys = (obj: Record<string, any>) =>
  Object.values(obj).reduce((acc, cur) => {
    if (typeof cur === 'string') acc.push(cur)
    else if (typeof cur === 'object') acc = acc.concat(extractKeys(cur))
    return acc
  }, [] as string[])

const toKebabCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-') ?? ''

const componentsSafelistMap: Partial<Record<keyof QuasarComponents, string[]>> =
  {
    QSelect: ['q-list', 'q-item', 'q-virtual-scroll', 'q-menu']
  }

const pluginSafelistMap: Partial<Record<keyof QuasarPlugins, string[]>> = {
  BottomSheet: [
    'q-bottom-sheet',
    'q-bottom-sheet__avatar',
    'q-bottom-sheet--list',
    'q-bottom-sheet--grid',
    'q-bottom-sheet__item'
  ],
  Dialog: [
    'q-dialog__title',
    'q-dialog__progress',
    'q-dialog__inner',
    'q-dialog__inner--square',
    'q-dialog__inner--minimized',
    'q-dialog__inner--maximized',
    'q-dialog__inner--top',
    'q-dialog__inner--bottom',
    'q-dialog__inner--right',
    'q-dialog__inner--left',
    'q-dialog__inner--fullwidth',
    'q-dialog__inner--fullheight',
    'q-dialog__backdrop',
    'q-btn',
    'q-btn--actionable',
    'q-btn--no-uppercase',
    'q-btn--rectangle',
    'q-btn--outline',
    'q-btn--push',
    'q-btn--rounded',
    'q-btn--round',
    'q-btn--square',
    'q-btn--flat',
    'q-btn--unelevated',
    'q-btn--dense',
    'q-btn--fab',
    'q-btn--fab-mini',
    'q-btn__content',
    'q-btn__content--hidden',
    'q-btn__progress',
    'q-btn__progress-indicator',
    'q-btn__progress--dark',
    'q-card',
    'q-card--bordered',
    'q-card--dark',
    'q-card__section',
    'q-card__section--vert',
    'q-card__section--horiz',
    'q-card__actions',
    'q-card__actions--horiz',
    'q-card__actions--vert',
    'q-separator--spaced',
    'q-textarea',
    'q-textarea--autogrow',
    'q-field',
    'q-field--with-bottom',
    'q-field__marginal',
    'q-field__before',
    'q-field__prepend',
    'q-field__after',
    'q-field__append',
    'q-field__inner',
    'q-field__bottom',
    'q-field__bottom--animated',
    'q-field__messages',
    'q-field__counter',
    'q-field--item-aligned',
    'q-field__control-container',
    'q-field__control',
    'q-field__shadow',
    'q-field__native',
    'q-field__prefix',
    'q-field__suffix',
    'q-field__input',
    'q-field--readonly',
    'q-field--disabled',
    'q-field__label',
    'q-field--float',
    'q-field--highlighted',
    'q-field--filled',
    'q-field--outlined',
    'q-field--standard',
    'q-field--dark',
    'q-field--standout',
    'q-field--labeled',
    'q-field--dense',
    'q-field--borderless',
    'q-field--error',
    'q-field__focusable-action',
    'q-field--auto-height',
    'q-field--square',
    'q-option-group--inline',
    'q-spinner',
    'q-spinner-mat'
  ],
  LoadingBar: [
    'q-loading-bar',
    'q-loading-bar--top',
    'q-loading-bar--bottom',
    'q-loading-bar--right',
    'q-loading-bar--left'
  ],
  Notify: [
    'q-avatar',
    'q-avatar__content',
    'q-avatar--square',
    'q-icon',
    'q-btn',
    'q-btn--actionable',
    'q-btn--no-uppercase',
    'q-btn--rectangle',
    'q-btn--outline',
    'q-btn--push',
    'q-btn--rounded',
    'q-btn--round',
    'q-btn--square',
    'q-btn--flat',
    'q-btn--unelevated',
    'q-btn--dense',
    'q-btn--fab',
    'q-btn--fab-mini',
    'q-btn__content',
    'q-btn__content--hidden',
    'q-btn__progress',
    'q-btn__progress-indicator',
    'q-btn__progress--dark',
    'q-spinner',
    'q-spinner-mat',
    'q-notifications__list',
    'q-notifications__list--center',
    'q-notifications__list--top',
    'q-notifications__list--bottom',
    'q-notification',
    'q-notification__icon',
    'q-notification__icon--additional',
    'q-notification__avatar',
    'q-notification__avatar--additional',
    'q-notification__spinner',
    'q-notification__spinner--additional',
    'q-notification__message',
    'q-notification__caption',
    'q-notification__actions',
    'q-notification__badge',
    'q-notification__badge--top-left',
    'q-notification__badge--top-right',
    'q-notification__badge--bottom-left',
    'q-notification__badge--bottom-right',
    'q-notification__progress',
    'q-notification--standard',
    'q-notification--multi-line',
    'q-notification--top-left-enter-from',
    'q-notification--top-left-leave-to',
    'q-notification--top-enter-from',
    'q-notification--top-leave-to',
    'q-notification--top-right-enter-from',
    'q-notification--top-right-leave-to',
    'q-notification--left-enter-from',
    'q-notification--left-leave-to',
    'q-notification--center-enter-from',
    'q-notification--center-leave-to',
    'q-notification--right-enter-from',
    'q-notification--right-leave-to',
    'q-notification--bottom-left-enter-from',
    'q-notification--bottom-left-leave-to',
    'q-notification--bottom-enter-from',
    'q-notification--bottom-leave-to',
    'q-notification--bottom-right-enter-from',
    'q-notification--bottom-right-leave-to',
    'q-notification--top-left-leave-active',
    'q-notification--top-leave-active',
    'q-notification--top-right-leave-active',
    'q-notification--left-leave-active',
    'q-notification--center-leave-active',
    'q-notification--right-leave-active',
    'q-notification--bottom-left-leave-active',
    'q-notification--bottom-leave-active',
    'q-notification--bottom-right-leave-active'
  ]
}

const baseSafelist = [
  'relative-position',
  'q-panel-parent',
  'inline',
  'bg-primary',
  'col',
  'row',
  'text-primary',
  'absolute',
  'absolute-bottom',
  'absolute-full',
  'absolute-right',
  'absolute-top',
  'block',
  'border-radius-inherit',
  'column',
  'content-center',
  'cursor-pointer',
  'disabled',
  'ellipsis',
  'fit',
  'fixed',
  'fixed-bottom',
  'fixed-full',
  'fixed-left',
  'fixed-right',
  'fixed-top',
  'flex',
  'flex-center',
  'full-width',
  'fullscreen',
  'glossy',
  'hidden',
  'hide-scrollbar',
  'invisible',
  'items-center',
  'items-end',
  'items-start',
  'items-stretch',
  'justify-between',
  'justify-center',
  'justify-end',
  'justify-start',
  'no-border',
  'no-border-radius',
  'no-outline',
  'no-pointer-events',
  'no-pointer-events--children',
  'no-shadow',
  'no-transition',
  'no-wrap',
  'non-selectable',
  'on-left',
  'on-right',
  'overflow-auto',
  'overflow-hidden',
  'q-animate--scale',
  'q-body--force-scrollbar-x',
  'q-body--force-scrollbar-y',
  'q-body--fullscreen-mixin',
  'q-body--prevent-scroll',
  'q-dark',
  'q-focus-helper',
  'q-focusable',
  'q-gutter-x-sm',
  'q-gutter-xs',
  'q-hoverable',
  'q-link',
  'q-link--focusable',
  'q-manual-focusable',
  'q-placeholder',
  'q-position-engine',
  'readonly',
  'relative-position',
  'rotate-180',
  'rounded-borders',
  'row',
  'scroll',
  'scroll-x',
  'scroll-y',
  'self-center',
  'self-end',
  'self-start',
  'self-stretch',
  'text-body2',
  'text-caption',
  'text-center',
  'text-no-wrap',
  'text-overline',
  'transparent',
  'wrap',
  'z-max',
  'z-top'
  // 'q-animate--scale',
  // 'q-animate--fade',
  // 'inset-shadow',
  // 'inset-shadow-down',
  // 'no-shadow',
  // 'shadow-0',
  // 'z-marginals',
  // 'z-notify',
  // 'z-fullscreen',
  // 'z-inherit',
  // 'row',
  // 'column',
  // 'flex',
  // 'wrap',
  // 'no-wrap',
  // 'reverse-wrap',
  // 'order-first',
  // 'order-last',
  // 'order-none',
  // 'justify-start',
  // 'justify-end',
  // 'justify-center',
  // 'flex-center',
  // 'justify-between',
  // 'justify-around',
  // 'justify-evenly',
  // 'items-start',
  // 'items-end',
  // 'items-center',
  // 'items-baseline',
  // 'items-stretch',
  // 'content-start',
  // 'content-end',
  // 'content-center',
  // 'content-stretch',
  // 'content-between',
  // 'content-around',
  // 'self-start',
  // 'self-end',
  // 'self-center',
  // 'self-baseline',
  // 'self-stretch',
  // 'q-gutter-x-none',
  // 'q-gutter-none',
  // 'q-gutter-y-none',
  // 'q-col-gutter-x-none',
  // 'q-col-gutter-none',
  // 'q-col-gutter-y-none',
  // 'q-gutter-x-xs',
  // 'q-gutter-xs',
  // 'q-gutter-y-xs',
  // 'q-col-gutter-x-xs',
  // 'q-col-gutter-xs',
  // 'q-col-gutter-y-xs',
  // 'q-gutter-x-sm',
  // 'q-gutter-sm',
  // 'q-gutter-y-sm',
  // 'q-col-gutter-x-sm',
  // 'q-col-gutter-sm',
  // 'q-col-gutter-y-sm',
  // 'q-gutter-x-md',
  // 'q-gutter-md',
  // 'q-gutter-y-md',
  // 'q-col-gutter-x-md',
  // 'q-col-gutter-md',
  // 'q-col-gutter-y-md',
  // 'q-gutter-x-lg',
  // 'q-gutter-lg',
  // 'q-gutter-y-lg',
  // 'q-col-gutter-x-lg',
  // 'q-col-gutter-lg',
  // 'q-col-gutter-y-lg',
  // 'q-gutter-x-xl',
  // 'q-gutter-xl',
  // 'q-gutter-y-xl',
  // 'q-col-gutter-x-xl',
  // 'q-col-gutter-xl',
  // 'q-col-gutter-y-xl',
  // 'rounded-borders',
  // 'border-radius-inherit',
  // 'no-transition',
  // 'transition-0',
  // 'glossy',
  // 'q-placeholder',
  // 'q-body--fullscreen-mixin',
  // 'q-body--prevent-scroll',
  // 'q-body--force-scrollbar-x',
  // 'q-body--force-scrollbar-y',
  // 'q-no-input-spinner',
  // 'q-link',
  // 'q-link--focusable',
  // 'non-selectable',
  // 'scroll',
  // 'scroll-x',
  // 'scroll-y',
  // 'no-scroll',
  // 'no-pointer-events',
  // 'no-pointer-events--children',
  // 'all-pointer-events',
  // 'cursor-pointer',
  // 'cursor-not-afllowed',
  // 'cursor-inherit',
  // 'cursor-none',
  // 'rotate-45',
  // 'rotate-90',
  // 'rotate-135',
  // 'rotate-180',
  // 'rotate-225',
  // 'rotate-270',
  // 'rotate-315',
  // 'flip-horizontal',
  // 'flip-vertical',
  // 'float-left',
  // 'float-right',
  // 'relative-position',
  // 'fixed',
  // 'fixed-full',
  // 'fullscreen',
  // 'fixed-center',
  // 'fixed-bottom',
  // 'fixed-left',
  // 'fixed-right',
  // 'fixed-top',
  // 'fixed-top-left',
  // 'fixed-top-right',
  // 'fixed-bottom-left',
  // 'fixed-bottom-right',
  // 'absolute',
  // 'absolute-full',
  // 'absolute-center',
  // 'absolute-bottom',
  // 'absolute-left',
  // 'absolute-right',
  // 'absolute-top',
  // 'absolute-top-left',
  // 'absolute-top-right',
  // 'absolute-bottom-left',
  // 'absolute-bottom-right',
  // 'vertical-top',
  // 'vertical-middle',
  // 'vertical-bottom',
  // 'on-left',
  // 'on-right',
  // 'q-position-engine',
  // 'fit',
  // 'full-height',
  // 'full-width',
  // 'window-height',
  // 'window-width',
  // 'block',
  // 'inline-block',
  // 'q-touch',
  // 'q-touch-x',
  // 'q-touch-y',
  // 'q-transition--slide-right-enter-active',
  // 'q-transition--slide-right-leave-active',
  // 'q-transition--slide-left-enter-active',
  // 'q-transition--slide-left-leave-active',
  // 'q-transition--slide-up-enter-active',
  // 'q-transition--slide-up-leave-active',
  // 'q-transition--slide-down-enter-active',
  // 'q-transition--slide-down-leave-active',
  // 'q-transition--jump-right-enter-active',
  // 'q-transition--jump-right-leave-active',
  // 'q-transition--jump-left-enter-active',
  // 'q-transition--jump-left-leave-active',
  // 'q-transition--jump-up-enter-active',
  // 'q-transition--jump-up-leave-active',
  // 'q-transition--jump-down-enter-active',
  // 'q-transition--jump-down-leave-active',
  // 'q-transition--fade-enter-active',
  // 'q-transition--fade-leave-active',
  // 'q-transition--scale-enter-active',
  // 'q-transition--scale-leave-active',
  // 'q-transition--rotate-enter-active',
  // 'q-transition--rotate-leave-active',
  // 'q-transition--flip-enter-active',
  // 'q-transition--flip-leave-active',
  // 'q-transition--slide-right-enter-from',
  // 'q-transition--slide-right-leave-to',
  // 'q-transition--slide-left-enter-from',
  // 'q-transition--slide-left-leave-to',
  // 'q-transition--slide-up-enter-from',
  // 'q-transition--slide-up-leave-to',
  // 'q-transition--slide-down-enter-from',
  // 'q-transition--slide-down-leave-to',
  // 'q-transition--jump-right-enter-from',
  // 'q-transition--jump-right-leave-to',
  // 'q-transition--jump-left-enter-from',
  // 'q-transition--jump-left-leave-to',
  // 'q-transition--jump-up-enter-from',
  // 'q-transition--jump-up-leave-to',
  // 'q-transition--jump-down-enter-from',
  // 'q-transition--jump-down-leave-to',
  // 'q-transition--fade-enter-from',
  // 'q-transition--fade-leave-to',
  // 'q-transition--scale-enter-from',
  // 'q-transition--scale-leave-to',
  // 'q-transition--rotate-enter-from',
  // 'q-transition--rotate-leave-to',
  // 'q-transition--flip-right-enter-active',
  // 'q-transition--flip-right-leave-active',
  // 'q-transition--flip-left-enter-active',
  // 'q-transition--flip-left-leave-active',
  // 'q-transition--flip-up-enter-active',
  // 'q-transition--flip-up-leave-active',
  // 'q-transition--flip-down-enter-active',
  // 'q-transition--flip-down-leave-active',
  // 'q-transition--flip-right-enter-to',
  // 'q-transition--flip-right-leave-from',
  // 'q-transition--flip-left-enter-to',
  // 'q-transition--flip-left-leave-from',
  // 'q-transition--flip-up-enter-to',
  // 'q-transition--flip-up-leave-from',
  // 'q-transition--flip-down-enter-to',
  // 'q-transition--flip-down-leave-from',
  // 'q-transition--flip-right-enter-from',
  // 'q-transition--flip-right-leave-to',
  // 'q-transition--flip-left-enter-from',
  // 'q-transition--flip-left-leave-to',
  // 'q-transition--flip-up-enter-from',
  // 'q-transition--flip-up-leave-to',
  // 'q-transition--flip-down-enter-from',
  // 'q-transition--flip-down-leave-to',
  // 'text-h1',
  // 'text-h2',
  // 'text-h3',
  // 'text-h4',
  // 'text-h5',
  // 'text-h6',
  // 'text-subtitle1',
  // 'text-subtitle2',
  // 'text-body1',
  // 'text-body2',
  // 'text-overline',
  // 'text-caption',
  // 'text-uppercase',
  // 'text-lowercase',
  // 'text-capitalize',
  // 'text-center',
  // 'text-left',
  // 'text-right',
  // 'text-justify',
  // 'text-italic',
  // 'text-bold',
  // 'text-no-wrap',
  // 'text-strike',
  // 'text-weight-thin',
  // 'text-weight-light',
  // 'text-weight-regular',
  // 'text-weight-medium',
  // 'text-weight-bold',
  // 'text-weight-bolder',
  // 'no-margin',
  // 'no-padding',
  // 'no-border',
  // 'no-border-radius',
  // 'no-box-shadow',
  // 'no-outline',
  // 'ellipsis',
  // 'ellipsis-2-lines',
  // 'ellipsis-3-lines',
  // 'readonly',
  // 'disabled',
  // 'hidden',
  // 'invisible',
  // 'transparent',
  // 'overflow-auto',
  // 'overflow-hidden',
  // 'overflow-hidden-y',
  // 'hide-scrollbar',
  // 'dimmed',
  // 'light-dimmed',
  // 'z-top',
  // 'z-max',
  // 'q-focus-helper',
  // 'q-focusable',
  // 'q-manual-focusable',
  // 'q-hoverable',
  // 'q-dark'
]

const qClasses = [
  'q-icon',
  'q-panel',
  'q-panel-parent',
  'q-loading-bar',
  'q-loading-bar--top',
  'q-loading-bar--bottom',
  'q-loading-bar--right',
  'q-loading-bar--left',
  'q-avatar',
  'q-avatar__content',
  'q-avatar--square',
  'q-badge',
  'q-badge--single-line',
  'q-badge--multi-line',
  'q-badge--floating',
  'q-badge--transparent',
  'q-badge--outline',
  'q-badge--rounded',
  'q-banner',
  'q-banner--top-padding',
  'q-banner__avatar',
  'q-banner__actions',
  'q-banner--dense',
  'q-bar',
  'q-bar--standard',
  'q-bar--dense',
  'q-bar--dark',
  'q-breadcrumbs__el',
  'q-breadcrumbs__el-icon',
  'q-breadcrumbs__el-icon--with-label',
  'q-btn',
  'q-btn--actionable',
  'q-btn--no-uppercase',
  'q-btn--rectangle',
  'q-btn--outline',
  'q-btn--push',
  'q-btn--rounded',
  'q-btn--round',
  'q-btn--square',
  'q-btn--flat',
  'q-btn--unelevated',
  'q-btn--dense',
  'q-btn--fab',
  'q-btn--fab-mini',
  'q-btn__content',
  'q-btn__content--hidden',
  'q-btn__progress',
  'q-btn__progress-indicator',
  'q-btn__progress--dark',
  'q-btn-dropdown--split',
  'q-btn-dropdown--simple',
  'q-btn-dropdown__arrow',
  'q-btn-dropdown--current',
  'q-btn-group',
  'q-btn-group--push',
  'q-btn-group--push',
  'q-btn-group--rounded',
  'q-btn-group--square',
  'q-btn-group--flat',
  'q-btn-group--outline',
  'q-btn-group--unelevated',
  'q-btn-group--stretch',
  'q-btn-group--glossy',
  'q-btn-group--spread',
  'q-btn-group--spread',
  'q-btn-toggle',
  'q-card',
  'q-card--bordered',
  'q-card--dark',
  'q-card__section',
  'q-card__section--vert',
  'q-card__section--horiz',
  'q-card__actions',
  'q-card__actions--horiz',
  'q-card__actions--vert',
  'q-carousel',
  'q-carousel__slide',
  'q-carousel__slides-container',
  'q-carousel__control',
  'q-carousel__arrow',
  'q-carousel__prev-arrow--horizontal',
  'q-carousel__next-arrow--horizontal',
  'q-carousel__prev-arrow--vertical',
  'q-carousel__next-arrow--vertical',
  'q-carousel__navigation--top',
  'q-carousel__navigation--bottom',
  'q-carousel__navigation--left',
  'q-carousel__navigation--right',
  'q-carousel__navigation-inner',
  'q-carousel__navigation',
  'q-carousel__navigation-icon--inactive',
  'q-carousel--navigation-top',
  'q-carousel--arrows-vertical',
  'q-carousel--navigation-bottom',
  'q-carousel--navigation-left',
  'q-carousel--arrows-horizontal',
  'q-carousel--navigation-right',
  'q-message-name',
  'q-message-label',
  'q-message-stamp',
  'q-message-avatar',
  'q-message',
  'q-message-avatar--received',
  'q-message-text--received',
  'q-message-text-content--received',
  'q-message-name--sent',
  'q-message-avatar--sent',
  'q-message-container--sent',
  'q-message-text--sent',
  'q-message-text-content--sent',
  'q-message-text',
  'q-checkbox',
  'q-checkbox__native',
  'q-checkbox__bg',
  'q-checkbox__icon-container',
  'q-checkbox__icon',
  'q-checkbox__svg',
  'q-checkbox__truthy',
  'q-checkbox__indet',
  'q-checkbox__inner',
  'q-checkbox__inner--truthy',
  'q-checkbox__inner--indet',
  'q-checkbox--dark',
  'q-checkbox--dense',
  'q-chip',
  'q-chip--colored',
  'q-chip--dark',
  'q-chip--outline',
  'q-chip--selected',
  'q-chip__icon',
  'q-chip__icon--left',
  'q-chip__icon--right',
  'q-chip__icon--remove',
  'q-chip__content',
  'q-chip--dense',
  'q-chip--square',
  'q-circular-progress',
  'q-circular-progress__svg',
  'q-circular-progress__text',
  'q-circular-progress--indeterminate',
  'q-color-picker',
  'q-color-picker--bordered',
  'q-color-picker__header-tabs',
  'q-color-picker__header-banner',
  'q-color-picker__header',
  'q-color-picker__error-icon',
  'q-color-picker__header-content',
  'q-color-picker__header-content--light',
  'q-color-picker__header-content--dark',
  'q-color-picker__header-bg',
  'q-color-picker__footer',
  'q-color-picker__spectrum',
  'q-color-picker__spectrum-tab',
  'q-color-picker__spectrum-white',
  'q-color-picker__spectrum-black',
  'q-color-picker__spectrum-circle',
  'q-color-picker__hue',
  'q-color-picker__alpha',
  'q-color-picker__sliders',
  'q-color-picker__tune-tab',
  'q-color-picker__palette-tab',
  'q-color-picker__palette-rows--editable',
  'q-color-picker__cube',
  'q-color-picker--dark',
  'q-date',
  'q-date--bordered',
  'q-date__header',
  'q-date__actions',
  'q-date__content',
  'q-date__main',
  'q-date__header-link',
  'q-date__header-link--active',
  'q-date__header-subtitle',
  'q-date__header-title-label',
  'q-date__view',
  'q-date__navigation',
  'q-date__calendar-weekdays',
  'q-date__calendar-item',
  'q-date__calendar-item--out',
  'q-date__calendar-item--fill',
  'q-date__range',
  'q-date__range-from',
  'q-date__range-to',
  'q-date__edit-range',
  'q-date__edit-range-from',
  'q-date__edit-range-from-to',
  'q-date__edit-range-to',
  'q-date__calendar-days-container',
  'q-date__calendar-days',
  'q-date__event',
  'q-date__today',
  'q-date__years-content',
  'q-date__years-item',
  'q-date__months-item',
  'q-date--readonly',
  'q-date--portrait',
  'q-date--portrait-standard',
  'q-date--portrait-minimal',
  'q-date--landscape',
  'q-date--landscape-standard',
  'q-date--landscape-minimal',
  'q-date--dark',
  'q-dialog__title',
  'q-dialog__progress',
  'q-dialog__inner',
  'q-dialog__inner--square',
  'q-dialog__inner--minimized',
  'q-dialog__inner--maximized',
  'q-dialog__inner--top',
  'q-dialog__inner--bottom',
  'q-dialog__inner--right',
  'q-dialog__inner--left',
  'q-dialog__inner--fullwidth',
  'q-dialog__inner--fullheight',
  'q-dialog__backdrop',
  'q-body--dialog',
  'q-editor',
  'q-editor__toolbars-container',
  'q-editor__content',
  'q-editor__toolbar',
  'q-editor__toolbar-group',
  'q-editor__link-input',
  'q-editor--flat',
  'q-editor--dense',
  'q-editor--dark',
  'q-expansion-item__border',
  'q-expansion-item__toggle-icon',
  'q-expansion-item__toggle-icon--rotated',
  'q-expansion-item__toggle-focus',
  'q-expansion-item--standard',
  'q-expansion-item--popup',
  'q-expansion-item__content',
  'q-expansion-item',
  'q-expansion-item--expanded',
  'q-expansion-item--expanded',
  'q-fab',
  'q-fab--form-rounded',
  'q-fab--form-square',
  'q-fab__icon',
  'q-fab__active-icon',
  'q-fab__label--external',
  'q-fab__label--external-hidden',
  'q-fab__label--external-left',
  'q-fab__label--external-right',
  'q-fab__label--external-bottom',
  'q-fab__label--external-top',
  'q-fab__label--internal',
  'q-fab__label--internal-hidden',
  'q-fab__label--internal-top',
  'q-fab__label--internal-bottom',
  'q-fab__label--internal-left',
  'q-fab__label--internal-right',
  'q-fab__icon-holder',
  'q-fab__icon-holder--opened',
  'q-fab__actions',
  'q-fab__actions--right',
  'q-fab__actions--left',
  'q-fab__actions--up',
  'q-fab__actions--down',
  'q-fab__actions--opened',
  'q-fab--align-left',
  'q-fab--align-right',
  'q-field',
  'q-field--with-bottom',
  'q-field__marginal',
  'q-field__before',
  'q-field__prepend',
  'q-field__after',
  'q-field__append',
  'q-field__inner',
  'q-field__bottom',
  'q-field__bottom--animated',
  'q-field__messages',
  'q-field__counter',
  'q-field--item-aligned',
  'q-field__control-container',
  'q-field__control',
  'q-field__shadow',
  'q-field__native',
  'q-field__prefix',
  'q-field__suffix',
  'q-field__input',
  'q-field--readonly',
  'q-field--disabled',
  'q-field__label',
  'q-field--float',
  'q-field--highlighted',
  'q-field--filled',
  'q-field--outlined',
  'q-field--standard',
  'q-field--dark',
  'q-field--standout',
  'q-field--labeled',
  'q-field--dense',
  'q-field--borderless',
  'q-field--error',
  'q-field__focusable-action',
  'q-field--auto-height',
  'q-field--square',
  'q-transition--field-message-enter-active',
  'q-transition--field-message-leave-active',
  'q-transition--field-message-enter-from',
  'q-transition--field-message-leave-to',
  'q-transition--field-message-leave-from',
  'q-file',
  'q-file__filler',
  'q-file__dnd',
  'q-form',
  'q-img',
  'q-img__loading',
  'q-img__container',
  'q-img__image',
  'q-img__image--with-transition',
  'q-img__image--loaded',
  'q-img__content',
  'q-img--no-menu',
  'q-inner-loading',
  'q-inner-loading--dark',
  'q-inner-loading__label',
  'q-textarea',
  'q-textarea--autogrow',
  'q-intersection',
  'q-item',
  'q-item__section--side',
  'q-item__section--avatar',
  'q-item__section--thumbnail',
  'q-item__section--nowrap',
  'q-item__label',
  'q-item__label--overline',
  'q-item__label--caption',
  'q-item__label--header',
  'q-separator--spaced',
  'q-list--padding',
  'q-item__section--main',
  'q-list--bordered',
  'q-list--separator',
  'q-list--dense',
  'q-item--dense',
  'q-list--dark',
  'q-item--dark',
  'q-item--active',
  'q-knob',
  'q-knob--editable',
  'q-layout',
  'q-layout-container',
  'q-layout__shadow',
  'q-layout__section--marginal',
  'q-header--hidden',
  'q-header--bordered',
  'q-header',
  'q-footer--hidden',
  'q-footer--bordered',
  'q-footer',
  'q-drawer',
  'q-drawer--on-top',
  'q-drawer--left',
  'q-drawer--right',
  'q-drawer-container',
  'q-drawer--mini',
  'q-drawer--mini-animate',
  'q-drawer--standard',
  'q-drawer--mobile',
  'q-drawer__backdrop',
  'q-drawer__opener',
  'q-page',
  'q-page-sticky--shrink',
  'q-body--layout-animate',
  'q-body--drawer-toggle',
  'q-linear-progress',
  'q-linear-progress__model',
  'q-linear-progress__track',
  'q-linear-progress__model--with-transition',
  'q-linear-progress__track--with-transition',
  'q-linear-progress--reverse',
  'q-linear-progress__model--determinate',
  'q-linear-progress__model--indeterminate',
  'q-linear-progress__model--query',
  'q-linear-progress__track--light',
  'q-linear-progress__track--dark',
  'q-linear-progress__stripe',
  'q-linear-progress__stripe--with-transition',
  'q-menu',
  'q-menu--square',
  'q-menu--dark',
  'q-option-group--inline',
  'q-pagination',
  'q-pagination__content',
  'q-pagination__middle',
  'q-parallax',
  'q-parallax__media',
  'q-popup-edit',
  'q-popup-edit__buttons',
  'q-pull-to-refresh',
  'q-pull-to-refresh__puller',
  'q-pull-to-refresh__puller--animating',
  'q-radio',
  'q-radio__native',
  'q-radio__bg',
  'q-radio__icon-container',
  'q-radio__icon',
  'q-radio__check',
  'q-radio__inner',
  'q-radio__inner--truthy',
  'q-radio--dark',
  'q-radio--dense',
  'q-rating',
  'q-rating__icon-container',
  'q-rating__icon',
  'q-rating__icon--hovered',
  'q-rating__icon--active',
  'q-rating__icon--exselected',
  'q-rating--no-dimming',
  'q-rating--editable',
  'q-responsive',
  'q-responsive__filler',
  'q-responsive__content',
  'q-scrollarea',
  'q-scrollarea__bar',
  'q-scrollarea__thumb',
  'q-scrollarea__bar--v',
  'q-scrollarea__thumb--v',
  'q-scrollarea__bar--h',
  'q-scrollarea__thumb--h',
  'q-scrollarea__bar--invisible',
  'q-scrollarea__thumb--invisible',
  'q-scrollarea__content',
  'q-scrollarea--dark',
  'q-select--without-input',
  'q-select--with-input',
  'q-select',
  'q-select__focus-target',
  'q-select__autocomplete-input',
  'q-select__dropdown-icon',
  'q-select__dialog',
  'q-separator',
  'q-separator--dark',
  'q-separator--horizontal',
  'q-separator--horizontal-inset',
  'q-separator--horizontal-item-inset',
  'q-separator--horizontal-item-thumbnail-inset',
  'q-separator--vertical',
  'q-separator--vertical-inset',
  'q-skeleton',
  'q-skeleton--anim',
  'q-skeleton--type-text',
  'q-skeleton--type-circle',
  'q-skeleton--type-QAvatar',
  'q-skeleton--type-QBtn',
  'q-skeleton--type-QBadge',
  'q-skeleton--type-QChip',
  'q-skeleton--type-QToolbar',
  'q-skeleton--type-QCheckbox',
  'q-skeleton--type-QRadio',
  'q-skeleton--type-QToggle',
  'q-skeleton--type-QSlider',
  'q-skeleton--type-QRange',
  'q-skeleton--type-QInput',
  'q-skeleton--bordered',
  'q-skeleton--square',
  'q-skeleton--anim-fade',
  'q-skeleton--anim-pulse',
  'q-skeleton--anim-pulse-x',
  'q-skeleton--anim-pulse-y',
  'q-skeleton--anim-wave',
  'q-skeleton--anim-blink',
  'q-skeleton--anim-pop',
  'q-skeleton--dark',
  'q-slide-item',
  'q-slide-item__left',
  'q-slide-item__right',
  'q-slide-item__top',
  'q-slide-item__bottom',
  'q-slide-item__content',
  'q-slider',
  'q-slider--h',
  'q-slider--v',
  'q-slider--editable',
  'q-slider__track-container',
  'q-slider__track-container--h',
  'q-slider__track-container--v',
  'q-slider__track',
  'q-slider__inner',
  'q-slider__selection',
  'q-slider__markers',
  'q-slider__markers--h',
  'q-slider__markers--v',
  'q-slider__marker-labels-container',
  'q-slider__marker-labels',
  'q-slider__marker-labels--h-standard',
  'q-slider__marker-labels--h-switched',
  'q-slider__marker-labels--h-ltr',
  'q-slider__marker-labels--h-rtl',
  'q-slider__marker-labels--v-standard',
  'q-slider__marker-labels--v-switched',
  'q-slider__marker-labels--v-ltr',
  'q-slider__marker-labels--v-rtl',
  'q-slider__thumb',
  'q-slider__thumb--h',
  'q-slider__thumb--h-ltr',
  'q-slider__thumb--h-rtl',
  'q-slider__thumb--v',
  'q-slider__thumb--v-ltr',
  'q-slider__thumb--v-rtl',
  'q-slider__thumb-shape',
  'q-slider__focus-ring',
  'q-slider__pin',
  'q-slider__pin--h',
  'q-slider__pin--h-standard',
  'q-slider__pin--h-switched',
  'q-slider__pin--v',
  'q-slider__pin--v-standard',
  'q-slider__pin--v-switched',
  'q-slider__label',
  'q-slider__label--h',
  'q-slider__label--h-standard',
  'q-slider__label--h-switched',
  'q-slider__label--v',
  'q-slider__label--v-standard',
  'q-slider__label--v-switched',
  'q-slider__text-container',
  'q-slider__text',
  'q-slider--no-value',
  'q-slider--focus',
  'q-slider--inactive',
  'q-slider--active',
  'q-slider--label',
  'q-slider--dark',
  'q-slider--dense',
  'q-space',
  'q-spinner',
  'q-spinner-mat',
  'q-splitter__panel',
  'q-splitter__separator',
  'q-splitter__separator-area',
  'q-splitter--dark',
  'q-splitter--vertical',
  'q-splitter--horizontal',
  'q-splitter__before',
  'q-splitter__after',
  'q-stepper',
  'q-stepper__title',
  'q-stepper__caption',
  'q-stepper__dot',
  'q-stepper__tab',
  'q-stepper--dark',
  'q-stepper__tab--navigation',
  'q-stepper__tab--active',
  'q-stepper__tab--done',
  'q-stepper__tab--disabled',
  'q-stepper__tab--error',
  'q-stepper__tab--error-with-icon',
  'q-stepper__header',
  'q-stepper__header--border',
  'q-stepper__header--standard-labels',
  'q-stepper__header--alternative-labels',
  'q-stepper__header--contracted',
  'q-stepper__header--contracted',
  'q-stepper__nav',
  'q-stepper--flat',
  'q-stepper--bordered',
  'q-stepper--horizontal',
  'q-stepper--vertical',
  'q-tab-panels',
  'q-tab-panel',
  'q-markup-table',
  'q-table',
  'q-table__card',
  'q-table__container',
  'q-table__top',
  'q-table__title',
  'q-table__separator',
  'q-table__progress',
  'q-table__middle',
  'q-table__bottom',
  'q-table__bottom-nodata-icon',
  'q-table__bottom-item',
  'q-table__control',
  'q-table__sort-icon',
  'q-table__sort-icon--left',
  'q-table__sort-icon--center',
  'q-table__sort-icon--right',
  'q-table--col-auto-width',
  'q-table__card--dark',
  'q-table--dark',
  'q-table--flat',
  'q-table--bordered',
  'q-table--square',
  'q-table__linear-progress',
  'q-table--no-wrap',
  'q-table--grid',
  'q-table__grid-item-card',
  'q-table__grid-item-row',
  'q-table__grid-item-title',
  'q-table__grid-item-value',
  'q-table__grid-item',
  'q-table__grid-item--selected',
  'q-table--horizontal-separator',
  'q-table--cell-separator',
  'q-table--vertical-separator',
  'q-table--dense',
  'q-tab',
  'q-tab--full',
  'q-tab--no-caps',
  'q-tab__content',
  'q-tab__content--inline',
  'q-tab__icon',
  'q-tab__label',
  'q-tab__alert',
  'q-tab__alert-icon',
  'q-tab__indicator',
  'q-tab--active',
  'q-tab--inactive',
  'q-tabs',
  'q-tabs--scrollable',
  'q-tabs--not-scrollable',
  'q-tabs__arrow',
  'q-tabs__content',
  'q-tabs__content--align-center',
  'q-tabs__content--align-right',
  'q-tabs__content--align-justify',
  'q-tabs__offset',
  'q-tabs--horizontal',
  'q-tabs--vertical',
  'q-tabs--dense',
  'q-time',
  'q-time--bordered',
  'q-time__header',
  'q-time__actions',
  'q-time__header-label',
  'q-time__link',
  'q-time__link--active',
  'q-time__header-ampm',
  'q-time__content',
  'q-time__container-parent',
  'q-time__container-child',
  'q-time__clock',
  'q-time__clock-circle',
  'q-time__clock-center',
  'q-time__clock-pointer',
  'q-time__clock-position',
  'q-time__clock-position--disable',
  'q-time__clock-position--active',
  'q-time__clock-pos-0',
  'q-time__clock-pos-1',
  'q-time__clock-pos-2',
  'q-time__clock-pos-3',
  'q-time__clock-pos-4',
  'q-time__clock-pos-5',
  'q-time__clock-pos-6',
  'q-time__clock-pos-7',
  'q-time__clock-pos-8',
  'q-time__clock-pos-9',
  'q-time__clock-pos-10',
  'q-time__clock-pos-11',
  'q-time__clock-pos-12',
  'q-time__clock-pos-13',
  'q-time__clock-pos-14',
  'q-time__clock-pos-15',
  'q-time__clock-pos-16',
  'q-time__clock-pos-17',
  'q-time__clock-pos-18',
  'q-time__clock-pos-19',
  'q-time__clock-pos-20',
  'q-time__clock-pos-21',
  'q-time__clock-pos-22',
  'q-time__clock-pos-23',
  'q-time__now-button',
  'q-time--readonly',
  'q-time--portrait',
  'q-time--landscape',
  'q-time--dark',
  'q-timeline',
  'q-timeline--dark',
  'q-timeline__content',
  'q-timeline__title',
  'q-timeline__subtitle',
  'q-timeline__dot',
  'q-timeline__dot-img',
  'q-timeline__heading',
  'q-timeline__heading-title',
  'q-timeline__entry',
  'q-timeline__entry--icon',
  'q-timeline--dense--right',
  'q-timeline--dense--left',
  'q-timeline--comfortable',
  'q-timeline--comfortable--right',
  'q-timeline--comfortable--right',
  'q-timeline--comfortable--left',
  'q-timeline--loose',
  'q-toggle',
  'q-toggle__native',
  'q-toggle__track',
  'q-toggle__thumb',
  'q-toggle__inner',
  'q-toggle__inner--indet',
  'q-toggle__inner--truthy',
  'q-toggle--dark',
  'q-toggle--dense',
  'q-toolbar',
  'q-toolbar--inset',
  'q-toolbar__title',
  'q-tooltip--style',
  'q-tooltip',
  'q-tree',
  'q-tree__node',
  'q-tree__node--disabled',
  'q-tree__node-header',
  'q-tree__children',
  'q-tree__node-body',
  'q-tree__node--parent',
  'q-tree__node--link',
  'q-tree__node-header-content',
  'q-tree__node--selected',
  'q-tree__icon',
  'q-tree__img',
  'q-tree__avatar',
  'q-tree__arrow',
  'q-tree__spinner',
  'q-tree__arrow--rotate',
  'q-tree__tickbox',
  'q-tree--dark',
  'q-tree--no-connectors',
  'q-tree--dense',
  'q-tree--dense',
  'q-uploader',
  'q-uploader--bordered',
  'q-uploader__input',
  'q-uploader__file',
  'q-uploader__header',
  'q-uploader__spinner',
  'q-uploader__header-content',
  'q-uploader__dnd',
  'q-uploader__overlay',
  'q-uploader__list',
  'q-uploader__file--img',
  'q-uploader__file-header',
  'q-uploader__file-header-content',
  'q-uploader__file-status',
  'q-uploader__title',
  'q-uploader__subtitle',
  'q-uploader--disable',
  'q-uploader--dark',
  'q-video',
  'q-video--responsive',
  'q-virtual-scroll',
  'q-virtual-scroll__content',
  'q-virtual-scroll__padding',
  'q-virtual-scroll--horizontal',
  'q-ripple',
  'q-ripple__inner',
  'q-ripple__inner--enter',
  'q-ripple__inner--leave',
  'q-morph--invisible',
  'q-morph--internal',
  'q-bottom-sheet',
  'q-bottom-sheet__avatar',
  'q-bottom-sheet--list',
  'q-bottom-sheet--grid',
  'q-bottom-sheet__item',
  'q-dialog-plugin',
  'q-dialog-plugin__form',
  'q-dialog-plugin--progress',
  'q-loading',
  'q-loading__backdrop',
  'q-loading__box',
  'q-loading__message',
  'q-notifications__list',
  'q-notifications__list--center',
  'q-notifications__list--top',
  'q-notifications__list--bottom',
  'q-notification',
  'q-notification__icon',
  'q-notification__icon--additional',
  'q-notification__avatar',
  'q-notification__avatar--additional',
  'q-notification__spinner',
  'q-notification__spinner--additional',
  'q-notification__message',
  'q-notification__caption',
  'q-notification__actions',
  'q-notification__badge',
  'q-notification__badge--top-left',
  'q-notification__badge--top-right',
  'q-notification__badge--bottom-left',
  'q-notification__badge--bottom-right',
  'q-notification__progress',
  'q-notification--standard',
  'q-notification--multi-line',
  'q-notification--top-left-enter-from',
  'q-notification--top-left-leave-to',
  'q-notification--top-enter-from',
  'q-notification--top-leave-to',
  'q-notification--top-right-enter-from',
  'q-notification--top-right-leave-to',
  'q-notification--left-enter-from',
  'q-notification--left-leave-to',
  'q-notification--center-enter-from',
  'q-notification--center-leave-to',
  'q-notification--right-enter-from',
  'q-notification--right-leave-to',
  'q-notification--bottom-left-enter-from',
  'q-notification--bottom-left-leave-to',
  'q-notification--bottom-enter-from',
  'q-notification--bottom-leave-to',
  'q-notification--bottom-right-enter-from',
  'q-notification--bottom-right-leave-to',
  'q-notification--top-left-leave-active',
  'q-notification--top-leave-active',
  'q-notification--top-right-leave-active',
  'q-notification--left-leave-active',
  'q-notification--center-leave-active',
  'q-notification--right-leave-active',
  'q-notification--bottom-left-leave-active',
  'q-notification--bottom-leave-active',
  'q-notification--bottom-right-leave-active'
]

const generateSafelist = ({
  plugins,
  iconSet
}: {
  plugins?: (keyof QuasarPlugins)[]
  iconSet?: QuasarIconSet
}) => {
  let safelist = baseSafelist
  if (plugins) {
    for (const plugin of plugins) {
      const pluginSafelist = pluginSafelistMap[plugin]
      if (pluginSafelist) safelist = safelist.concat(pluginSafelist)
    }
  }
  if (iconSet) {
    const iconSetSafelist = extractKeys(iconSet)
    if (iconSetSafelist) safelist = safelist.concat(iconSetSafelist)
  }
  return safelist
}

export default definePreset((options: QuasarPresetOptions = {}) => {
  return [
    presetUno(),
    animatedUno(),
    presetIcons({}),
    {
      name: 'quasar',
      presets: [presetUno(), animatedUno(), presetIcons({})],
      safelist: generateSafelist(options),
      preflights: (
        [
          {
            getCSS: ({ theme }) => `/* beasties:include start */
/* Document
 * ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

:where(html) {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  text-size-adjust: 100%; /* 2 */
}

/* Sections
 * ========================================================================== */

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Edge, Firefox, and Safari.
 */

:where(h1) {
  font-size: 2em;
  margin-block-end: 0.67em;
  margin-block-start: 0.67em;
}

/* Grouping content
 * ========================================================================== */

/**
 * Remove the margin on nested lists in Chrome, Edge, and Safari.
 */

:where(dl, ol, ul) :where(dl, ol, ul) {
  margin-block-end: 0;
  margin-block-start: 0;
}

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Correct the inheritance of border color in Firefox.
 */

:where(hr) {
  box-sizing: content-box; /* 1 */
  color: inherit; /* 2 */
  height: 0; /* 1 */
}

/* Text-level semantics
 * ========================================================================== */

/**
 * Add the correct text decoration in Safari.
 */

:where(abbr[title]) {
  text-decoration: underline;
  text-decoration: underline dotted;
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

:where(b, strong) {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

:where(code, kbd, pre, samp) {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

:where(small) {
  font-size: 80%;
}

/* Tabular data
 * ========================================================================== */

/**
 * 1. Correct table border color in Chrome, Edge, and Safari.
 * 2. Remove text indentation from table contents in Chrome, Edge, and Safari.
 */

:where(table) {
  border-color: currentColor; /* 1 */
  text-indent: 0; /* 2 */
}

/* Forms
 * ========================================================================== */

/**
 * Remove the margin on controls in Safari.
 */

:where(button, input, select) {
  margin: 0;
}

/**
 * Remove the inheritance of text transform in Firefox.
 */

:where(button) {
  text-transform: none;
}

/**
 * Correct the inability to style buttons in iOS and Safari.
 */

:where(button, input:is([type="button" i], [type="reset" i], [type="submit" i])) {
  -webkit-appearance: button;
}

/**
 * Add the correct vertical alignment in Chrome, Edge, and Firefox.
 */

:where(progress) {
  vertical-align: baseline;
}

/**
 * Remove the inheritance of text transform in Firefox.
 */

:where(select) {
  text-transform: none;
}

/**
 * Remove the margin in Firefox and Safari.
 */

:where(textarea) {
  margin: 0;
}

/**
 * 1. Correct the odd appearance in Chrome, Edge, and Safari.
 * 2. Correct the outline style in Safari.
 */

:where(input[type="search" i]) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Safari.
 */

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Correct the text style of placeholders in Chrome, Edge, and Safari.
 */

::-webkit-input-placeholder {
  color: inherit;
  opacity: 0.54;
}

/**
 * Remove the inner padding in Chrome, Edge, and Safari on macOS.
 */

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style upload buttons in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/**
 * Remove the inner border and padding of focus outlines in Firefox.
 */

:where(button, input:is([type="button" i], [type="color" i], [type="reset" i], [type="submit" i]))::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus outline styles unset by the previous rule in Firefox.
 */

:where(button, input:is([type="button" i], [type="color" i], [type="reset" i], [type="submit" i]))::-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Remove the additional :invalid styles in Firefox.
 */

:where(:-moz-ui-invalid) {
  box-shadow: none;
}

/* Interactive
 * ========================================================================== */

/*
 * Add the correct styles in Safari.
 */

:where(dialog) {
  background-color: white;
  border: solid;
  color: black;
  height: -moz-fit-content;
  height: fit-content;
  left: 0;
  margin: auto;
  padding: 1em;
  position: absolute;
  right: 0;
  width: -moz-fit-content;
  width: fit-content;
}

:where(dialog:not([open])) {
  display: none;
}

/*
 * Add the correct display in all browsers.
 */

:where(summary) {
  display: list-item;
}

/* * Change font properties to \`inherit\` in all browsers (opinionated).
 * */
button,
input,
optgroup,
select,
textarea {
  font: inherit;
  font-family: inherit;
  margin: 0;
}

/* beasties:include end */`
          }
        ] as Preflight<QuasarTheme>[]
      ).concat(
        QBreadcrumbsPreflights,
        QCheckboxPreflights,
        QChipPreflights,
        QCircularProgressPreflights,
        QDialogPreflights,
        QFieldPreflights,
        QLayoutPreflights,
        QLinearProgressPreflights,
        QRadioPreflights,
        QSelectPreflights,
        QSpinnerPreflights,
        QSkeletonPreflights,
        QTablePreflights,
        QTogglePreflights,
        QTreePreflights,
        ColorPreflights,
        DarkPreflights,
        HelperPreflights,
        MousePreflights,
        TypographyPreflights,
        VisibilityPreflights,
        TransitionPreflights,
        SizePreflights
      ),
      rules: ([] as Rule<QuasarTheme>[]).concat(
        MouseRules,
        HelperRules,
        ElevationRules,
        VisibilityRules
      ),
      shortcuts: ([] as UserShortcuts<QuasarTheme>[]).concat(
        QIconShortcuts,
        QAjaxBarShortcuts,
        QAvatarShortcuts,
        QBadgeShortcuts,
        QBreadcrumbsShortcuts,
        QBannerShortcuts,
        QBarShortcuts,
        QBtnShortcuts,
        QBtnDropdownShortcuts,
        QBtnGroupShortcuts,
        QBtnToggleShortcuts,
        QCardShortcuts,
        QCarouselShortcuts,
        QChatMessageShortcuts,
        QCheckboxShortcuts,
        QChipShortcuts,
        QCircularProgressShortcuts,
        QColorPickerShortcuts,
        QDateShortcuts,
        QDialogShortcuts,
        QEditorShortcuts,
        QExpansionItemShortcuts,
        QFabShortcuts,
        QFieldShortcuts,
        QFileShortcuts,
        QFormShortcuts,
        QImgShortcuts,
        QInnerLoadingShortcuts,
        QInputShortcuts,
        QIntersectionShortcuts,
        QItemShortcuts,
        QKnobShortcuts,
        QLayoutShortcuts,
        QLinearProgressShortcuts,
        QMenuShortcuts,
        QOptionGroupShortcuts,
        QPageShortcuts,
        QPageStickyShortcuts,
        QPaginationShortcuts,
        QParallaxShortcuts,
        QPopupEditShortcuts,
        QPullToRefreshShortcuts,
        QRadioShortcuts,
        QRatingShortcuts,
        QResponsiveShortcuts,
        QScrollareaShortcuts,
        QSelectShortcuts,
        QSeparatorShortcuts,
        QSkeletonShortcuts,
        QSlideItemShortcuts,
        QSliderShortcuts,
        QSpaceShortcuts,
        QSpinnerShortcuts,
        QSplitterShortcuts,
        QStepperShortcuts,
        QTabPanelShortcuts,
        QTableShortcuts,
        QTabsShortcuts,
        QTimeShortcuts,
        QTimelineShortcuts,
        QToggleShortcuts,
        QToolbarShortcuts,
        QTooltipShortcuts,
        QTreeShortcuts,
        QUploaderShortcuts,
        QVideoShortcuts,
        QVirtualScrollShortcuts,
        PanelShortcuts,

        QMorphShortcuts,
        QRippleShortcuts,

        QBottomSheetShortcuts,
        QDialogPluginShortcuts,
        QLoadingShortcuts,
        QNotifyShortcuts,
        DarkShortcuts,
        FlexShortcuts,
        HelperShortcuts,
        MouseShortcuts,
        OrientationShortcuts,
        PositionShortcuts,
        SizeShortcuts,
        TouchShortcuts,
        TransitionsShortcuts,
        TypographyShortcuts,
        VisibilityShortcuts,
        QHeaderShortcuts,
        QFooterShortcuts,
        QDrawerShortcuts,
        ElevationShortcuts
      ),
      outputToCssLayers: true,
      layers: {
        components: -1,
        default: 1,
        utilities: 2
      },
      theme: defaultTheme,
      variants: [
        // ...
      ],
      extractors: [
        {
          name: 'quasar-extractor',
          order: 0,
          extract({ code }) {
            const kebabMatch = code.matchAll(/q-(\w)([\w-]*)/g)
            const pascalMatch = code.matchAll(/Q([A-Z][a-z0-9]+)+/g)
            const transitionMatch = code.matchAll(
              /(transition|transition-show|transition-hide|transition-prev|transition-next)="(\S*)"/g
            )
            const colorMatch = code.matchAll(/color="(\S*)"/g)

            const pascalComponentsMatch: string[] = []
            const matches: string[] = []
            for (const match of kebabMatch) matches.push(match[0])
            for (const match of pascalMatch) {
              pascalComponentsMatch.push(match[0])
              matches.push(toKebabCase(match[0]))
            }
            const transitionClasses = []
            for (const match of transitionMatch) {
              transitionClasses.push(
                ...[
                  'enter-from',
                  'enter-active',
                  'enter-to',
                  'leave-from',
                  'leave-active',
                  'leave-to'
                ].map((v) => `q-transition--${match[2]}-${v}`)
              )
            }
            const colorClasses = []
            for (const match of colorMatch) {
              colorClasses.push(`text-${match[1]}`, `bg-${match[1]}`)
            }

            const classes = qClasses.filter((c) =>
              matches.some((component) => {
                component = component.replaceAll('q-chat-message', 'q-message')
                component = component.replaceAll(
                  'q-scroll-area',
                  'q-scrollarea'
                )
                return c.includes(component)
              })
            )
            const componentClasses = pascalComponentsMatch.reduce(
              (acc, component) => {
                if (component in componentsSafelistMap) {
                  acc.push(
                    ...(componentsSafelistMap as Record<string, string>)[
                      component
                    ]
                  )
                }
                return acc
              },
              [] as string[]
            )
            classes.push(
              ...transitionClasses,
              ...colorClasses,
              ...componentClasses
            )
            return classes
          }
        }
      ],
      transformers: [
        transformerVariantGroup()
        // {
        //   name: 'find-classes-in-quasar-src',
        //   enforce: 'pre', // enforce before other transformers
        //   idFilter(id) {
        //     return id.match(/quasar\/src\/.*\.js/)
        //   },
        //   async transform(code, id, { uno }) {
        //     for (const c of baseSafelist) {
        //       if (code.toString().includes(c)) console.log(c)
        //     }
        //     return code
        //     // code is a MagicString instance
        //   }
        // }
      ]
    } as Preset
  ]
})

export const defaultSplitRE = /[\\:]?[\s'"`;{}]+/g
export const splitWithVariantGroupRE = /([\\:]?[\s"'`;<>]|:\(|\)"|\)\s)/g

export function splitCode(code: string): string[] {
  return code.split(defaultSplitRE)
}
