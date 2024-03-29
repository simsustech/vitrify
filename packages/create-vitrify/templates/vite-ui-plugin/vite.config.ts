import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    vue(),
    Components({
      resolvers: [QuasarResolver()]
    })
  ],
  build: {
    // minify: false,
    lib: {
      fileName: (format, entryName) => {
        return entryName + '.js'
      },
      formats: ['es'],
      entry: './src/ui/index.ts'
    },
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ui: new URL('./src/ui/index.ts', import.meta.url).pathname
      },
      /**
       * Add (UI) frameworks that are used
       */
      external: ['vue', 'vue-router', 'quasar']
    }
  }
}))
