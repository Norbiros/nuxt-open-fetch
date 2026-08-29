import type { RuntimeNuxtHooks } from '#app'
import type { OpenFetchClientName } from '#build/open-fetch'
import type { FetchContext, FetchError, FetchHooks, FetchOptions, FetchResponse } from 'ofetch'
import type {
  ErrorResponse,
  MediaType,
  OkStatus,
  OperationRequestBodyContent,
  ResponseContent,
  ResponseObjectMap,
  SuccessResponse,
} from 'openapi-typescript-helpers'
import { $fetch as ofetch } from 'ofetch'

interface OpenFetchHooks {
  callHook: (name: any, ...args: any[]) => any
}

type Hooks = OpenFetchHooks | null

export type FetchResponseData<T extends Record<string | number, any>, Media extends MediaType = MediaType> = SuccessResponse<ResponseObjectMap<T>, Media>
export type FetchResponseError<T extends Record<string | number, any>> = FetchError<ErrorResponse<ResponseObjectMap<T>, MediaType>>

export type MethodOption<M, P> = 'get' extends keyof P ? { method?: M } : { method: M }

export type ParamsOption<T> = T extends { parameters?: any, query?: any } ? T['parameters'] : Record<string, never>

export type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
  ? { body?: never }
  : undefined extends OperationRequestBodyContent<T>
    ? { body?: OperationRequestBodyContent<T> }
    : { body: OperationRequestBodyContent<T> }

export interface AcceptMediaTypeOption<M> {
  accept?: M | M[]
}

export interface BodySerializerOption<TBody> {
  bodySerializer?: (body: TBody) => any
}

export type FilterMethods<T> = { [K in keyof Omit<T, 'parameters'> as T[K] extends never | undefined ? never : K]: T[K] }

export type ExtractMediaType<T> = ResponseObjectMap<T> extends Record<string | number, any>
  ? { [S in OkStatus]: Extract<keyof ResponseContent<ResponseObjectMap<T>[S]>, MediaType> }[OkStatus]
  : never

type MethodsOf<Paths, Path extends keyof Paths> = FilterMethods<Paths[Path]>

export type OpenFetchMethod<Paths, Path extends keyof Paths>
  = Extract<keyof MethodsOf<Paths, Path>, string> | Uppercase<Extract<keyof MethodsOf<Paths, Path>, string>>

export type OpenFetchOperation<Paths, Path extends keyof Paths, Method extends string, Methods = MethodsOf<Paths, Path>>
  = 'get' extends Lowercase<Method>
    ? ('get' extends keyof Methods ? Methods['get'] : never)
    : (Lowercase<Method> extends keyof Methods ? Methods[Lowercase<Method>] : never)

export type OpenFetchData<Paths, Path extends keyof Paths, Method extends string, Media>
  = OpenFetchOperation<Paths, Path, Method> extends Record<string | number, any>
    ? FetchResponseData<OpenFetchOperation<Paths, Path, Method>, Media & MediaType>
    : never

export type OpenFetchError<Paths, Path extends keyof Paths, Method extends string>
  = OpenFetchOperation<Paths, Path, Method> extends Record<string | number, any>
    ? FetchResponseError<OpenFetchOperation<Paths, Path, Method>>
    : never

export type OpenFetchMediaType<Paths, Path extends keyof Paths, Method extends string>
  = ExtractMediaType<OpenFetchOperation<Paths, Path, Method>>

export type OpenFetchRequestOptions<
  Paths,
  Path extends keyof Paths,
  Method extends string,
  Media,
  Operation = OpenFetchOperation<Paths, Path, Method>,
>
  = MethodOption<Method, MethodsOf<Paths, Path>>
  & ParamsOption<Operation>
  & RequestBodyOption<Operation>
  & AcceptMediaTypeOption<Media>
  & BodySerializerOption<RequestBodyOption<Operation>['body']>
  & Omit<FetchOptions, 'query' | 'body' | 'method'>

export type OpenFetchOptions<Paths, ReqT extends Extract<keyof Paths, string>> = ReqT extends Extract<keyof Paths, string>
  ? {
      [Method in Extract<keyof MethodsOf<Paths, ReqT>, string>]: OpenFetchRequestOptions<
        Paths,
        ReqT,
        Method | Uppercase<Method>,
        OpenFetchMediaType<Paths, ReqT, Method>
      >
    }[Extract<keyof MethodsOf<Paths, ReqT>, string>]
  : never

export type OpenFetchCreateOptions = Omit<FetchOptions, 'body' | 'method' | 'parseResponse' | 'responseType'>

export interface OpenFetchClient<Paths> {
  <
    Path extends Extract<keyof Paths, string>,
    Method extends OpenFetchMethod<Paths, Path>,
    Media extends OpenFetchMediaType<Paths, Path, Method>,
  >(
    url: Path,
    options?: OpenFetchRequestOptions<Paths, Path, Method, Media>,
  ): Promise<OpenFetchData<Paths, Path, Method, Media>>
  raw: <
    Path extends Extract<keyof Paths, string>,
    Method extends OpenFetchMethod<Paths, Path>,
    Media extends OpenFetchMediaType<Paths, Path, Method>,
  >(
    url: Path,
    options?: OpenFetchRequestOptions<Paths, Path, Method, Media>,
  ) => Promise<FetchResponse<OpenFetchData<Paths, Path, Method, Media>>>
  create: (defaults?: OpenFetchCreateOptions) => OpenFetchClient<Paths>
}

