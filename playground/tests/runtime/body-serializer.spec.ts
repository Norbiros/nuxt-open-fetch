import { setup } from '@nuxt/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('body serializer', async () => {
  await setup({
    server: true,
    browser: false,
    port: 3000,
  })

  it('serializes the body with $[client]', async () => {
    const { $api } = useNuxtApp()
    const fetchSpy = vi.spyOn(globalThis, '$fetch')
    const formData = new FormData()

    await $api('/pet', {
      method: 'POST',
      body: {
        name: 'doggie',
        photoUrls: ['/doggie.jpg'],
      },
      bodySerializer(body) {
        formData.append('name', body.name)
        return formData
      },
    })

    expect(fetchSpy).toHaveBeenCalledWith(
      '/pet',
      expect.objectContaining({
        body: formData,
      }),
    )
  })

  it('serializes the body with use[client]', async () => {
    const fetchSpy = vi.spyOn(globalThis, '$fetch')
    const formData = new FormData()

    await useApi('/pet', {
      method: 'POST',
      body: {
        name: 'doggie',
        photoUrls: ['/doggie.jpg'],
      },
      bodySerializer(body) {
        formData.append('name', body.name)
        return formData
      },
    })

    expect(fetchSpy).toHaveBeenCalledWith(
      '/pet',
      expect.objectContaining({
        body: formData,
      }),
    )
  })
})
