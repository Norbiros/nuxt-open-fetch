import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

// https://nuxt.com/docs/4.x/getting-started/testing#setup
export default defineConfig({
  test: {
    fileParallelism: false,
    projects: [
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['tests/runtime/**/*.spec.ts'],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              overrides: {
                openFetch: {
                  clients: {
                    api: {
                      baseURL: '',
                    },
                  },
                },
              },
            },
          },
        },
      }),
      {
        test: {
          name: 'types',
          include: ['tests/**/*.spec-d.ts'],
          typecheck: {
            enabled: true,
            only: true,
          },
        },
      },
    ],
  },
})