// More flexible way to rewrite the request path,
// but has problems - https://github.com/unjs/ofetch/issues/319
export function openFetchRequestInterceptor(ctx: FetchContext) {
  // @ts-expect-error - `path` is not in FetchOptions
  ctx.request = fillPath(ctx.request as string, (ctx.options).path)
}

// Prepends a bridge interceptor calling the Nuxt runtime hooks (`openFetch:onRequest`,
// `openFetch:onRequest:{client}`, ...) before the user's own interceptors.
// ofetch >=1.4 runs arrays of interceptors, so no manual chaining is needed.
function withNuxtHooks(opts: FetchOptions, hooks: Hooks, hookIdentifier?: OpenFetchClientName) {
  const openFetchHooks: Array<keyof FetchHooks> = [
    'onRequest',
    'onRequestError',
    'onResponse',
    'onResponseError',
  ]

  if (!hooks)
    return

  for (const hook of openFetchHooks) {
    // @ts-ignore
    const bridge = async (ctx: Parameters<RuntimeNuxtHooks[`openFetch:${typeof hook}`]>[0]) => {
      await (hooks.callHook as any)(`openFetch:${hook}`, ctx)

      if (hookIdentifier) {
        await (hooks.callHook as any)(`openFetch:${hook}:${hookIdentifier}`, ctx)
      }
    }
    const userHooks = opts[hook]

    // @ts-ignore
    opts[hook] = [bridge, ...(Array.isArray(userHooks) ? userHooks : userHooks ? [userHooks] : [])]
  }
}

export function createOpenFetch<Paths>(
  options: FetchOptions | ((options: FetchOptions) => FetchOptions),
  localFetch?: typeof globalThis.$fetch,
  hookIdentifier?: string,
  hooks: OpenFetchHooks | null = null,
): OpenFetchClient<Paths> {
  const prepare = (url: string, baseOpts: any) => {
    baseOpts = typeof options === 'function'
      ? options(baseOpts)
      : mergeFetchOptions(options, baseOpts)

    const opts: FetchOptions & {
      path?: Record<string, string>
      accept?: MediaType | MediaType[]
      header: HeadersInit | undefined
      bodySerializer?: (body: any) => any
    } = { ...baseOpts }

    withNuxtHooks(opts, hooks, hookIdentifier as OpenFetchClientName)

    if (opts.body && opts.bodySerializer) {
      opts.body = opts.bodySerializer(opts.body)
    }

    if (opts.header) {
      opts.headers = mergeHeaders(opts.headers, opts.header)
      delete opts.header
    }

    opts.headers = new Headers(opts.headers)
    if (opts.accept) {
      opts.headers.set(
        'Accept',
        Array.isArray(opts.accept)
          ? opts.accept.join(', ')
          : opts.accept,
      )
      delete opts.accept
    }

    const $fetch = getFetch(url, opts, localFetch)

    return { $fetch, path: fillPath(url, opts?.path), opts }
  }

  const client = (url: string, baseOpts: any) => {
    const { $fetch, path, opts } = prepare(url, baseOpts)
    return $fetch(path, opts as any)
  }

  client.raw = (url: string, baseOpts: any) => {
    const { $fetch, path, opts } = prepare(url, baseOpts)
    return $fetch.raw(path, opts as any)
  }

  client.create = (defaults: OpenFetchCreateOptions) => createOpenFetch<Paths>(
    typeof options === 'function'
      ? (callOpts: FetchOptions) => options(mergeFetchOptions(defaults, callOpts))
      : mergeFetchOptions(options, defaults),
    localFetch,
    hookIdentifier,
    hooks,
  )

  return client as OpenFetchClient<Paths>
}

function mergeFetchOptions(defaults: FetchOptions = {}, input: FetchOptions = {}): FetchOptions {
  const options = { ...defaults, ...input }

  if (defaults.headers || input.headers)
    options.headers = mergeHeaders(defaults.headers, input.headers)

  if (defaults.query || defaults.params || input.query || input.params) {
    options.query = {
      ...defaults.params,
      ...defaults.query,
      ...input.params,
      ...input.query,
    }
    options.params = options.query
  }

  return options
}

function mergeHeaders(defaults?: HeadersInit, input?: HeadersInit) {
  const headers = new Headers(defaults)

  if (input) {
    for (const [name, value] of new Headers(input))
      headers.set(name, value)
  }

  return headers
}

function getFetch(url: string, opts: FetchOptions, localFetch?: typeof globalThis.$fetch) {
  if (import.meta.server && localFetch) {
    const isLocalFetch = url[0] === '/' && (!opts.baseURL || opts.baseURL![0] === '/')
    if (isLocalFetch)
      return localFetch
  }

  return globalThis.$fetch ?? ofetch
}

export function fillPath(path: string, params: Record<string, string> = {}) {
  for (const [k, v] of Object.entries(params)) path = path.replace(`{${k}}`, encodeURIComponent(String(v)))
  return path
}
