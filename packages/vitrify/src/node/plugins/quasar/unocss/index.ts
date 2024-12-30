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
interface QuasarPresetOptions {}
// .(.*) \{\n *@apply (.*);\n *\}
export default definePreset((options?: QuasarPresetOptions) => {
  return {
    name: 'quasar',
    presets: [presetUno()],
    safelist: ['q-btn--rectangle', 'q-btn__content', 'no-outline'],
    preflights: (
      [
        {
          getCSS: ({ theme }) => `
          @import '@unocss/reset/normalize.css'
        `
        }
      ] as Preflight<QuasarTheme>[]
    ).concat(QBreadcrumbsPreflights),
    shortcuts: ([] as UserShortcuts<QuasarTheme>[]).concat(
      QIconShortcuts,
      QBtnShortcuts,
      PanelShortcuts,
      QLoadingBarShortcuts,
      QAvatarShortcuts,
      QBadgeShortcuts
    ),
    rules: [],
    theme,
    variants: [
      // ...
    ],
    transformers: [transformerVariantGroup()]
  }
})
