import { createApp } from '../main'

createApp('client').then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app')
  })
})
