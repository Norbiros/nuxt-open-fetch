import { setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('accept header runtime behavior', async () => {
  await setup({
    server: true,
    browser: false,
    port: 3000,
  })

  const { $api } = useNuxtApp()

  it('sends correct Accept header and receives v1 response', async () => {
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
  })

  it('sends multiple accept types with preference order', async () => {
    const response = await $api('/pet/{petId}', {
      path: { petId: 1 },
      accept: ['application/vnd.petstore.v2+json', 'application/vnd.petstore.v1+json'],
    })

    expect(response).toHaveProperty('breed')
    expect(response).toHaveProperty('age')
    expect(response).toHaveProperty('owner')
  })
})
