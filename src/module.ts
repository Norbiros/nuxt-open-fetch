import { existsSync } from 'node:fs'
import type { Readable } from 'node:stream'
import type { FetchOptions } from 'ofetch'
import type { OpenAPI3, OpenAPITSOptions } from "openapi-typescript"
import { defineNuxtModule, createResolver, addTypeTemplate, addTemplate, addImportsSources, addPlugin, addServerPlugin, addServerImports, addServerHandler } from '@nuxt/kit'
import openapiTS from "openapi-typescript"
import { pascalCase, kebabCase, upperFirst } from 'scule'
import { defu } from 'defu'
import { isValidUrl } from './utils'
import { Project, ScriptTarget, SyntaxKind, printNode } from "ts-morph";

type OpenAPI3Schema = string | URL | OpenAPI3 | Readable

export interface OpenFetchOptions extends Pick<FetchOptions, 'baseURL' | 'query' | 'headers'> { }

export interface OpenFetchClientOptions extends OpenFetchOptions {
  schema?: OpenAPI3Schema
}

export interface ModuleOptions {
  clients?: Record<string, OpenFetchClientOptions>
  servers?: Record<string, OpenFetchClientOptions>
  openAPITS?: OpenAPITSOptions
  disablePlugin?: boolean
}

interface ResolvedSchema {
  name: string
  fetchName: {
    composable: string,
    lazyComposable: string
  },
  schema: OpenAPI3Schema
  openAPITS?: OpenAPITSOptions
}

interface ResolvedServerSchema {
  name: string
  fetchName: string,
  schema: OpenAPI3Schema
  openAPITS?: OpenAPITSOptions
}

