import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { QuasarPlugin } from '@qso/app'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), await QuasarPlugin()],
  quasar: {
    conf: {
      extras: ['material-icons'],
      framework: {
        plugins: [],
        components: []
      }
    }
  }
})
