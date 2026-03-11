import { createOpenFetch } from './fetch'

type OpenFetchClientOptions = Parameters<typeof createOpenFetch>[0]
type OpenFetchHooks = Parameters<typeof createOpenFetch>[3]
interface OpenFetchNuxtApp {
  hooks: OpenFetchHooks
  vueApp: {
    config: {
      globalProperties: object
    }
  }
}

function defineMockableProperty(target: object, key: string, value: unknown) {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value,
  })
}

export function installOpenFetchClients(
  nuxtApp: OpenFetchNuxtApp,
  clients: Record<string, OpenFetchClientOptions>,
  localFetch: typeof globalThis.$fetch,
) {
  Object.entries(clients).forEach(([name, client]) => {
    const openFetchClient = createOpenFetch(client, localFetch, name, nuxtApp.hooks)
    const propertyName = `$${name}`

    // Nuxt's default provide path defines getter-only properties, which Vitest cannot spy on.
    defineMockableProperty(nuxtApp, propertyName, openFetchClient)
    defineMockableProperty(nuxtApp.vueApp.config.globalProperties, propertyName, openFetchClient)
  })
}
