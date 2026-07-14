import { defineNuxtPlugin, useRequestFetch, useRuntimeConfig } from '#imports'
import { installOpenFetchClients } from './provide'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(nuxtApp) {
    const clients = useRuntimeConfig().public.openFetch
    const $fetch = useRequestFetch()

    installOpenFetchClients(nuxtApp as any, clients as any, $fetch as any)
  },
})
