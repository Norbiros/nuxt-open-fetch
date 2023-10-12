import { existsSync } from 'node:fs'
import type { Readable } from 'node:stream'
import type { FetchOptions } from 'ofetch'
import type { OpenAPI3, OpenAPITSOptions } from "openapi-typescript"
import { defineNuxtModule, createResolver, addTypeTemplate, addTemplate, addImportsSources, addPlugin, addImports } from '@nuxt/kit'
import openapiTS from "openapi-typescript"
import { pascalCase, camelCase, kebabCase } from 'scule'
import { defu } from 'defu'
import { isValidUrl } from './utils'

type OpenAPI3Schema = string | URL | OpenAPI3 | Readable

export interface OpenFetchOptions extends Omit<FetchOptions, 'method' | 'params' | 'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError' | 'parseResponse' | 'body' | 'signal'> { }

export interface OpenFetchClientOptions {
  schema?: OpenAPI3Schema
  fetchOptions?: OpenFetchOptions
  functionSuffix?: string
}

export interface ModuleOptions {
  clients?: Record<string, OpenFetchClientOptions>
  openAPITS?: OpenAPITSOptions
}

interface ResolvedSchema {
  name: string
  fetchName: {
    raw: string,
    composable: string,
    lazyComposable: string
  },
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

    for (const layer of nuxt.options._layers) {
      const { srcDir, openFetch: options } = layer.config
      const schemasDir = resolve(srcDir, 'openapi')

      for (const [name, config] of Object.entries(options?.clients || {})) {
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
            raw: getClientName(name, { suffix: config.functionSuffix }),
            composable: getClientName(name, { suffix: config.functionSuffix, isComposable: true }),
            lazyComposable: getClientName(name, { suffix: config.functionSuffix, isComposable: true, lazy: true })
          },
          schema,
          openAPITS: options?.openAPITS,
        })
      }
    }

    nuxt.options.runtimeConfig.public.openFetch = defu(nuxt.options.runtimeConfig.public.openFetch as any, options)

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

    for (const { name, schema, openAPITS } of schemas) {
      addTypeTemplate({
        filename: `types/${moduleName}/${kebabCase(name)}.d.ts`,
        getContents: () => openapiTS(schema, openAPITS)
      })
    }

    addImportsSources({
      from: resolve(nuxt.options.buildDir, `${moduleName}.ts`),
      imports: schemas.flatMap(({ fetchName }) => Object.values(fetchName)),
    })

    addImportsSources({
      from: resolve(`runtime/clients`),
      imports: [
        'createOpenFetchClient',
        'createUseOpenFetchClient',
        'createUseLazyOpenFetchClient',
        'OpenFetchClient',
        'UseOpenFetchClient',
        'UseLazyOpenFetchClient',
        'OpenFetchOptions'
      ]
    })

    addTemplate({
      filename: `${moduleName}.ts`,
      getContents() {
        return `
import { createOpenFetchClient, createUseOpenFetchClient, createUseLazyOpenFetchClient } from '#imports'
${schemas.map(({ name }) => `
import type { paths as ${pascalCase(name)}Paths } from '#build/types/${moduleName}/${kebabCase(name)}'
`.trimStart()).join('').trimEnd()}

${schemas.length ? `export type OpenFetchClientName = ${schemas.map(({ name }) => `'${name}'`).join(' | ')}` : ''}

${schemas.map(({ name, fetchName }) => `
export const ${fetchName.raw} = createOpenFetchClient<${pascalCase(name)}Paths>('${name}')
export const ${fetchName.composable} = createUseOpenFetchClient<${pascalCase(name)}Paths>('${name}')
export const ${fetchName.lazyComposable} = createUseLazyOpenFetchClient<${pascalCase(name)}Paths>('${name}')
`.trimStart()).join('\n')}`.trimStart()
      },
      write: true
    })

    addTypeTemplate({
      filename: `types/${moduleName}.d.ts`,
      getContents: () => `
import type { OpenFetchOptions } from '#imports'
import type { OpenFetchClientName } from '#build/nuxt-open-fetch'

declare module '#app' {
  interface NuxtApp {
    $openFetch: Record<OpenFetchClientName, OpenFetchOptions>
  }
}
        
declare module 'vue' {
  interface ComponentCustomProperties {
    $openFetch: Record<OpenFetchClientName, OpenFetchOptions>
  }
}

export {}
`.trimStart()
    })

    addPlugin(resolve('./runtime/plugin'))

    addImports({
      name: 'useOpenFetchOptions',
      as: 'useOpenFetchOptions',
      from: resolve('runtime/composables/useOpenFetchOptions')
    })

    function getClientName(name: string, { suffix = 'fetch', isComposable = false, lazy = false } = {}) {
      name = name === 'default' ? 'open' : name
      return isComposable ? `use${lazy ? 'Lazy' : ''}${pascalCase(`${name}-${suffix}`)}` : `$${camelCase(`${name}-${suffix}`)}`
    }
  }
})
