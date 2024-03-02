import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Sentry Sync',
        short_name: 'Sentry Sync',
        description: 'Sentry Sync is an app allowing you to get notification from Sentry.io and manage your projects.',
        start_url: '/',
        display: 'standalone',
        background_color: '#6c5fc7',
        theme_color: '#03a9f4',
        icons: [
          {
            src: '/logo_small.svg',
            sizes: '48x48 72x72 96x96 128x128 256x256',
            type: 'image/svg+xml',
            purpose: 'any'
          },
        ],
      },
      includeAssets: [
        '/src',
        '/index.html',
        '/assets',
        '/locales',
        '/script.js',
        '/logo.svg'
      ],
      injectRegister: 'script', // Injects a script to register the SW
      workbox: {
        navigateFallback: 'index.html',
        // Specify OneSignal service worker import in workbox config
        importScripts: [
          'https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js'
        ],
      }
    }),
    react()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },


});