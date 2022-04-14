import { createApp } from '../main.js'

// const { app, router } = createApp()
createApp('client').then(({ app, router }) => {
  // wait until router is ready before mounting to ensure hydration match
  router.isReady().then(() => {
    app.mount('#app')
  })
})
