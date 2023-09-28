import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { Router } from 'vue-router'

export const registerPWA = (router: Router) => {
  router.isReady().then(async () => {
    useRegisterSW({ immediate: true })
  })
}
