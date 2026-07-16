import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

describe('accept header runtime behavior', () => {
  let returnV2 = false

  registerEndpoint('/pet/1', () => {
    const basePet = {
      id: 1,
      name: 'doggie',
      photoUrls: [],
      status: 'available',
    }

    if (returnV2) {
      return {
        ...basePet,
        breed: 'Labrador',
        age: 3,
        owner: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
    }

    return basePet
  })

  it('sends correct Accept header and receives v1 response', async () => {
    returnV2 = false
    const { $api } = useNuxtApp()
    const response = await $api('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/json',
    })

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('name')
    expect(response).toHaveProperty('photoUrls')
    expect(response).toHaveProperty('status')
    expect(response).not.toHaveProperty('breed')
    expect(response).not.toHaveProperty('age')
    expect(response).not.toHaveProperty('owner')
  })

  it('sends v1 media type and receives v1 response', async () => {
    returnV2 = false
    const { $api } = useNuxtApp()
    const response = await $api('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v1+json',
    })

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('name')
    expect(response).not.toHaveProperty('breed')
    expect(response).not.toHaveProperty('age')
    expect(response).not.toHaveProperty('owner')
  })

  it('sends v2 media type and receives v2 response', async () => {
    returnV2 = true
    const { $api } = useNuxtApp()
    const fetchSpy = vi.spyOn(globalThis, '$fetch')
    const response = await $api('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v2+json',
    })

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('name')
    expect(response).toHaveProperty('photoUrls')
    expect(response).toHaveProperty('status')
    expect(response).toHaveProperty('breed')
    expect(response).toHaveProperty('age')
    expect(response).toHaveProperty('owner')
    expect(response.breed).toBe('Labrador')
    expect(response.age).toBe(3)
    expect(response.owner).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
    })
    expect(fetchSpy.mock.calls.some(([, options]) =>
      new Headers(options?.headers).get('accept') === 'application/vnd.petstore.v2+json',
    )).toBe(true)
    fetchSpy.mockRestore()
  })

  it('sends multiple accept types with preference order', async () => {
    returnV2 = true
    const { $api } = useNuxtApp()
    const fetchSpy = vi.spyOn(globalThis, '$fetch')
    const response = await $api('/pet/{petId}', {
      path: { petId: 1 },
      accept: ['application/vnd.petstore.v2+json', 'application/vnd.petstore.v1+json'],
    })

    expect(response).toHaveProperty('breed')
    expect(response).toHaveProperty('age')
    expect(response).toHaveProperty('owner')
    const acceptHeaders = fetchSpy.mock.calls
      .map(([, options]) => new Headers(options?.headers).get('accept'))
      .filter(Boolean)
    expect(acceptHeaders[0]).toBe('application/vnd.petstore.v2+json, application/vnd.petstore.v1+json')
    fetchSpy.mockRestore()
  })
})
