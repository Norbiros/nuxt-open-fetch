import { afterEach, describe, expect, it, vi } from 'vitest'

const pet = { id: 1, name: 'doggie', photoUrls: [] }

function mockFetch() {
  return Object.assign(vi.fn(), {
    raw: vi.fn(async (request: string, options: any = {}) => {
      const context = { request, options, response: undefined }
      const requestHooks = Array.isArray(options.onRequest) ? options.onRequest : [options.onRequest].filter(Boolean)
      for (const hook of requestHooks)
        await hook(context)

      const response = {
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        _data: pet,
      }
      context.response = response as any
      const responseHooks = Array.isArray(options.onResponse) ? options.onResponse : [options.onResponse].filter(Boolean)
      for (const hook of responseHooks)
        await hook(context)

      return response
    }),
  })
}

describe('$client.raw runtime behavior', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns status, headers and body from the raw response', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    const response = await $api.raw('/pet/{petId}', {
      baseURL: 'https://example.test',
      path: { petId: 1 },
    })

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('json')
    expect(response._data).toEqual(pet)
  })

  it('applies path and accept options like a regular call', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    await $api.raw('/pet/{petId}', {
      baseURL: 'https://example.test',
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v2+json',
    })

    const [request, options] = fetch.raw.mock.calls[0]!
    expect(request).toBe('/pet/1')
    expect(new Headers(options.headers).get('accept')).toBe('application/vnd.petstore.v2+json')
  })

  it('passes request and response hooks to raw fetch', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    const calls: string[] = []

    await $api.raw('/pet/{petId}', {
      baseURL: 'https://example.test',
      path: { petId: 1 },
      onRequest: () => { calls.push('request') },
      onResponse: () => { calls.push('response') },
    })

    expect(calls).toEqual(['request', 'response'])
  })
})
