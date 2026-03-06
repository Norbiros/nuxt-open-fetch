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
      apiEnum: {
        schema: './openapi/api/openapi.yaml',
        openAPITS: { enum: true },
      },
    },
  },

  compatibilityDate: '2025-03-21',
})
