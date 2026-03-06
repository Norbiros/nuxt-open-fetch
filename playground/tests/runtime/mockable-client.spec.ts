import { afterEach, describe, expect, it, vi } from 'vitest'

describe('mockable injected client', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('defines injected clients with a configurable descriptor', () => {
    const descriptor = Object.getOwnPropertyDescriptor(useNuxtApp(), '$api')

    expect(descriptor).toBeDefined()
    expect(descriptor?.configurable).toBe(true)
    expect(descriptor?.writable).toBe(true)
  })

  it('allows spying on injected clients', () => {
    const nuxtApp = useNuxtApp()
    let error: unknown

    try {
      const spy = vi.spyOn(nuxtApp, '$api')
      spy.mockRestore()
    }
    catch (cause) {
      error = cause
    }

    expect(error).toBeUndefined()
  })

  it('uses mocked injected clients in runtime tests', async () => {
    const nuxtApp = useNuxtApp()
    const response = {
      id: 1,
      name: 'doggie',
      photoUrls: [],
    }

    const apiSpy = vi.spyOn(nuxtApp, '$api').mockResolvedValueOnce(response as any)

    await expect(nuxtApp.$api('/pet/{petId}', {
      path: { petId: 1 },
    })).resolves.toEqual(response)

    expect(apiSpy).toHaveBeenCalledWith('/pet/{petId}', {
      path: { petId: 1 },
    })
  })
})
