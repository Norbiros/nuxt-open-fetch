import type { paths } from '#open-fetch-schemas/api'
import type { Ref } from 'vue'
import { describe, expectTypeOf, it } from 'vitest'
import { createOpenFetch } from '../../src/runtime/fetch'
import { createUseOpenFetch } from '../../src/runtime/useFetch'

interface ReturnData {
  id?: number
  name: string
  category?: {
    id?: number
    name?: string
  } | undefined
  photoUrls: string[]
  tags?: {
    id?: number
    name?: string
  }[]
  status?: 'available' | 'pending' | 'sold'
}

interface ReturnDataV2 {
  id?: number
  name: string
  breed?: string
  age?: number
  category?: {
    id?: number
    name?: string
  } | undefined
  photoUrls: string[]
  tags?: {
    id?: number
    name?: string
  }[]
  status?: 'available' | 'pending' | 'sold'
  owner?: {
    name?: string
    email?: string
  }
}

describe('$[client]', async () => {
  const $pets = createOpenFetch<paths>({})

  it('is function', () => {
    expectTypeOf($pets).toBeFunction()
  })

  it('supports "method" in lowercase and uppercase', () => () => {
    $pets('/pet/{petId}', {
      path: { petId: 1 },
      method: 'get',
    })

    $pets('/pet/{petId}', {
      path: { petId: 1 },
      method: 'GET',
    })
  })

  it('has correct body type', () => () => {
    $pets('/pet', {
      method: 'post',
      body: {
        name: 'doggie',
        photoUrls: [],
      },
    })
  })

  it('has correct return type', () => async () => {
    const data = await $pets('/pet/{petId}')
    expectTypeOf(data).toExtend<ReturnData>()
  })

  it('returns correct type based on accept header', () => async () => {
    const jsonData = await $pets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/json',
    })
    expectTypeOf(jsonData).toEqualTypeOf<ReturnData>()

    const v1Data = await $pets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v1+json',
    })
    expectTypeOf(v1Data).toEqualTypeOf<ReturnData>()
    expectTypeOf(v1Data).not.toEqualTypeOf<ReturnDataV2>()

    const v2Data = await $pets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v2+json',
    })
    expectTypeOf(v2Data).toEqualTypeOf<ReturnDataV2>()
  })

  it('supports mixed media type arrays with correct return type', () => async () => {
    const data = await $pets('/pet/{petId}', {
      path: { petId: 1 },
      accept: ['application/json', 'application/vnd.petstore.v2+json'],
    })
    expectTypeOf(data).toEqualTypeOf<ReturnData | ReturnDataV2>()
  })
})

describe('use[Client]', async () => {
  const usePets = createUseOpenFetch<paths>('api')

  it('is function', () => {
    expectTypeOf(usePets).toBeFunction()
  })

  it('supports "method" in lowercase and uppercase', () => () => {
    usePets('/pet/{petId}', {
      path: { petId: 1 },
      method: 'get',
    })
    usePets('/pet/{petId}', {
      path: { petId: 1 },
      method: 'GET',
    })
  })

  it('has correct "body" type', () => () => {
    usePets('/pet', {
      method: 'post',
      body: {
        name: 'doggie',
        photoUrls: [],
      },
      immediate: true,
    })
  })

  it('has correct return type', () => () => {
    const { data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      immediate: false,
    })

    expectTypeOf(data).toExtend<Ref<ReturnData | undefined>>()
  })

  it('has correct "transform" input parameter type', () => () => {
    usePets('/pet/{petId}', {
      path: { petId: 1 },
      transform: input => ({
        foo: input.name,
      }),
      immediate: false,
    })
  })

  it('has correct response type using "transform"', () => () => {
    const { data } = usePets('/pet/{petId}', {
      method: 'get',
      path: { petId: 1 },
      transform: input => ({
        foo: input.name,
      }),
      immediate: false,
    })

    expectTypeOf(data).toExtend<Ref<{ foo: string } | undefined>>()
  })

  it('has correct reponse type using "default"', () => () => {
    const { data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      default: () => ({
        bar: 12,
      }),
      immediate: false,
    })

    expectTypeOf(data).toExtend<Ref<ReturnData | { bar: number }>>()
  })

  it('has correct response type using "default" and "transform"', () => () => {
    const { data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      transform: input => ({
        foo: input.name,
      }),
      default: () => ({
        bar: 12,
      }),
      immediate: false,
    })

    expectTypeOf(data).toExtend<Ref<{ foo: string } | { bar: number }>>()
  })

  it('has correct response type using "pick"', () => () => {
    const { data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      pick: ['name'],
      immediate: false,
    })

    expectTypeOf(data).toExtend<Ref<{ name: string } | undefined>>()
  })

  it('returns correct type based on accept header', () => () => {
    const { data: jsonData } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/json',
      immediate: false,
    })
    expectTypeOf(jsonData).toEqualTypeOf<Ref<ReturnData | undefined>>()

    const { data: v1Data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v1+json',
      immediate: false,
    })
    expectTypeOf(v1Data).toEqualTypeOf<Ref<ReturnData | undefined>>()
    expectTypeOf(v1Data).not.toEqualTypeOf<Ref<ReturnDataV2 | undefined>>()

    const { data: v2Data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      accept: 'application/vnd.petstore.v2+json',
      immediate: false,
    })
    expectTypeOf(v2Data).toEqualTypeOf<Ref<ReturnDataV2 | undefined>>()
  })

  it('supports mixed media type arrays with correct return type', () => () => {
    const { data } = usePets('/pet/{petId}', {
      path: { petId: 1 },
      accept: ['application/json', 'application/vnd.petstore.v2+json'],
      immediate: false,
    })

    expectTypeOf(data).toEqualTypeOf<Ref<ReturnData | ReturnDataV2 | undefined>>()
  })
})
