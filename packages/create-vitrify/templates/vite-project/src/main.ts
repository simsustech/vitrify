import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import plugins from 'virtual:quasar-plugins'
import createRouter from './router/index'
import 'virtual:quasar-extras'

const router = createRouter()

const app = createApp(App)

app.use(router)

app.use(Quasar, {
  plugins
})
app.mount('#app')
