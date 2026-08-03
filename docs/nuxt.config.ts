// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    'nuxt-open-fetch',
  ],

  devtools: {
    enabled: true,
  },

  site: {
    name: 'Nuxt Open Fetch',
    url: 'https://nuxt-open-fetch.norbiros.dev',
  },

  llms: {
    domain: 'https://nuxt-open-fetch.norbiros.dev',
    title: 'Nuxt Open Fetch',
    description: 'Generate zero-overhead, 100% typed OpenAPI fetch clients for Nuxt.',
  },

  icon: {
    clientBundle: {
      icons: [
        'heroicons:rocket-launch',
        'heroicons:code-bracket-square',
        'heroicons:command-line',
        'heroicons:cog-6-tooth',
      ],
    },
  },

  compatibilityDate: '2024-07-11',

  openFetch: {
    disableNitroPlugin: true,
    clients: {
      pets: {
        baseURL: '/petsProxy',
      },
    },
  },
})
