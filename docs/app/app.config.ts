export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt Open Fetch',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/enkot/nuxt-open-fetch',
      'target': '_blank',
      'aria-label': 'Nuxt Open Fetch',
    }],
  },
  footer: {
    credits: `Copyright © 2023 - ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-nuxtdotjs',
      'to': 'https://nuxt.com',
      'target': '_blank',
      'aria-label': 'Nuxt Website',
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/enkot/nuxt-open-fetch',
      'target': '_blank',
      'aria-label': 'Nuxt Open Fetch',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Useful Links',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/enkot/nuxt-open-fetch',
        target: '_blank',
      }, {
        icon: 'i-simple-icons-typescript',
        label: 'OpenAPI TypeScript',
        to: 'https://openapi-ts.pages.dev/',
        target: '_blank',
      }, {
        icon: 'i-simple-icons-nuxtdotjs',
        label: 'Nuxt Website',
        to: 'https://nuxt.com',
        target: '_blank',
      }, {
        icon: 'i-lucide-puzzle',
        label: 'Playground',
        to: 'https://stackblitz.com/github/Norbiros/nuxt-open-fetch/tree/main/playground?file=app.vue',
        target: '_blank',
      }],
    },
  },
})
