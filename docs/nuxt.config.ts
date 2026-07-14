// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-open-fetch',
    '@nuxt/ui',
    'nuxt-content-twoslash',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-og-image',
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

  compatibilityDate: '2025-07-11',

  nitro: {
    devStorage: {
      'cache:nuxt:payload': {
        driver: 'memory',
      },
    },
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'nuxt > @nuxt/devtools > @vue/devtools-core',
        'nuxt > @nuxt/devtools > @vue/devtools-kit',
      ],
    },
  },

  typescript: {
    strict: false,
  },

  hooks: {
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

  twoslash: {
    compilerOptions: {
      baseUrl: '.',
    },
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert',
    },
    throws: false,
    includeNuxtTypes: true,
  },

  ogImage: { zeroRuntime: true },
})