const moduleName = 'nuxt-open-fetch'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: moduleName,
    configKey: 'openFetch',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const schemas: ResolvedSchema[] = []
    const clients: Record<string, OpenFetchClientOptions> = defu(nuxt.options.runtimeConfig.openFetch as any, options.clients)

    nuxt.options.runtimeConfig.public.openFetch = Object.fromEntries(Object.entries(clients)
      .map(([key, { schema: _, ...options }]) => [key, options])) as any

    for (const layer of nuxt.options._layers) {
      const { srcDir, openFetch } = layer.config as typeof layer.config & { openFetch?: ModuleOptions }
      const schemasDir = resolve(srcDir, 'openapi')
      const layerClients = defu(
        Object.fromEntries(Object.entries(clients).filter(([key]) => openFetch?.clients?.[key])),
        openFetch?.clients,
      ) as Record<string, OpenFetchClientOptions>

      for (const [name, config] of Object.entries(layerClients)) {
        // Skip if schema already added by upper layer or if config is not defined
        if (schemas.some(item => item.name === name) || !config) continue

        let schema: OpenAPI3Schema | undefined = undefined

        if (config.schema && typeof config.schema === 'string') {
          schema = isValidUrl(config.schema) ? config.schema : resolve(srcDir, config.schema)
        } else {
          const jsonPath = resolve(schemasDir, `${name}/openapi.json`)
          const yamlPath = resolve(schemasDir, `${name}/openapi.yaml`)

          schema = existsSync(jsonPath) ? jsonPath : existsSync(yamlPath) ? yamlPath : undefined
        }

        if (!schema) throw new Error(`Could not find OpenAPI schema for "${name}"`)

        schemas.push({
          name,
          fetchName: {
            composable: getClientName(name),
            lazyComposable: getClientName(name, true)
          },
          schema,
          openAPITS: options?.openAPITS,
        })
      }
    }

    nuxt.options.optimization = nuxt.options.optimization || {
      keyedComposables: []
    }

    nuxt.options.optimization.keyedComposables = [
      ...nuxt.options.optimization.keyedComposables,
      ...schemas.flatMap(({ fetchName }) => [
        { name: fetchName.composable, argumentLength: 3 },
        { name: fetchName.lazyComposable, argumentLength: 3 }
      ])
    ]

    const generatedSchemas = schemas.map(({ name, fetchName, schema, openAPITS }) => {
      const { filename } = addTypeTemplate({
        filename: `types/${moduleName}/${kebabCase(name)}.d.ts`,
        getContents: () => openapiTS(schema, openAPITS)
      })

      return {
        name,
        filename,
        fetchName
      }
    })

    addImportsSources({
      from: resolve(nuxt.options.buildDir, `${moduleName}.d.ts`),
      imports: schemas.flatMap(({ fetchName }) => Object.values(fetchName)),
    })

    addImportsSources({
      from: resolve(`runtime/clients`),
      imports: [
        'createOpenFetch',
        'createUseOpenFetch',
        'openFetchRequestInterceptor',
        'OpenFetchClient',
        'UseOpenFetchClient',
        'OpenFetchOptions'
      ]
    })

    addTemplate({
      filename: `${moduleName}.d.ts`,
      getContents() {
        return `
import { createUseOpenFetch } from '#imports'
${generatedSchemas.map(({ name, filename }) => `
import type { paths as ${pascalCase(name)}Paths } from '#build/${filename}'
`.trimStart()).join('').trimEnd()}

${generatedSchemas.length ? `export type OpenFetchClientName = ${schemas.map(({ name }) => `'${name}'`).join(' | ')}` : ''}

${generatedSchemas.map(({ name, fetchName }) => `
/**
 * Fetch data from an OpenAPI endpoint with an SSR-friendly composable.
 * See {@link https://nuxt-open-fetch.vercel.app/composables/useclientfetch}
 * @param string The OpenAPI path to fetch
 * @param opts extends useFetch, $fetch options and useAsyncData options
 */
export const ${fetchName.composable} = createUseOpenFetch<${pascalCase(name)}Paths>('${name}')
/**
 * Fetch data from an OpenAPI endpoint with an SSR-friendly composable.
 * See {@link https://nuxt-open-fetch.vercel.app/composables/uselazyclientfetch}
 * @param string The OpenAPI path to fetch
 * @param opts extends useFetch, $fetch options and useAsyncData options
 */
export const ${fetchName.lazyComposable} = createUseOpenFetch<${pascalCase(name)}Paths>('${name}', true)
`.trimStart()).join('\n')}`.trimStart()
      },
      write: true
    })

    addTypeTemplate({
      filename: `types/${moduleName}.d.ts`,
      getContents: () => `
import type { OpenFetchClient } from '#imports'
${generatedSchemas.map(({ name, filename }) => `
import type { paths as ${pascalCase(name)}Paths } from '#build/${filename}'
`.trimStart()).join('').trimEnd()}

declare module '#app' {
  interface NuxtApp {
    ${generatedSchemas.map(({ name }) => `$${name}Fetch: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n    ')}
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    ${generatedSchemas.map(({ name }) => `$${name}Fetch: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n    ')}
  }
}

export {}
`.trimStart()
    })

    if (!options.disablePlugin) addPlugin(resolve('./runtime/nuxt-plugin'))

    /**
     * Add (nitro) server support
     */

    const serverSchemas: ResolvedServerSchema[] = []
    const servers: Record<string, OpenFetchClientOptions> = defu(nuxt.options.runtimeConfig.openFetchServer as any, options.servers)

    nuxt.options.runtimeConfig.public.openFetchServer = Object.fromEntries(Object.entries(servers)
      .map(([key, { schema: _, ...options }]) => [key, options])) as any

    for (const layer of nuxt.options._layers) {
      const { srcDir, openFetch } = layer.config = layer.config as typeof layer.config & { openFetch?: ModuleOptions }
      const schemasDir = resolve(srcDir, 'openapi')
      const layerServers = defu(
        Object.fromEntries(Object.entries(servers).filter(([key]) => openFetch?.servers?.[key])),
        openFetch?.servers,
      ) as Record<string, OpenFetchClientOptions>

      for (const [name, config] of Object.entries(layerServers)) {
        // Skip if schema already added by upper layer or if config is not defined
        if (serverSchemas.some(item => item.name === name) || !config) continue

        let schema: OpenAPI3Schema | undefined = undefined

        if (config.schema && typeof config.schema === 'string') {
          schema = isValidUrl(config.schema) ? config.schema : resolve(srcDir, config.schema)
        } else {
          const jsonPath = resolve(schemasDir, `${name}/openapi.json`)
          const yamlPath = resolve(schemasDir, `${name}/openapi.yaml`)

          schema = existsSync(jsonPath) ? jsonPath : existsSync(yamlPath) ? yamlPath : undefined
        }

        if (!schema) throw new Error(`Could not find OpenAPI schema for "${name}"`)

        serverSchemas.push({
          name,
          fetchName: getServerName(name),
          schema,
          openAPITS: options?.openAPITS,
        })
      }
    }

    const serverImports = [
      'createOpenFetch',
      'createUseOpenFetch',
      'openFetchRequestInterceptor',
      'OpenFetchClient',
      'UseOpenFetchClient',
      'OpenFetchOptions',
    ]
    serverImports.forEach((name) => {
      addServerImports([{
        name,
        from: resolve('runtime/server'),
      }])
    })

    const schemaASTs = new Map<string, string>()

    for (const { name, schema, openAPITS } of serverSchemas) {
      schemaASTs.set(name, await openapiTS(schema, openAPITS))
      addTypeTemplate({
        filename: `types/${moduleName}/${kebabCase(name)}.server.d.ts`,
        getContents: () => openapiTS(schema, openAPITS)
      })
    }

    const serverFetchNamePrefix = '$fetch'

    const serverSourceTemplate = addTemplate({
      filename: `${moduleName}.server.ts`,
      getContents() {
        return `
import type { OpenFetchClient } from '#imports'
${serverSchemas.map(({ name }) => `
import type { paths as ${pascalCase(name)}Paths } from '#build/types/${moduleName}/${kebabCase(name)}.server'
`.trimStart()).join('').trimEnd()}

interface INuxtOpenFetchServer {
  [key: string]: OpenFetchClient<any>

  ${serverSchemas.map(({ name }) => `
  ${serverFetchNamePrefix}${upperFirst(name)}: OpenFetchClient<${pascalCase(name)}Paths>`.trimStart()).join('\n')}
}

export const nuxtOpenFetchServer: INuxtOpenFetchServer = {} as INuxtOpenFetchServer

export const useNuxtOpenFetchServer = () => nuxtOpenFetchServer

`.trimStart()
      },
      write: true
    })

    const serverSourceTemplateImports = [
      'nuxtOpenFetchServer',
      'useNuxtOpenFetchServer',
    ]
    serverSourceTemplateImports.forEach((name) => {
      addServerImports([{
        name: name,
        from: serverSourceTemplate.dst,
      }])
    })

    for (const [name, ast] of schemaASTs) {
      const project = new Project({
        compilerOptions: {
          target: ScriptTarget.ESNext,
        },
      });

      const tsSourceFile = project.createSourceFile(resolve(`runtime/server/types/${moduleName}/${kebabCase(name)}.d.ts`), ast)

      const tsPathInterface = tsSourceFile.getInterfaceOrThrow('paths');
      const tsPathInterfaceProperties = tsPathInterface.getProperties()

      tsPathInterfaceProperties.forEach((prop) => {
        const route = prop.getSymbolOrThrow().getName()
        const methods = prop.getType().getSymbolOrThrow().getMembers().map( m => m.getName())
        methods.forEach((method) =>
          addServerHandler({
            route: `/api${route}`,
            method,
            handler: resolve('./runtime/testhandler.ts')
          })
        )
      })
    }

    // Transpile need to solve error '#imports' not allowed in server runtime
    nuxt.options.build.transpile.push(resolve('./runtime/nitro-plugin'))
    if (!options.disablePlugin) addServerPlugin(resolve('./runtime/nitro-plugin'))
  }
})

function getClientName(name: string, lazy = false) {
  return `use${lazy ? 'Lazy' : ''}${pascalCase(`${name}-fetch`)}`
}

export function getServerName(name: string) {
  return `$fetch${upperFirst(name)}`
}
