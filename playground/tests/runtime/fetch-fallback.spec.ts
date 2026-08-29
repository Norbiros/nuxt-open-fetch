import { $fetch as ofetch } from 'ofetch'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createOpenFetch } from '../../../src/runtime/fetch'

vi.mock('ofetch', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ofetch')>()
  return { ...actual, $fetch: vi.fn() }
})

describe('fetch fallback', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uses ofetch when globalThis.$fetch is unavailable', async () => {
    const fetchSpy = vi.mocked(ofetch).mockResolvedValue({ id: 1 } as any)
    vi.stubGlobal('$fetch', undefined)

    await expect(createOpenFetch<any>({})('https://example.com')).resolves.toEqual({ id: 1 })
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com', expect.any(Object))
  })
})
