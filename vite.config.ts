import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...(VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'めんちんどーじょー2 | チンイツ・牌理練習アプリ',
        short_name: 'めんちんどーじょー2',
        description: '自分のペースでチンイツと牌理を練習できるWebアプリ"',
        theme_color: '#d1fae5',
        background_color: "#D1FAE5",
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        lang: 'ja',
        start_url: '/',
        display: 'standalone',
        scope: '/',
      },
    }) as any),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
