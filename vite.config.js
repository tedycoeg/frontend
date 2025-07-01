import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: 'al-farabi.walver.dev',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.al-farabi.id',
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: 'al-farabi.walver.dev',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
