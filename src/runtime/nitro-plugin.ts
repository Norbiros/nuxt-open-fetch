// @ts-ignore
import { useRuntimeConfig } from '#open-fetch-nitro-runtime-config'
import { createOpenFetch } from './fetch'

// @ts-ignore
export default (nitroApp) => {
  const clients = useRuntimeConfig().public.openFetch

  // @ts-ignore
  Object.entries(clients).forEach(([name, client]) => {
    // @ts-ignore
    nitroApp[`$${name}`] = createOpenFetch(client, nitroApp.localFetch, name, nitroApp.hooks)
  })
}
