import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

async function readRuntimeOutput(directory: string): Promise<string> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name)

    if (entry.isDirectory())
      return readRuntimeOutput(path)

    return /\.[cm]?js$/.test(entry.name) ? readFile(path, 'utf8') : ''
  }))

  return files.join('\n')
}

describe('type-only imports', () => {
  it('generates type-only import declarations', async () => {
    const appImports = await readFile(resolve('.nuxt/types/imports.d.ts'), 'utf8')
    const sharedImports = await readFile(resolve('.nuxt/types/shared-imports.d.ts'), 'utf8')
    const nitroImports = await readFile(resolve('.nuxt/types/nitro-imports.d.ts'), 'utf8')

    expect(appImports).toMatch(/^\s*export type \{ OpenFetchClient, OpenFetchOptions \}/m)
    expect(appImports).toMatch(/^\s*export type \{ UseOpenFetchClient \}/m)
    expect(appImports).not.toMatch(/^\s*const (?:OpenFetchClient|OpenFetchOptions|UseOpenFetchClient):/m)

    expect(sharedImports).toMatch(/^\s*export type \{ OpenFetchClient \}/m)
    expect(sharedImports).not.toMatch(/^\s*const OpenFetchClient:/m)
    expect(nitroImports).toMatch(/^\s*export type \{ OpenFetchClient \}/m)
    expect(nitroImports).not.toMatch(/^\s*const OpenFetchClient:/m)
  })

  it('omits Open Fetch types from production output', async () => {
    const output = await readRuntimeOutput(resolve('.output'))

    expect(output).not.toMatch(/\b(OpenFetchClient|OpenFetchOptions|UseOpenFetchClient)\b/)
  })
})
