export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },

  openFetch: {
    clients: {
      api: {
        baseURL: 'http://localhost:3000/api',
      },
    },
  },

  compatibilityDate: '2025-03-21',

  // `nuxi prepare --envName typed-fetch` checks the module against Nuxt's route-typed `$fetch`
  $env: {
    'typed-fetch': {
      buildDir: '.nuxt-typed-fetch',
      experimental: {
        routeTypedFetch: true,
        strictRouteTypes: true,
      },
    },
  },
})
