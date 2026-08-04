import type { OpenFetchClientName } from '#build/open-fetch'
import type { AsyncData, UseFetchOptions } from 'nuxt/app'
import type { $Fetch } from 'ofetch'
import type { Ref } from 'vue'
import type {
  AcceptMediaTypeOption,
  BodySerializerOption,
  FilterMethods,
  OpenFetchData,
  OpenFetchError,
  OpenFetchMediaType,
  OpenFetchMethod,
  OpenFetchOperation,
  ParamsOption,
  RequestBodyOption,
} from './fetch'
import { useFetch, useNuxtApp } from 'nuxt/app'
import { digest } from 'ohash'
import { toValue } from 'vue'

type PickFrom<T, K extends Array<string>> = T extends Array<any> ? T : T extends Record<string, any> ? keyof T extends K[number] ? T : K[number] extends never ? T : Pick<T, K[number]> : T
type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>

type ComputedOptions<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ComputedOptions<T[K]> | Ref<T[K]> | T[K]
}
type ComputedMethodOption<M, P> = 'get' extends keyof P ? ComputedOptions<{ method?: M }> : ComputedOptions<{ method: M }>

type UseOpenFetchOptions<
  Lazy,
  Paths,
  Path extends Extract<keyof Paths, string>,
  Method extends string,
  Media,
  DataT,
  PickKeys extends KeysOf<DataT>,
  Operation = OpenFetchOperation<Paths, Path, Method>,
>
  = ComputedMethodOption<Method, FilterMethods<Paths[Path]>>
  & ComputedOptions<ParamsOption<Operation>>
  & ComputedOptions<RequestBodyOption<Operation>>
  & ComputedOptions<AcceptMediaTypeOption<Media>>
  & ComputedOptions<BodySerializerOption<RequestBodyOption<Operation>['body']>>
  & Omit<UseFetchOptions<OpenFetchData<Paths, Path, Method, Media>, DataT, PickKeys>, 'query' | 'body' | 'method' | 'default'>
  & (Lazy extends true ? { lazy?: undefined } : unknown)

export interface UseOpenFetchClient<Paths, Lazy> {
  <
    Path extends Extract<keyof Paths, string>,
    Method extends OpenFetchMethod<Paths, Path>,
    Media extends OpenFetchMediaType<Paths, Path, Method>,
    DataT = OpenFetchData<Paths, Path, Method, Media>,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  >(
    url: Path | (() => Path),
    options?: UseOpenFetchOptions<Lazy, Paths, Path, Method, Media, DataT, PickKeys> & { default?: undefined },
  ): AsyncData<PickFrom<DataT, PickKeys> | undefined, OpenFetchError<Paths, Path, Method> | undefined>

  <
    Path extends Extract<keyof Paths, string>,
    Method extends OpenFetchMethod<Paths, Path>,
    Media extends OpenFetchMediaType<Paths, Path, Method>,
    DataT = OpenFetchData<Paths, Path, Method, Media>,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  >(
    url: Path | (() => Path),
    options: UseOpenFetchOptions<Lazy, Paths, Path, Method, Media, DataT, PickKeys> & {
      default: () => NoInfer<DataT> | Ref<NoInfer<DataT>>
      transform?: undefined
    },
  ): AsyncData<PickFrom<DataT, PickKeys> | DataT, OpenFetchError<Paths, Path, Method> | undefined>

  <
    Path extends Extract<keyof Paths, string>,
    Method extends OpenFetchMethod<Paths, Path>,
    Media extends OpenFetchMediaType<Paths, Path, Method>,
    DataT,
    PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  >(
    url: Path | (() => Path),
    options: UseOpenFetchOptions<Lazy, Paths, Path, Method, Media, DataT, PickKeys> & {
      default: () => NoInfer<DataT> | Ref<NoInfer<DataT>>
      transform: (input: OpenFetchData<Paths, Path, Method, Media>) => DataT | Promise<DataT>
    },
  ): AsyncData<PickFrom<DataT, PickKeys> | DataT, OpenFetchError<Paths, Path, Method> | undefined>
}

export function createUseOpenFetch<
  Paths,
  Lazy = false,
>(client: $Fetch | OpenFetchClientName, lazy?: Lazy): UseOpenFetchClient<Paths, Lazy>
export function createUseOpenFetch<
  Paths,
  Lazy = true,
>(client: $Fetch | OpenFetchClientName, lazy?: Lazy): UseOpenFetchClient<Paths, Lazy>
export function createUseOpenFetch<
  Paths,
  Lazy extends boolean,
>(client: $Fetch | OpenFetchClientName, lazy = false): UseOpenFetchClient<Paths, Lazy> {
  const composable = (url: string | (() => string), options: any = {}) => {
    // https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata
    const nuxtApp = useNuxtApp()
    const fetch = (typeof client === 'string' ? nuxtApp[`$${client}`] : client) as typeof $fetch

    // The autokey in Nuxt is a bit buggy in our use case, so we create our own.
    const key = options.key ?? createAutoKey(client.toString(), url, options)
    const opts = { $fetch: fetch, key, ...options }

    return useFetch(url, lazy ? { ...opts, lazy } : { ...opts })
  }

  return composable as UseOpenFetchClient<Paths, Lazy>
}

function createAutoKey(client: string, url: string | (() => string), options: any) {
  const resolvedRequestOptions = {
    url,
    method: options.method,
    path: options.path,
    query: options.query,
    body: options.body,
  }

  // Convert to json string and use a custom replacer function to unref all refs.
  const resolvedRequestOptionsJson = JSON.stringify(resolvedRequestOptions, (_, value) => toValue(value))

  return `$${client}-${digest(resolvedRequestOptionsJson)}`
}
