export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
  seo: {
    description: 'Generate zero-overhead, 100% typed OpenAPI fetch clients for Nuxt.',
  },
  header: {
    title: 'Nuxt Open Fetch',
  },
  github: {
    url: 'https://github.com/Norbiros/nuxt-open-fetch',
    branch: 'main',
    rootDir: 'docs',
  },
  socials: {
    nuxtdotjs: 'https://nuxt.com',
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Useful Links',
      links: [{
        icon: 'i-simple-icons-github',
        label: 'Star on GitHub',
        to: 'https://github.com/Norbiros/nuxt-open-fetch',
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
        icon: 'i-simple-icons-stackblitz',
        label: 'Playground',
        to: 'https://stackblitz.com/github/Norbiros/nuxt-open-fetch/tree/main/playground?file=app.vue',
        target: '_blank',
      }],
    },
  },
})
