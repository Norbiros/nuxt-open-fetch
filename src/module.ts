import type { Readable } from 'node:stream'
import type { FetchOptions } from 'ofetch'
import type { OpenAPI3, OpenAPITSOptions } from 'openapi-typescript'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import {
  addImportsSources,
  addPlugin,
  addServerImports,
  addServerPlugin,
  addTemplate,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import { hash } from 'ohash'
import openapiTS, { astToString } from 'openapi-typescript'
import { join } from 'pathe'

import { kebabCase, pascalCase } from 'scule'
import { name, version } from '../package.json'

type OpenAPI3Schema = string | URL | OpenAPI3 | Readable

export interface OpenFetchOptions extends Pick<FetchOptions, 'baseURL' | 'query' | 'headers'> { }

export interface OpenFetchClientOptions extends OpenFetchOptions {
  schema?: OpenAPI3Schema
}

export interface ModuleOptions {
  clients?: Record<string, OpenFetchClientOptions>
  openAPITS?: OpenAPITSOptions
  disableNuxtPlugin?: boolean
  disableNitroPlugin?: boolean
}

interface ResolvedSchema {
  name: string
  fetchName: {
    composable: string
    lazyComposable: string
  }
  schema: OpenAPI3Schema
  openAPITS?: OpenAPITSOptions
}

const moduleName = 'open-fetch'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'openFetch',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt) {
    if (!options.clients)
      return

    const { resolve } = createResolver(import.meta.url)
    const schemas: ResolvedSchema[] = []

    nuxt.options.runtimeConfig.public.openFetch = Object.fromEntries(Object.entries(options.clients)
      .map(([key, { schema: _, ...options }]) => [key, options])) as any

    for (const layer of nuxt.options._layers) {
      const { rootDir, openFetch } = layer.config
      const schemasDir = resolve(rootDir, 'openapi')
      const layerClients = Object.entries(options.clients).filter(([key]) => openFetch?.clients?.[key])

      if (nuxt.options.dev) {
        nuxt.options.watch.push(schemasDir)
      }

      for (const [name, config] of layerClients) {
        // Skip if schema already added by upper layer or if config is not defined
        if (schemas.some(item => item.name === name) || !config)
          continue

        let schema: OpenAPI3Schema | undefined = config.schema

        if (!config.schema) {
          const extensions = ['json', 'yaml', 'yml']
          for (const extension of extensions) {
            const filePath = resolve(schemasDir, `${name}/openapi.${extension}`)
            if (existsSync(filePath)) {
              schema = new URL(`file://${filePath}`)
              break
            }
          }
        }
        else if (typeof config.schema === 'string') {
          schema = isValidUrl(config.schema) ? config.schema : new URL(`file://${resolve(rootDir, config.schema)}`)
        }

        if (!schema)
          throw new Error(`Could not find OpenAPI schema for "${name}"`)

        schemas.push({
          name,
          fetchName: {
            composable: getClientName(name),
            lazyComposable: getClientName(name, true),
          },
          schema,
          openAPITS: options?.openAPITS,
        })
      }
    }

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '#open-fetch': join(nuxt.options.buildDir, moduleName),
      '#open-fetch-schemas/*': join(nuxt.options.buildDir, 'types', moduleName, 'schemas', '*'),
    }

    nuxt.options.optimization = nuxt.options.optimization || {
      keyedComposables: [],
    }

    nuxt.options.optimization.keyedComposables = [
      ...nuxt.options.optimization.keyedComposables,
      ...schemas.flatMap(({ fetchName }) => [
        { name: fetchName.composable, argumentLength: 3 },
        { name: fetchName.lazyComposable, argumentLength: 3 },
      ]),
    ]

    schemas.forEach(({ name, schema, openAPITS }) => {
      addTemplate({
        filename: `types/${moduleName}/schemas/${kebabCase(name)}.d.ts`,
        getContents: () =>
          addCachedSchemaTemplate({
            name,
            schema,
            openAPITS,
            moduleName,
            nuxtBuildDir: nuxt.options.buildDir || '.nuxt',
            resolvePath: resolve,
          }),
        write: true,
      })
    })

    addImportsSources({
      from: resolve(nuxt.options.buildDir, `${moduleName}.ts`),
      imports: schemas.flatMap(({ fetchName }) => Object.values(fetchName)),
    })

    addImportsSources({
      from: resolve(`runtime/fetch`),
      imports: [
        'createOpenFetch',
        'openFetchRequestInterceptor',
        'OpenFetchClient',
        'OpenFetchOptions',
      ],
    })

    addImportsSources({
      from: resolve(`runtime/useFetch`),
      imports: [
        'createUseOpenFetch',
        'UseOpenFetchClient',
      ],
    })

    addServerImports([{
      name: 'createOpenFetch',
      from: resolve('runtime/fetch'),
    }])

    addServerImports([{
      name: 'OpenFetchClient',
      from: resolve('runtime/fetch'),
    }])

    addTypeTemplate({
      filename: 'types/open-fetch-hooks.d.ts',
      getContents: () => `
import type { OpenFetchClientName } from '#open-fetch'
import type { FetchHooks } from 'ofetch'

type InferFirstParameter<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never
type InferMaybeArray<T> = T extends Array<infer U> ? U : T
type FetchHooksContext<T extends keyof FetchHooks> = InferFirstParameter<NonNullable<InferMaybeArray<FetchHooks[T]>>>
type HookResult = import('@nuxt/schema').HookResult

export type GlobalFetchHooks = {
  [K in keyof Required<FetchHooks> as \`openFetch:\${K}\`]: (ctx: FetchHooksContext<K>) => HookResult
}

export type ClientFetchHooks = {
  [K in keyof Required<FetchHooks> as \`openFetch:\${K}:\${OpenFetchClientName}\`]: (ctx: FetchHooksContext<K>) => HookResult
}

declare module '#app' {
  interface RuntimeNuxtHooks extends GlobalFetchHooks, ClientFetchHooks {}
}

declare module 'nitropack' {
  interface NitroRuntimeHooks extends GlobalFetchHooks, ClientFetchHooks {}
}

export {}
`,
    })

    addTemplate({
      filename: `${moduleName}.ts`,
      getContents() {
        return `
import { createUseOpenFetch } from '#imports'
${schemas.map(({ name }) => `
import type { paths as ${pascalCase(name)}Paths, operations as ${pascalCase(name)}Operations } from '#open-fetch-schemas/${kebabCase(name)}'
`.trimStart()).join('').trimEnd()}

${schemas.length ? `export type OpenFetchClientName = ${schemas.map(({ name }) => `'${name}'`).join(' | ')}` : ''}

${schemas.map(({ name, fetchName }) => `
/**
 * Fetch data from an OpenAPI endpoint with an SSR-friendly composable.
 *
 * @param url - The OpenAPI path to fetch
 * @param opts - Options extending \`useFetch\`, \`$fetch\`, and \`useAsyncData\`.
 *
 * @see https://nuxt-open-fetch.norbiros.dev/composables/useclient
 */
export const ${fetchName.composable} = createUseOpenFetch<${pascalCase(name)}Paths>('${name}')
/**
 * Lazily fetch data from an OpenAPI endpoint with an SSR-friendly composable.
 *
 * @param url - The OpenAPI path to fetch
 * @param opts - Options extending \`useFetch\`, \`$fetch\`, and \`useAsyncData\`.
 *
 * @see https://nuxt-open-fetch.norbiros.dev/composables/uselazyclient
 */
export const ${fetchName.lazyComposable} = createUseOpenFetch<${pascalCase(name)}Paths>('${name}', true)

export type ${pascalCase(name)}Response<T extends keyof ${pascalCase(name)}Operations, R extends keyof ${pascalCase(name)}Operations[T]['responses'] & number = Extract<keyof ${pascalCase(name)}Operations[T]['responses'] & number, 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226>> = ${pascalCase(name)}Operations[T]['responses'][R] extends { content: { 'application/json': infer U } }
  ? U
  : never

export type ${pascalCase(name)}RequestBody<T extends keyof ${pascalCase(name)}Operations> = ${pascalCase(name)}Operations[T] extends { requestBody?: { content: { 'application/json': infer U } } | undefined }
  ? U
  : never

export type ${pascalCase(name)}RequestQuery<T extends keyof ${pascalCase(name)}Operations> = ${pascalCase(name)}Operations[T]['parameters'] extends { query?: infer U } ? U : never

export type ${pascalCase(name)}RequestPath<T extends keyof ${pascalCase(name)}Operations> = ${pascalCase(name)}Operations[T]['parameters'] extends { path?: infer U } ? U : never
`.trimStart()).join('\n')}`.trimStart()
      },
      write: true,
    })

    // Nuxt types
    addTypeTemplate({
      filename: `types/${moduleName}/nuxt.d.ts`,
      getContents: () => `
import type { OpenFetchClient } from '#imports'
${schemas.map(({ name }) => `
import type { paths as ${pascalCase(name)}Paths } from '#open-fetch-schemas/${kebabCase(name)}'
`.trimStart()).join('').trimEnd()}

declare module '#app' {
  interface NuxtApp {
    ${schemas.map(({ name }) => `$${name}: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n    ')}
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    ${schemas.map(({ name }) => `$${name}: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n    ')}
  }
}

export {}
`.trimStart(),
    })

    // Nitro types
    addTemplate({
      filename: `types/${moduleName}/nitro.d.ts`,
      getContents: () => `
import type { OpenFetchClient } from '#imports'
${schemas.map(({ name }) => `
import type { paths as ${pascalCase(name)}Paths } from '#open-fetch-schemas/${kebabCase(name)}'
`.trimStart()).join('').trimEnd()}

declare module 'nitropack/types' {
  interface NitroApp {
    ${schemas.map(({ name }) => `$${name}: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n    ')}
  }
}

export {}
`.trimStart(),
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.typescript?.tsConfig?.include?.push(`./types/${moduleName}/nitro.d.ts`)
    })

    if (!options.disableNuxtPlugin)
      addPlugin(resolve('./runtime/nuxt-plugin'))
    if (!options.disableNitroPlugin) {
      // https://github.com/nuxt/nuxt/issues/21497
      nuxt.options.build.transpile.push(resolve('./runtime/nitro-plugin'))
      addServerPlugin(resolve('./runtime/nitro-plugin'))
    }
  },
})

function getClientName(name: string, lazy = false) {
  return `use${lazy ? 'Lazy' : ''}${pascalCase(name)}`
}

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url))
  }
  catch {
    return false
  }
}

interface SchemaOptions {
  name: string
  schema: string | URL | OpenAPI3 | Readable
  openAPITS?: object
  moduleName: string
  nuxtBuildDir: string
  resolvePath: (...paths: string[]) => string
}

export async function addCachedSchemaTemplate({
  name,
  schema,
  openAPITS,
  moduleName,
  nuxtBuildDir,
  resolvePath,
}: SchemaOptions) {
  const shortName = kebabCase(name)
  const cacheDir = resolvePath(nuxtBuildDir || '.nuxt', `cache/${moduleName}`)
  await mkdir(cacheDir, { recursive: true })

  let fileBody = ''
  const filePath = schema instanceof URL ? fileURLToPath(schema) : schema
  if (typeof filePath === 'string' && existsSync(filePath)) {
    fileBody = await readFile(filePath, 'utf-8')
  }
  else {
    // Currently we can only cache local files
    const ast = await openapiTS(schema, openAPITS)
    return astToString(ast)
  }

  const key = hash([schema, openAPITS, moduleName, shortName, fileBody])
  const cachedPath = resolvePath(cacheDir, `${shortName}-${key}.d.ts`)

  if (existsSync(cachedPath)) {
    return await readFile(cachedPath, 'utf-8')
  }

  const ast = await openapiTS(schema, openAPITS)
  const contents = astToString(ast)

  await writeFile(cachedPath, contents, 'utf-8')

  for (const file of await readdir(cacheDir)) {
    if (file.startsWith(`${shortName}-`) && file !== `${shortName}-${key}.d.ts`) {
      try {
        await unlink(resolvePath(cacheDir, file))
      }
      catch {}
    }
  }

  return contents
}
