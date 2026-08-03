// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['docus'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

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
        'simple-icons:stackblitz',
        'vscode-icons:file-type-bun',
        'vscode-icons:file-type-dotenv',
        'vscode-icons:file-type-npm',
        'vscode-icons:file-type-nuxt',
        'vscode-icons:file-type-pnpm',
        'vscode-icons:file-type-typescript',
        'vscode-icons:file-type-yarn',
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
