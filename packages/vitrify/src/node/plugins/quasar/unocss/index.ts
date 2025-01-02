// Import normalize and animate css
import {
  definePreset,
  type Preflight,
  transformerVariantGroup,
  type UserShortcuts
} from 'unocss'
import presetUno from '@unocss/preset-uno'
import theme, { type QuasarTheme } from './theme.js'

import { shortcuts as QIconShortcuts } from './components/QIcon.unocss.js'
import { shortcuts as QBtnShortcuts } from './components/QBtn.unocss.js'
import { shortcuts as PanelShortcuts } from './composables/panel.unocss.js'
import { shortcuts as QLoadingBarShortcuts } from './components/QLoadingBar.unocss.js'
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
interface QuasarPresetOptions {}
// .(.*) \{\n *@apply (.*);\n *\}
export default definePreset((options?: QuasarPresetOptions) => {
  return {
    name: 'quasar',
    presets: [presetUno()],
    safelist: ['q-btn--rectangle', 'q-btn__content', 'no-outline', 'q-icon'],
    preflights: (
      [
        //       {
        //         getCSS: ({ theme }) => `
        // @import '@unocss/reset/normalize.css';
        //       `
        //       }
      ] as Preflight<QuasarTheme>[]
    ).concat(
      QBreadcrumbsPreflights,
      QCheckboxPreflights,
      QChipPreflights,
      QCircularProgressPreflights
    ),
    shortcuts: ([] as any[]).concat(
      QIconShortcuts,
      QBtnShortcuts,
      PanelShortcuts,
      QLoadingBarShortcuts,
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
      QColorPickerShortcuts
    ),
    rules: [],
    theme,
    variants: [
      // ...
    ],
    transformers: [transformerVariantGroup()]
  }
})
