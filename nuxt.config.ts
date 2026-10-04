export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Orbit — Gestion de projet',
      meta: [
        { name: 'description', content: "Concept d'outil de gestion de projet en kanban." },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap' },
      ],
    },
  },
})
