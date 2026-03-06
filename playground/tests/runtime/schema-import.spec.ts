import { setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('schema module resolution', async () => {
  await setup({
    server: false,
    browser: false,
  })

  it('enum: false — existing api client (registered as .d.ts) works for fetch composables', () => {
    // When no enum options are configured, the schema is registered as a .d.ts declaration
    // file. Type imports work fine, and the fetch composables (useApi, $api) are functional.
    // The existing accept-header and body-serializer tests verify this end-to-end.
    // Here we just confirm the Nuxt app (and its plugins) initialised without errors.
    const app = useNuxtApp()
    expect(app.$api).toBeDefined()
  })

  it('enum: true — #open-fetch-schemas/api-enum resolves as a runtime module (.ts) with importable enum values', async () => {
    // The `apiEnum` client has `openAPITS: { enum: true }`, so runtimeSchemas is
    // auto-detected as true and the schema is registered as a .ts file. Enum values
    // (runtime JavaScript objects) are therefore importable by Vite at runtime.
    const { PetStatus } = await import('#open-fetch-schemas/api-enum')
    expect(PetStatus).toBeDefined()
    expect(PetStatus.available).toBe('available')
    expect(PetStatus.pending).toBe('pending')
    expect(PetStatus.sold).toBe('sold')
  })
})
