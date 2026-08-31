import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2026-08-26',
  devtools: { enabled: false },
  modules: ['@vite-pwa/nuxt'],

  // Toutes les pages sont pré-rendues : le service worker peut ainsi les précacher au premier chargement.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projection'],
      failOnError: false,
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'RPGMultitool',
      short_name: 'RPGMultitool',
      description: 'Outil de maîtrise pour la campagne Historia',
      lang: 'fr',
      display: 'standalone',
      background_color: '#1c150f',
      theme_color: '#b3813a',
      start_url: '/',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,json,svg,png,jpg,jpeg,webp,ico,woff2}'],
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.pathname.startsWith('/api/content/'),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'rpg-content', expiration: { maxEntries: 20 } },
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: { cacheName: 'rpg-images', expiration: { maxEntries: 200 } },
        },
      ],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },
});