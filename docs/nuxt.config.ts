// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-og-image',
    'nuxt-open-fetch',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://nuxt-open-fetch.norbiros.dev',
  },

  colorMode: {
    disableTransition: true,
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
    },
  },

  typescript: {
    strict: false,
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton', 'UIcon'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  openFetch: {
    disableNitroPlugin: true,
    clients: {
      pets: {
        baseURL: '/petsProxy',
      },
    },
  },
})
