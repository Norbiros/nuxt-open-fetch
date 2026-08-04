import type { paths } from '#open-fetch-schemas/api'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createOpenFetch } from '../../../src/runtime/fetch'

const pet = { id: 1, name: 'doggie', photoUrls: [] }

function mockFetch() {
  const fetch = vi.fn(async (request: string, options: any = {}) => {
    const context = { request, options }
    const hooks = Array.isArray(options.onRequest) ? options.onRequest : [options.onRequest].filter(Boolean)
    for (const hook of hooks)
      await hook(context)
    return pet
  })

  return Object.assign(fetch, {
    raw: vi.fn(async (_request: string, _options: any = {}) => ({ status: 200, headers: new Headers(), _data: pet })),
  })
}

describe('$client.create runtime behavior', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('merges preset and per-call options', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    const derived = $api.create({ headers: { 'x-derived': '1' } })

    await derived('/pet/{petId}', {
      baseURL: 'https://example.test',
      path: { petId: 1 },
      headers: { 'x-call': '2' },
    })

    const [request, options] = fetch.mock.calls[0]!
    const headers = new Headers(options.headers)
    expect(request).toBe('/pet/1')
    expect(headers.get('x-derived')).toBe('1')
    expect(headers.get('x-call')).toBe('2')
  })

  it('keeps user interceptors and path replacement working together', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    const requests: string[] = []
    const derived = $api.create({
      baseURL: 'https://example.test',
      onRequest({ request }) {
        requests.push(String(request))
      },
    })

    await derived('/pet/{petId}', { path: { petId: 1 } })

    expect(requests).toEqual(['/pet/1'])
  })

  it('supports raw responses and chained derivation', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const { $api } = useNuxtApp()
    const derived = $api
      .create({ baseURL: 'https://example.test', headers: { 'x-parent': '1' } })
      .create({ headers: { 'x-chained': '2' } })

    const response = await derived.raw('/pet/{petId}', { path: { petId: 1 } })

    expect(response.status).toBe(200)
    expect(response._data).toEqual(pet)
    const [, options] = fetch.raw.mock.calls[0]!
    const headers = new Headers(options.headers)
    expect(headers.get('x-parent')).toBe('1')
    expect(headers.get('x-chained')).toBe('2')
  })

  it('merges derived and per-call query for function-based configuration', async () => {
    const fetch = mockFetch()
    vi.stubGlobal('$fetch', fetch)
    const configure = vi.fn((options: any) => ({ baseURL: 'https://example.test', ...options }))
    const client = createOpenFetch<paths>(configure).create({
      query: { inherited: 'yes', status: 'pending' },
    })

    await client('/pet/findByStatus', {
      query: { status: 'available' },
    })

    expect(configure).toHaveBeenCalledOnce()
    expect(fetch.mock.calls[0]![1].query).toEqual({
      inherited: 'yes',
      status: 'available',
    })
  })
})
