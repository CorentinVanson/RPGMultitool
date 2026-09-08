import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2026-08-26',
  devtools: { enabled: false },
  modules: ['@vite-pwa/nuxt'],

  // Toutes les pages sont pré-rendues : le service worker peut ainsi les précacher au premier chargement.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/projection', '/campo-della-frontiera',
        ...[
          'tavern-elisabetta', 'tavern-ruggero', 'tavern-niccolo',
          'forge-ambra', 'forge-dario', 'forge-lucia',
          'watch-cesare', 'watch-mara', 'watch-orazio',
          'cistern-1', 'cistern-2', 'cistern-3',
          'workshop-1', 'workshop-2', 'workshop-3',
          'tannery-1', 'tannery-2', 'tannery-3',
          'map-room-1', 'map-room-2', 'map-room-3',
          'church-1', 'church-2', 'church-3',
          'infirmary-1', 'infirmary-2', 'infirmary-3',
          'stone-wall-1', 'stone-wall-2', 'stone-wall-3',
          'artificer-1', 'artificer-2', 'artificer-3',
        ].map((id) => `/campo-della-frontiera/personnages/${id}`),
      ],
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
      globPatterns: ['**/*.{js,css,html,json,svg,png,jpg,jpeg,webp,ico,woff2,mp4}'],
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