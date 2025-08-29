# Changelog


## v0.13.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.13.2...v0.13.3)

### 🚀 Enhancements

- Allow defining the Accept header to filter return type ([60b5d10](https://github.com/enkot/nuxt-open-fetch/commit/60b5d10))

### 🩹 Fixes

- Restrict acceptable media types in accept to declared ones ([28edbb6](https://github.com/enkot/nuxt-open-fetch/commit/28edbb6))

### 📖 Documentation

- Add bun installation instructions ([e668e4f](https://github.com/enkot/nuxt-open-fetch/commit/e668e4f))
- Add accept parameter in individual function documentation ([20ee778](https://github.com/enkot/nuxt-open-fetch/commit/20ee778))
- Properly mention how to use the runtime config ([#107](https://github.com/enkot/nuxt-open-fetch/pull/107))

### 🏡 Chore

- Use github alerts in `README.md` ([3b182a1](https://github.com/enkot/nuxt-open-fetch/commit/3b182a1))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Loïc Herman <loic@loicherman.ch>

## v0.13.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.13.1...v0.13.2)

### 🚀 Enhancements

- Support `.yml` file extension ([#102](https://github.com/enkot/nuxt-open-fetch/pull/102))

### 🩹 Fixes

- **docs:** Correct how to create custom client with hooks ([72323ae](https://github.com/enkot/nuxt-open-fetch/commit/72323ae))
- Properly handle `header` property in `$fetch` composable ([#79](https://github.com/enkot/nuxt-open-fetch/pull/79))

### 📖 Documentation

- Update options table in configuration docs ([d6cca1b](https://github.com/enkot/nuxt-open-fetch/commit/d6cca1b))

### 🏡 Chore

- Update the docs website url ([e70f7eb](https://github.com/enkot/nuxt-open-fetch/commit/e70f7eb))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.13.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.12.2...v0.13.1)

### 🚀 Enhancements

- Do not require type stubs on install ([7622068](https://github.com/enkot/nuxt-open-fetch/commit/7622068))
- Add contributors to `package.json` ([3dfb1a8](https://github.com/enkot/nuxt-open-fetch/commit/3dfb1a8))
- Add Nuxt runtime hooks for fetch client hooks ([9bb2cde](https://github.com/enkot/nuxt-open-fetch/commit/9bb2cde))
- **ci:** Add CI configuration for linting and testing ([cc3e587](https://github.com/enkot/nuxt-open-fetch/commit/cc3e587))
- Watch schemas directory in development mode ([f88f2fb](https://github.com/enkot/nuxt-open-fetch/commit/f88f2fb))
- Add major release script to package.json ([840ac40](https://github.com/enkot/nuxt-open-fetch/commit/840ac40))

### 🩹 Fixes

- **docs:** Add missing `better-sqlite3` ([ecddddf](https://github.com/enkot/nuxt-open-fetch/commit/ecddddf))
- **docs:** Update link to Nuxt hooks in custom client documentation ([155255a](https://github.com/enkot/nuxt-open-fetch/commit/155255a))
- **ci:** Temporary disable `test` checks ([368ace8](https://github.com/enkot/nuxt-open-fetch/commit/368ace8))
- Resolve a lot of TypeScript issues ([9388a9c](https://github.com/enkot/nuxt-open-fetch/commit/9388a9c))
- Add TypeScript type checking to the `release` script ([69fc9f4](https://github.com/enkot/nuxt-open-fetch/commit/69fc9f4))
- Properly import methods in `fetch.ts` ([#101](https://github.com/enkot/nuxt-open-fetch/pull/101))
- Properly import methods in `fetch.ts` ([#101](https://github.com/enkot/nuxt-open-fetch/pull/101))

### 🏡 Chore

- **docs:** Update to Nuxt UI & Nuxt Content `v3` ([77b6599](https://github.com/enkot/nuxt-open-fetch/commit/77b6599))
- Update dependencies + Nuxt v4 ([8a6e11b](https://github.com/enkot/nuxt-open-fetch/commit/8a6e11b))
- Run formatter ([9658c46](https://github.com/enkot/nuxt-open-fetch/commit/9658c46))
- **release:** V0.13.0 ([8839002](https://github.com/enkot/nuxt-open-fetch/commit/8839002))
- Add missing `Highlights` section to `v0.13.0` release ([6076bf6](https://github.com/enkot/nuxt-open-fetch/commit/6076bf6))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Johannes Eschricht ([@Eschricht](https://github.com/Eschricht))

## v0.13.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.12.2...v0.13.0)

## 🚨 Highlights

New `nuxt-open-fetch` docs are available at [nuxt-open-fetch.norbiros.dev](https://nuxt-open-fetch.norbiros.dev).

Thanks to @Eschricht, there is a new system for customizing your fetch calls - [Nuxt Hooks](https://nuxt-open-fetch.norbiros.dev/advanced/hooks). This is the **recommended** way to implement custom and not very complex modifications like adding auth headers, logging errors, showing toasts, etc.

Plugins are and will be still available, so there are no breaking changes in this release.

### 🚀 Enhancements

- Do not require type stubs on install ([7622068](https://github.com/enkot/nuxt-open-fetch/commit/7622068))
- Add contributors to `package.json` ([3dfb1a8](https://github.com/enkot/nuxt-open-fetch/commit/3dfb1a8))
- Add Nuxt runtime hooks for fetch client hooks ([9bb2cde](https://github.com/enkot/nuxt-open-fetch/commit/9bb2cde))
- **ci:** Add CI configuration for linting and testing ([cc3e587](https://github.com/enkot/nuxt-open-fetch/commit/cc3e587))
- Watch schemas directory in development mode ([f88f2fb](https://github.com/enkot/nuxt-open-fetch/commit/f88f2fb))
- Add major release script to package.json ([840ac40](https://github.com/enkot/nuxt-open-fetch/commit/840ac40))

### 🩹 Fixes

- **docs:** Add missing `better-sqlite3` ([ecddddf](https://github.com/enkot/nuxt-open-fetch/commit/ecddddf))
- **docs:** Update link to Nuxt hooks in custom client documentation ([155255a](https://github.com/enkot/nuxt-open-fetch/commit/155255a))
- **ci:** Temporary disable `test` checks ([368ace8](https://github.com/enkot/nuxt-open-fetch/commit/368ace8))
- Resolve a lot of TypeScript issues ([9388a9c](https://github.com/enkot/nuxt-open-fetch/commit/9388a9c))
- Add TypeScript type checking to the `release` script ([69fc9f4](https://github.com/enkot/nuxt-open-fetch/commit/69fc9f4))

### 🏡 Chore

- **docs:** Update to Nuxt UI & Nuxt Content `v3` ([77b6599](https://github.com/enkot/nuxt-open-fetch/commit/77b6599))
- Update dependencies + Nuxt v4 ([8a6e11b](https://github.com/enkot/nuxt-open-fetch/commit/8a6e11b))
- Run formatter ([9658c46](https://github.com/enkot/nuxt-open-fetch/commit/9658c46))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Johannes Eschricht ([@Eschricht](https://github.com/Eschricht))

## v0.12.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.12.1...v0.12.2)

### 🩹 Fixes

- Correct module build process (once again) ([a11f21f](https://github.com/enkot/nuxt-open-fetch/commit/a11f21f))

### 🏡 Chore

- **release:** V0.12.1 ([e221a79](https://github.com/enkot/nuxt-open-fetch/commit/e221a79))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.12.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.12.0...v0.12.1)

### 🩹 Fixes

- Resolve multiple bugs in auto key generation ([#97](https://github.com/enkot/nuxt-open-fetch/pull/97))
- **playground:** Rewrite playground code ([3abd499](https://github.com/enkot/nuxt-open-fetch/commit/3abd499))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.12.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.5...v0.12.0)

### 🚀 Enhancements

- Rebrand to `nuxt-open-fetch-x` ([d63207e](https://github.com/enkot/nuxt-open-fetch/commit/d63207e))
- Added type helper for request path ([#84](https://github.com/enkot/nuxt-open-fetch/pull/84))
- Update copyright years ([f96ea95](https://github.com/enkot/nuxt-open-fetch/commit/f96ea95))

### 🩹 Fixes

- Prevent duplicated requests ([#83](https://github.com/enkot/nuxt-open-fetch/pull/83))
- Manually generate keys to prevent double fetching ([d4e4b2e](https://github.com/enkot/nuxt-open-fetch/commit/d4e4b2e))
- Add header parameters to headers ([#80](https://github.com/enkot/nuxt-open-fetch/pull/80))
- Type helpers bug fixes ([#89](https://github.com/enkot/nuxt-open-fetch/pull/89))
- Proper module builder configuration ([f48d0cf](https://github.com/enkot/nuxt-open-fetch/commit/f48d0cf))
- Key generation not taking path parameters into account ([c96f2ca](https://github.com/enkot/nuxt-open-fetch/commit/c96f2ca))
- Properly allow Nuxt `v4` ([951bc97](https://github.com/enkot/nuxt-open-fetch/commit/951bc97))
- Resolve schema dir from rootDir ([8cc014b](https://github.com/enkot/nuxt-open-fetch/commit/8cc014b))
- **docs:** Update `openapi` directory ([0229098](https://github.com/enkot/nuxt-open-fetch/commit/0229098))

### 📖 Documentation

- Improved configuration docs ([67355e2](https://github.com/enkot/nuxt-open-fetch/commit/67355e2))
- Update `README.md` ([ea6a5f5](https://github.com/enkot/nuxt-open-fetch/commit/ea6a5f5))

### 🏡 Chore

- Update to Nuxt 3.15 ([3fce4d7](https://github.com/enkot/nuxt-open-fetch/commit/3fce4d7))
- Run `eslint` ([c3b3360](https://github.com/enkot/nuxt-open-fetch/commit/c3b3360))
- **release:** V0.9.6 ([87df9e4](https://github.com/enkot/nuxt-open-fetch/commit/87df9e4))
- **release:** V0.9.7 ([47af5f6](https://github.com/enkot/nuxt-open-fetch/commit/47af5f6))
- Rebrand to `nuxt-open-fetch-x` in more places ([cbe8753](https://github.com/enkot/nuxt-open-fetch/commit/cbe8753))
- Update to nuxt `3.16.1` ([a1eaf0a](https://github.com/enkot/nuxt-open-fetch/commit/a1eaf0a))
- **release:** V0.10.0 ([eacb1a1](https://github.com/enkot/nuxt-open-fetch/commit/eacb1a1))
- Update dependencies ([37360b6](https://github.com/enkot/nuxt-open-fetch/commit/37360b6))
- **release:** V0.10.1 ([d366fc9](https://github.com/enkot/nuxt-open-fetch/commit/d366fc9))
- **release:** V0.10.2 ([1f68254](https://github.com/enkot/nuxt-open-fetch/commit/1f68254))
- Allow Nuxt `v4` ([94fd7dc](https://github.com/enkot/nuxt-open-fetch/commit/94fd7dc))
- Update `packageManager` to pnpm `10.11.1` ([f1bf6e5](https://github.com/enkot/nuxt-open-fetch/commit/f1bf6e5))
- Update all project dependencies ([a9458d3](https://github.com/enkot/nuxt-open-fetch/commit/a9458d3))
- **release:** V0.10.3 ([efc8152](https://github.com/enkot/nuxt-open-fetch/commit/efc8152))
- **release:** V0.10.4 ([036e043](https://github.com/enkot/nuxt-open-fetch/commit/036e043))
- **release:** V0.11.0 ([635424a](https://github.com/enkot/nuxt-open-fetch/commit/635424a))
- Revert rebranding to `nuxt-open-fetch` ([7aac0cf](https://github.com/enkot/nuxt-open-fetch/commit/7aac0cf))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Julien Huang ([@huang-julien](https://github.com/huang-julien))
- Anthony Aslangul <anthony.aslangul@gmail.com>
- Enkot ([@enkot](https://github.com/enkot))

## v0.11.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.10.4...v0.11.0)

### 🩹 Fixes

- Resolve schema dir from rootDir ([ca8e57e](https://github.com/enkot/nuxt-open-fetch/commit/ca8e57e))

### 📖 Documentation

- Update `README.md` ([61f7567](https://github.com/enkot/nuxt-open-fetch/commit/61f7567))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Julien Huang ([@huang-julien](https://github.com/huang-julien))

## v0.10.4

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.10.3...v0.10.4)

### 🩹 Fixes

- Properly allow Nuxt `v4` ([87638eb](https://github.com/enkot/nuxt-open-fetch/commit/87638eb))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.10.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.10.2...v0.10.3)

### 🏡 Chore

- Allow Nuxt `v4` ([45eab69](https://github.com/enkot/nuxt-open-fetch/commit/45eab69))
- Update `packageManager` to pnpm `10.11.1` ([6d29bdf](https://github.com/enkot/nuxt-open-fetch/commit/6d29bdf))
- Update all project dependencies ([29cc849](https://github.com/enkot/nuxt-open-fetch/commit/29cc849))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.10.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.10.1...v0.10.2)

### 🩹 Fixes

- Key generation not taking path parameters into account ([c978ee9](https://github.com/enkot/nuxt-open-fetch/commit/c978ee9))

### ❤️ Contributors

- Anthony Aslangul <anthony.aslangul@gmail.com>

## v0.10.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.10.0...v0.10.1)

### 🚀 Enhancements

- Added type helper for request path ([#84](https://github.com/enkot/nuxt-open-fetch/pull/84))

### 🩹 Fixes

- Add header parameters to headers ([#80](https://github.com/enkot/nuxt-open-fetch/pull/80))
- Type helpers bug fixes ([#89](https://github.com/enkot/nuxt-open-fetch/pull/89))
- Proper module builder configuration ([1c94bbb](https://github.com/enkot/nuxt-open-fetch/commit/1c94bbb))

### 🏡 Chore

- Update dependencies ([2e46ef3](https://github.com/enkot/nuxt-open-fetch/commit/2e46ef3))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.10.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.7...v0.10.0)

### 🩹 Fixes

- Manually generate keys to prevent double fetching ([12dcc2d](https://github.com/enkot/nuxt-open-fetch/commit/12dcc2d))

### 🏡 Chore

- Rebrand to `nuxt-open-fetch` in more places ([949633e](https://github.com/enkot/nuxt-open-fetch/commit/949633e))
- Update to nuxt `3.16.1` ([40d2397](https://github.com/enkot/nuxt-open-fetch/commit/40d2397))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.9.7

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.6...v0.9.7)

## v0.9.6


### 🚀 Enhancements

- Docs ([a30b0e2](https://github.com/enkot/nuxt-open-fetch/commit/a30b0e2))
- Github workflow ([e2116d3](https://github.com/enkot/nuxt-open-fetch/commit/e2116d3))
- **docs:** Preview image ([d8eadf9](https://github.com/enkot/nuxt-open-fetch/commit/d8eadf9))
- Options support for factories ([84521db](https://github.com/enkot/nuxt-open-fetch/commit/84521db))
- **docs:** Improved docs ([d17883f](https://github.com/enkot/nuxt-open-fetch/commit/d17883f))
- **docs:** Adds "Proxy" docs ([bcc06aa](https://github.com/enkot/nuxt-open-fetch/commit/bcc06aa))
- **docs:** Extend "Proxy" docs ([e1a0876](https://github.com/enkot/nuxt-open-fetch/commit/e1a0876))
- **docs:** Addes nuxthq/studio ([7459ba1](https://github.com/enkot/nuxt-open-fetch/commit/7459ba1))
- Refactored types ([857162f](https://github.com/enkot/nuxt-open-fetch/commit/857162f))
- Added warning message ([5ce9564](https://github.com/enkot/nuxt-open-fetch/commit/5ce9564))
- **docs:** New preview image ([2489803](https://github.com/enkot/nuxt-open-fetch/commit/2489803))
- Refactor ([394c409](https://github.com/enkot/nuxt-open-fetch/commit/394c409))
- Expose `openFetchRequestInterceptor` ([c98e5c2](https://github.com/enkot/nuxt-open-fetch/commit/c98e5c2))
- Nitro support ([d30287f](https://github.com/enkot/nuxt-open-fetch/commit/d30287f))
- Eslint flat config ([21dcc36](https://github.com/enkot/nuxt-open-fetch/commit/21dcc36))
- Og image ([2b1e634](https://github.com/enkot/nuxt-open-fetch/commit/2b1e634))
- Migrate to openapi-typescript v7 ([d2bb51a](https://github.com/enkot/nuxt-open-fetch/commit/d2bb51a))
- Tests ([c642386](https://github.com/enkot/nuxt-open-fetch/commit/c642386))
- **docs:** $[client] usage example inside Nitro handler ([546f656](https://github.com/enkot/nuxt-open-fetch/commit/546f656))
- **github:** Added bug and feature requests ([6c7182a](https://github.com/enkot/nuxt-open-fetch/commit/6c7182a))
- Expose request and response types ([bd8bd43](https://github.com/enkot/nuxt-open-fetch/commit/bd8bd43))
- Rebrand to `nuxt-open-fetch` ([ef14397](https://github.com/enkot/nuxt-open-fetch/commit/ef14397))

### 🩹 Fixes

- Github workflow ([6d5bd86](https://github.com/enkot/nuxt-open-fetch/commit/6d5bd86))
- Workflow ([c6640c6](https://github.com/enkot/nuxt-open-fetch/commit/c6640c6))
- Workflow ([caf5314](https://github.com/enkot/nuxt-open-fetch/commit/caf5314))
- Workflow ([b922562](https://github.com/enkot/nuxt-open-fetch/commit/b922562))
- Workflow ([215632d](https://github.com/enkot/nuxt-open-fetch/commit/215632d))
- BaseURL ([e5520a8](https://github.com/enkot/nuxt-open-fetch/commit/e5520a8))
- Use github-preset ([7367c5c](https://github.com/enkot/nuxt-open-fetch/commit/7367c5c))
- Github link ([7eb61cd](https://github.com/enkot/nuxt-open-fetch/commit/7eb61cd))
- Badges ([38dc9bd](https://github.com/enkot/nuxt-open-fetch/commit/38dc9bd))
- Fixes badges ([7dc924f](https://github.com/enkot/nuxt-open-fetch/commit/7dc924f))
- Docs link ([2707272](https://github.com/enkot/nuxt-open-fetch/commit/2707272))
- **docs:** Installation ([9da32b5](https://github.com/enkot/nuxt-open-fetch/commit/9da32b5))
- **docs:** Cover image ([0f23264](https://github.com/enkot/nuxt-open-fetch/commit/0f23264))
- Impoves types generation ([ae3baa4](https://github.com/enkot/nuxt-open-fetch/commit/ae3baa4))
- Utils ([19601b1](https://github.com/enkot/nuxt-open-fetch/commit/19601b1))
- Imports ([3cb4ccd](https://github.com/enkot/nuxt-open-fetch/commit/3cb4ccd))
- **playground:** Removes "base" layer ([e11ab16](https://github.com/enkot/nuxt-open-fetch/commit/e11ab16))
- **docs:** Upscale image ([3b069ee](https://github.com/enkot/nuxt-open-fetch/commit/3b069ee))
- **docs:** Simplified docs ([b357822](https://github.com/enkot/nuxt-open-fetch/commit/b357822))
- Types ([ff71f85](https://github.com/enkot/nuxt-open-fetch/commit/ff71f85))
- Remove baseURL ([281d13e](https://github.com/enkot/nuxt-open-fetch/commit/281d13e))
- Change preset ([1049112](https://github.com/enkot/nuxt-open-fetch/commit/1049112))
- Remove github workflow ([dd4f19b](https://github.com/enkot/nuxt-open-fetch/commit/dd4f19b))
- **docs:** Fixed factories docs ([7165ba9](https://github.com/enkot/nuxt-open-fetch/commit/7165ba9))
- **docs:** Fixes links ([b0d58f3](https://github.com/enkot/nuxt-open-fetch/commit/b0d58f3))
- Refactored module to use ".ts" template files ([812de33](https://github.com/enkot/nuxt-open-fetch/commit/812de33))
- **docs:** Convert preview image to "webp" ([70cd619](https://github.com/enkot/nuxt-open-fetch/commit/70cd619))
- **docs:** Tautology ([0b99300](https://github.com/enkot/nuxt-open-fetch/commit/0b99300))
- **docs:** Fix module names ([45b808e](https://github.com/enkot/nuxt-open-fetch/commit/45b808e))
- **docs:** Improved Schemas docs ([4a336a2](https://github.com/enkot/nuxt-open-fetch/commit/4a336a2))
- Added note ([912042e](https://github.com/enkot/nuxt-open-fetch/commit/912042e))
- Use FetchError for error return type ([2de12d0](https://github.com/enkot/nuxt-open-fetch/commit/2de12d0))
- **docs:** Replace npm with pnpm ([15633c3](https://github.com/enkot/nuxt-open-fetch/commit/15633c3))
- **docs:** Fix quickstart ([362d724](https://github.com/enkot/nuxt-open-fetch/commit/362d724))
- **docs:** Smaller preview image ([950a607](https://github.com/enkot/nuxt-open-fetch/commit/950a607))
- **docs:** Edited warning ([6062d4f](https://github.com/enkot/nuxt-open-fetch/commit/6062d4f))
- Custom $fetch client hooks ([d158565](https://github.com/enkot/nuxt-open-fetch/commit/d158565))
- **docs:** Improved title colors ([5ed0c27](https://github.com/enkot/nuxt-open-fetch/commit/5ed0c27))
- **docs:** Configuration ([55a6191](https://github.com/enkot/nuxt-open-fetch/commit/55a6191))
- Add explicit imports to prevent bundling issues ([ace0d01](https://github.com/enkot/nuxt-open-fetch/commit/ace0d01))
- Enforce plugin to run first ([0e47d64](https://github.com/enkot/nuxt-open-fetch/commit/0e47d64))
- Remove pinia ([f393989](https://github.com/enkot/nuxt-open-fetch/commit/f393989))
- Improved types; new docs ([897f70f](https://github.com/enkot/nuxt-open-fetch/commit/897f70f))
- Cleanup ([4b40b79](https://github.com/enkot/nuxt-open-fetch/commit/4b40b79))
- Fixed OpenFetchClientName ([68d24ee](https://github.com/enkot/nuxt-open-fetch/commit/68d24ee))
- Docs ([fbb1e8a](https://github.com/enkot/nuxt-open-fetch/commit/fbb1e8a))
- Docs local module ([62708c1](https://github.com/enkot/nuxt-open-fetch/commit/62708c1))
- Renovate ([bc71ebe](https://github.com/enkot/nuxt-open-fetch/commit/bc71ebe))
- Docs ([27c38e7](https://github.com/enkot/nuxt-open-fetch/commit/27c38e7))
- Cover image ([6ac4972](https://github.com/enkot/nuxt-open-fetch/commit/6ac4972))
- **docs:** Update description ([08fc861](https://github.com/enkot/nuxt-open-fetch/commit/08fc861))
- **docs:** Gradient ([35f71e3](https://github.com/enkot/nuxt-open-fetch/commit/35f71e3))
- Option type is "undefined" when params not exixts. ([7cdf7f1](https://github.com/enkot/nuxt-open-fetch/commit/7cdf7f1))
- Use utils in place ([a120749](https://github.com/enkot/nuxt-open-fetch/commit/a120749))
- Docs ([ab039f4](https://github.com/enkot/nuxt-open-fetch/commit/ab039f4))
- Transpile nitro plugin ([e7c2423](https://github.com/enkot/nuxt-open-fetch/commit/e7c2423))
- Relative imports ([49959d5](https://github.com/enkot/nuxt-open-fetch/commit/49959d5))
- Docs ([9c5443c](https://github.com/enkot/nuxt-open-fetch/commit/9c5443c))
- **docs:** Update pnpm-lock ([9c2cd7f](https://github.com/enkot/nuxt-open-fetch/commit/9c2cd7f))
- Improved ParamsOption types ([7dcce5e](https://github.com/enkot/nuxt-open-fetch/commit/7dcce5e))
- Cleanup ([e89e09f](https://github.com/enkot/nuxt-open-fetch/commit/e89e09f))
- Use build aliases and set declaration as ts file ([31595da](https://github.com/enkot/nuxt-open-fetch/commit/31595da))
- Cleanup ([7ef9e0b](https://github.com/enkot/nuxt-open-fetch/commit/7ef9e0b))
- **docs:** Lock module ([ff956d0](https://github.com/enkot/nuxt-open-fetch/commit/ff956d0))
- Docs og image; twoslash for utils ([1025b15](https://github.com/enkot/nuxt-open-fetch/commit/1025b15))
- Docs links ([9c4e12d](https://github.com/enkot/nuxt-open-fetch/commit/9c4e12d))
- Add optional operator on createOpenFetch opts ([fba38b5](https://github.com/enkot/nuxt-open-fetch/commit/fba38b5))
- Lint issues ([c023621](https://github.com/enkot/nuxt-open-fetch/commit/c023621))
- Use TS file for openAPI TS files ([4df36bb](https://github.com/enkot/nuxt-open-fetch/commit/4df36bb))
- Use alias for schemas ([b9cc181](https://github.com/enkot/nuxt-open-fetch/commit/b9cc181))
- Cleanup ([6ced4bc](https://github.com/enkot/nuxt-open-fetch/commit/6ced4bc))
- Mark "pathe" as external dep ([96a5122](https://github.com/enkot/nuxt-open-fetch/commit/96a5122))
- Cleanup ([309a017](https://github.com/enkot/nuxt-open-fetch/commit/309a017))
- Fetch on SSR ([d739e83](https://github.com/enkot/nuxt-open-fetch/commit/d739e83))
- **types:** Type template and filename ([0095160](https://github.com/enkot/nuxt-open-fetch/commit/0095160))
- Tsconfig paths ([cd0fe57](https://github.com/enkot/nuxt-open-fetch/commit/cd0fe57))
- Use path ([642b7a5](https://github.com/enkot/nuxt-open-fetch/commit/642b7a5))
- Use path ([0e9784d](https://github.com/enkot/nuxt-open-fetch/commit/0e9784d))
- **docs:** Custom Nitro client example ([0d73421](https://github.com/enkot/nuxt-open-fetch/commit/0d73421))
- **docs:** Improved custom client docs ([b9a48d3](https://github.com/enkot/nuxt-open-fetch/commit/b9a48d3))
- Types and docs ([3b0071d](https://github.com/enkot/nuxt-open-fetch/commit/3b0071d))
- Eslint ([59c44fe](https://github.com/enkot/nuxt-open-fetch/commit/59c44fe))
- Module import in docs ([b6364dd](https://github.com/enkot/nuxt-open-fetch/commit/b6364dd))
- Pnpm-lock ([3e3a07b](https://github.com/enkot/nuxt-open-fetch/commit/3e3a07b))
- Ref type for query params ([a0c7d71](https://github.com/enkot/nuxt-open-fetch/commit/a0c7d71))
- Prevent duplicated requests ([#83](https://github.com/enkot/nuxt-open-fetch/pull/83))

### 💅 Refactors

- Simplified filenames management ([1bfe3b1](https://github.com/enkot/nuxt-open-fetch/commit/1bfe3b1))
- Rename to open-fetch-schemas ([6f68599](https://github.com/enkot/nuxt-open-fetch/commit/6f68599))
- Simplified merging layers logic ([41a5631](https://github.com/enkot/nuxt-open-fetch/commit/41a5631))
- Remove redundant "defu" merge ([3e9e8c9](https://github.com/enkot/nuxt-open-fetch/commit/3e9e8c9))

### 📖 Documentation

- Add optional operator ([9c60191](https://github.com/enkot/nuxt-open-fetch/commit/9c60191))
- Fix example ([3d5e114](https://github.com/enkot/nuxt-open-fetch/commit/3d5e114))
- Fixed and simplified custom client example ([797c374](https://github.com/enkot/nuxt-open-fetch/commit/797c374))
- Added "Type helpers" section ([5e0f815](https://github.com/enkot/nuxt-open-fetch/commit/5e0f815))
- Impoved configuration docs ([4d8d7de](https://github.com/enkot/nuxt-open-fetch/commit/4d8d7de))
- Fixes configuration docs ([66524df](https://github.com/enkot/nuxt-open-fetch/commit/66524df))
- Improved configuration docs ([67355e2](https://github.com/enkot/nuxt-open-fetch/commit/67355e2))

### 🏡 Chore

- **release:** V0.0.2 ([5ef1c26](https://github.com/enkot/nuxt-open-fetch/commit/5ef1c26))
- **deployment:** Add workflow file ([e0914f7](https://github.com/enkot/nuxt-open-fetch/commit/e0914f7))
- **deployment:** Add CNAME ([cdfad79](https://github.com/enkot/nuxt-open-fetch/commit/cdfad79))
- **deployment:** Remove workflow file ([9e5ee52](https://github.com/enkot/nuxt-open-fetch/commit/9e5ee52))
- **release:** V0.0.3 ([77ba44f](https://github.com/enkot/nuxt-open-fetch/commit/77ba44f))
- **release:** V0.0.4 ([f9d4906](https://github.com/enkot/nuxt-open-fetch/commit/f9d4906))
- **release:** V0.0.5 ([02bc31a](https://github.com/enkot/nuxt-open-fetch/commit/02bc31a))
- **release:** V0.0.6 ([1fdd8e9](https://github.com/enkot/nuxt-open-fetch/commit/1fdd8e9))
- **release:** V0.0.7 ([d675692](https://github.com/enkot/nuxt-open-fetch/commit/d675692))
- **release:** V0.0.8 ([e9c0c5d](https://github.com/enkot/nuxt-open-fetch/commit/e9c0c5d))
- **release:** V0.0.9 ([0bcb1bc](https://github.com/enkot/nuxt-open-fetch/commit/0bcb1bc))
- **release:** V0.1.0 ([d1a3771](https://github.com/enkot/nuxt-open-fetch/commit/d1a3771))
- **release:** V0.1.1 ([1100994](https://github.com/enkot/nuxt-open-fetch/commit/1100994))
- **deployment:** Add workflow file ([a6e875d](https://github.com/enkot/nuxt-open-fetch/commit/a6e875d))
- **deployment:** Remove workflow file ([6a2ea8b](https://github.com/enkot/nuxt-open-fetch/commit/6a2ea8b))
- **release:** V0.1.2 ([abdfdf4](https://github.com/enkot/nuxt-open-fetch/commit/abdfdf4))
- **release:** V0.2.0 ([cb34246](https://github.com/enkot/nuxt-open-fetch/commit/cb34246))
- **release:** V0.2.1 ([0a87b84](https://github.com/enkot/nuxt-open-fetch/commit/0a87b84))
- **release:** V0.2.2 ([2c74fd2](https://github.com/enkot/nuxt-open-fetch/commit/2c74fd2))
- **release:** V0.2.3 ([c5c4987](https://github.com/enkot/nuxt-open-fetch/commit/c5c4987))
- **release:** V0.3.0 ([99185ed](https://github.com/enkot/nuxt-open-fetch/commit/99185ed))
- **release:** V0.4.0 ([73ae3a9](https://github.com/enkot/nuxt-open-fetch/commit/73ae3a9))
- **release:** V0.4.1 ([ee074eb](https://github.com/enkot/nuxt-open-fetch/commit/ee074eb))
- **release:** V0.4.2 ([f015de2](https://github.com/enkot/nuxt-open-fetch/commit/f015de2))
- **release:** V0.4.3 ([c53c6f0](https://github.com/enkot/nuxt-open-fetch/commit/c53c6f0))
- **release:** V0.4.4 ([9a91565](https://github.com/enkot/nuxt-open-fetch/commit/9a91565))
- **release:** V0.4.5 ([2ab632d](https://github.com/enkot/nuxt-open-fetch/commit/2ab632d))
- **release:** V0.4.6 ([73ab70a](https://github.com/enkot/nuxt-open-fetch/commit/73ab70a))
- **release:** V0.5.0 ([d87c62f](https://github.com/enkot/nuxt-open-fetch/commit/d87c62f))
- Changelog ([e0ccc7b](https://github.com/enkot/nuxt-open-fetch/commit/e0ccc7b))
- **release:** V0.6.0 ([4e12642](https://github.com/enkot/nuxt-open-fetch/commit/4e12642))
- **release:** V0.7.0 ([9740bac](https://github.com/enkot/nuxt-open-fetch/commit/9740bac))
- **release:** V0.8.0 ([52f917e](https://github.com/enkot/nuxt-open-fetch/commit/52f917e))
- **release:** V0.8.0" ([81bc3b8](https://github.com/enkot/nuxt-open-fetch/commit/81bc3b8))
- **release:** V0.7.0" ([b7c6da0](https://github.com/enkot/nuxt-open-fetch/commit/b7c6da0))
- **release:** V0.6.0" ([106bf68](https://github.com/enkot/nuxt-open-fetch/commit/106bf68))
- **release:** V0.5.1 ([fa1bab7](https://github.com/enkot/nuxt-open-fetch/commit/fa1bab7))
- **release:** V0.5.2 ([e4232f0](https://github.com/enkot/nuxt-open-fetch/commit/e4232f0))
- **release:** V0.6.0 ([182d684](https://github.com/enkot/nuxt-open-fetch/commit/182d684))
- **release:** V0.6.1 ([df36b98](https://github.com/enkot/nuxt-open-fetch/commit/df36b98))
- **release:** V0.6.2 ([d7b85d8](https://github.com/enkot/nuxt-open-fetch/commit/d7b85d8))
- **release:** V0.6.3 ([123253b](https://github.com/enkot/nuxt-open-fetch/commit/123253b))
- **release:** V0.6.4 ([268f7e0](https://github.com/enkot/nuxt-open-fetch/commit/268f7e0))
- Update deps ([cd6824d](https://github.com/enkot/nuxt-open-fetch/commit/cd6824d))
- **release:** V0.6.5 ([e907713](https://github.com/enkot/nuxt-open-fetch/commit/e907713))
- **release:** V0.7.0 ([b3ce33c](https://github.com/enkot/nuxt-open-fetch/commit/b3ce33c))
- **release:** V0.8.0 ([253ab16](https://github.com/enkot/nuxt-open-fetch/commit/253ab16))
- Cleanup ([f984e89](https://github.com/enkot/nuxt-open-fetch/commit/f984e89))
- **release:** V0.9.0 ([4a37fe3](https://github.com/enkot/nuxt-open-fetch/commit/4a37fe3))
- **release:** V0.9.1 ([3189a17](https://github.com/enkot/nuxt-open-fetch/commit/3189a17))
- **release:** V0.9.2 ([44ed19c](https://github.com/enkot/nuxt-open-fetch/commit/44ed19c))
- **release:** V0.9.3 ([5594877](https://github.com/enkot/nuxt-open-fetch/commit/5594877))
- Eslint ([16f3edd](https://github.com/enkot/nuxt-open-fetch/commit/16f3edd))
- **release:** V0.9.4 ([12611ba](https://github.com/enkot/nuxt-open-fetch/commit/12611ba))
- Eslint ([eec7b79](https://github.com/enkot/nuxt-open-fetch/commit/eec7b79))
- **release:** V0.9.5 ([8d13653](https://github.com/enkot/nuxt-open-fetch/commit/8d13653))
- Update to Nuxt 3.15 ([f148144](https://github.com/enkot/nuxt-open-fetch/commit/f148144))
- Run `eslint` ([6c1aa5e](https://github.com/enkot/nuxt-open-fetch/commit/6c1aa5e))

### ❤️ Contributors

- Norbiros ([@Norbiros](http://github.com/Norbiros))
- Enkot ([@enkot](http://github.com/enkot))
- Adam DeHaven <adam@dehaven.org>
- Julien Huang <julien.huang@outlook.fr>
- Yifan Xiao ([@hempflower](http://github.com/hempflower))
- Mathieu ([@guibulator](http://github.com/guibulator))
- Ilya Semenov ([@IlyaSemenov](http://github.com/IlyaSemenov))

## v0.9.5

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.4...v0.9.5)

### 💅 Refactors

- Remove redundant "defu" merge ([3e9e8c9](https://github.com/enkot/nuxt-open-fetch/commit/3e9e8c9))

### 📖 Documentation

- Impoved configuration docs ([4d8d7de](https://github.com/enkot/nuxt-open-fetch/commit/4d8d7de))
- Fixes configuration docs ([66524df](https://github.com/enkot/nuxt-open-fetch/commit/66524df))

### 🏡 Chore

- Eslint ([eec7b79](https://github.com/enkot/nuxt-open-fetch/commit/eec7b79))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.9.4

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.3...v0.9.4)

### 🩹 Fixes

- Module import in docs ([b6364dd](https://github.com/enkot/nuxt-open-fetch/commit/b6364dd))
- Pnpm-lock ([3e3a07b](https://github.com/enkot/nuxt-open-fetch/commit/3e3a07b))
- Ref type for query params ([a0c7d71](https://github.com/enkot/nuxt-open-fetch/commit/a0c7d71))

### 📖 Documentation

- Added "Type helpers" section ([5e0f815](https://github.com/enkot/nuxt-open-fetch/commit/5e0f815))

### 🏡 Chore

- Eslint ([16f3edd](https://github.com/enkot/nuxt-open-fetch/commit/16f3edd))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.9.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.2...v0.9.3)

### 🩹 Fixes

- Types and docs ([3b0071d](https://github.com/enkot/nuxt-open-fetch/commit/3b0071d))
- Eslint ([59c44fe](https://github.com/enkot/nuxt-open-fetch/commit/59c44fe))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.9.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.1...v0.9.2)

### 🚀 Enhancements

- **docs:** $[client] usage example inside Nitro handler ([546f656](https://github.com/enkot/nuxt-open-fetch/commit/546f656))
- **github:** Added bug and feature requests ([6c7182a](https://github.com/enkot/nuxt-open-fetch/commit/6c7182a))
- Expose request and response types ([bd8bd43](https://github.com/enkot/nuxt-open-fetch/commit/bd8bd43))

### 🩹 Fixes

- **docs:** Custom Nitro client example ([0d73421](https://github.com/enkot/nuxt-open-fetch/commit/0d73421))
- **docs:** Improved custom client docs ([b9a48d3](https://github.com/enkot/nuxt-open-fetch/commit/b9a48d3))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.9.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.9.0...v0.9.1)

### 🩹 Fixes

- **types:** Type template and filename ([0095160](https://github.com/enkot/nuxt-open-fetch/commit/0095160))
- Tsconfig paths ([cd0fe57](https://github.com/enkot/nuxt-open-fetch/commit/cd0fe57))
- Use path ([642b7a5](https://github.com/enkot/nuxt-open-fetch/commit/642b7a5))
- Use path ([0e9784d](https://github.com/enkot/nuxt-open-fetch/commit/0e9784d))

### 📖 Documentation

- Fixed and simplified custom client example ([797c374](https://github.com/enkot/nuxt-open-fetch/commit/797c374))

### ❤️ Contributors

- Adam DeHaven <adam@dehaven.org>
- Enkot ([@enkot](http://github.com/enkot))

## v0.9.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.8.0...v0.9.0)

### 🩹 Fixes

- Cleanup ([309a017](https://github.com/enkot/nuxt-open-fetch/commit/309a017))
- Fetch on SSR ([d739e83](https://github.com/enkot/nuxt-open-fetch/commit/d739e83))

### 📖 Documentation

- Fix example ([3d5e114](https://github.com/enkot/nuxt-open-fetch/commit/3d5e114))

### 🏡 Chore

- Cleanup ([f984e89](https://github.com/enkot/nuxt-open-fetch/commit/f984e89))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.8.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.7.0...v0.8.0)

### 🚀 Enhancements

- Tests ([c642386](https://github.com/enkot/nuxt-open-fetch/commit/c642386))

### 🩹 Fixes

- Use TS file for openAPI TS files ([4df36bb](https://github.com/enkot/nuxt-open-fetch/commit/4df36bb))
- Use alias for schemas ([b9cc181](https://github.com/enkot/nuxt-open-fetch/commit/b9cc181))
- Cleanup ([6ced4bc](https://github.com/enkot/nuxt-open-fetch/commit/6ced4bc))
- Mark "pathe" as external dep ([96a5122](https://github.com/enkot/nuxt-open-fetch/commit/96a5122))

### 💅 Refactors

- Rename to open-fetch-schemas ([6f68599](https://github.com/enkot/nuxt-open-fetch/commit/6f68599))
- Simplified merging layers logic ([41a5631](https://github.com/enkot/nuxt-open-fetch/commit/41a5631))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Julien Huang <julien.huang@outlook.fr>

## v0.7.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.5...v0.7.0)

### 🚀 Enhancements

- Migrate to openapi-typescript v7 ([d2bb51a](https://github.com/enkot/nuxt-open-fetch/commit/d2bb51a))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.6.5

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.4...v0.6.5)

### 🚀 Enhancements

- Og image ([2b1e634](https://github.com/enkot/nuxt-open-fetch/commit/2b1e634))

### 🩹 Fixes

- **docs:** Lock module ([ff956d0](https://github.com/enkot/nuxt-open-fetch/commit/ff956d0))
- Docs og image; twoslash for utils ([1025b15](https://github.com/enkot/nuxt-open-fetch/commit/1025b15))
- Docs links ([9c4e12d](https://github.com/enkot/nuxt-open-fetch/commit/9c4e12d))
- Add optional operator on createOpenFetch opts ([fba38b5](https://github.com/enkot/nuxt-open-fetch/commit/fba38b5))
- Lint issues ([c023621](https://github.com/enkot/nuxt-open-fetch/commit/c023621))

### 📖 Documentation

- Add optional operator ([9c60191](https://github.com/enkot/nuxt-open-fetch/commit/9c60191))

### 🏡 Chore

- Update deps ([cd6824d](https://github.com/enkot/nuxt-open-fetch/commit/cd6824d))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Julien Huang <julien.huang@outlook.fr>

## v0.6.4

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.3...v0.6.4)

### 🩹 Fixes

- Use build aliases and set declaration as ts file ([31595da](https://github.com/enkot/nuxt-open-fetch/commit/31595da))
- Cleanup ([7ef9e0b](https://github.com/enkot/nuxt-open-fetch/commit/7ef9e0b))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Julien Huang <julien.huang@leetchi.com>

## v0.6.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.2...v0.6.3)

### 🚀 Enhancements

- Eslint flat config ([21dcc36](https://github.com/enkot/nuxt-open-fetch/commit/21dcc36))

### 🩹 Fixes

- Docs ([9c5443c](https://github.com/enkot/nuxt-open-fetch/commit/9c5443c))
- **docs:** Update pnpm-lock ([9c2cd7f](https://github.com/enkot/nuxt-open-fetch/commit/9c2cd7f))
- Improved ParamsOption types ([7dcce5e](https://github.com/enkot/nuxt-open-fetch/commit/7dcce5e))
- Cleanup ([e89e09f](https://github.com/enkot/nuxt-open-fetch/commit/e89e09f))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.6.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.1...v0.6.2)

### 🩹 Fixes

- Relative imports ([49959d5](https://github.com/enkot/nuxt-open-fetch/commit/49959d5))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.6.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.6.0...v0.6.1)

### 🩹 Fixes

- Docs ([ab039f4](https://github.com/enkot/nuxt-open-fetch/commit/ab039f4))
- Transpile nitro plugin ([e7c2423](https://github.com/enkot/nuxt-open-fetch/commit/e7c2423))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.6.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.5.2...v0.6.0)

### 🚀 Enhancements

🚨 This is likely to need code changes in your project 🚨

- Removed the postfix `Fetch', which makes it difficult to read the composable name ([182d684](https://github.com/enkot/nuxt-open-fetch/commit/182d684))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.5.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.5.1...v0.5.2)

### 🩹 Fixes

- Option type is "undefined" when params not exixts. ([7cdf7f1](https://github.com/enkot/nuxt-open-fetch/commit/7cdf7f1))
- Use utils in place ([a120749](https://github.com/enkot/nuxt-open-fetch/commit/a120749))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Yifan Xiao ([@hempflower](http://github.com/hempflower))

## v0.5.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.5.0...v0.5.1)

### 🏡 Chore

- Changelog ([e0ccc7b](https://github.com/enkot/nuxt-open-fetch/commit/e0ccc7b))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.5.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.5...v0.5.0)

### 🚀 Enhancements

- Nitro support ([d30287f](https://github.com/enkot/nuxt-open-fetch/commit/d30287f))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Stephan Koglin-Fischer ([@skf-funzt](http://github.com/skf-funzt))

## v0.4.5

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.4...v0.4.5)

### 🩹 Fixes

- Docs ([fbb1e8a](https://github.com/enkot/nuxt-open-fetch/commit/fbb1e8a))
- Docs local module ([62708c1](https://github.com/enkot/nuxt-open-fetch/commit/62708c1))
- Renovate ([bc71ebe](https://github.com/enkot/nuxt-open-fetch/commit/bc71ebe))
- Docs ([27c38e7](https://github.com/enkot/nuxt-open-fetch/commit/27c38e7))
- Cover image ([6ac4972](https://github.com/enkot/nuxt-open-fetch/commit/6ac4972))
- **docs:** Update description ([08fc861](https://github.com/enkot/nuxt-open-fetch/commit/08fc861))
- **docs:** Gradient ([35f71e3](https://github.com/enkot/nuxt-open-fetch/commit/35f71e3))

### 💅 Refactors

- Simplified filenames management ([1bfe3b1](https://github.com/enkot/nuxt-open-fetch/commit/1bfe3b1))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.4.4

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.3...v0.4.4)

### 🩹 Fixes

- Fixed OpenFetchClientName ([68d24ee](https://github.com/enkot/nuxt-open-fetch/commit/68d24ee))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.4.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.2...v0.4.3)

### 🩹 Fixes

- Improved types; new docs ([897f70f](https://github.com/enkot/nuxt-open-fetch/commit/897f70f))
- Cleanup ([4b40b79](https://github.com/enkot/nuxt-open-fetch/commit/4b40b79))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.4.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.1...v0.4.2)

### 🩹 Fixes

- Enforce plugin to run first ([0e47d64](https://github.com/enkot/nuxt-open-fetch/commit/0e47d64))
- Remove pinia ([f393989](https://github.com/enkot/nuxt-open-fetch/commit/f393989))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.4.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.4.0...v0.4.1)

### 🚀 Enhancements

- Expose `openFetchRequestInterceptor` ([c98e5c2](https://github.com/enkot/nuxt-open-fetch/commit/c98e5c2))

### 🩹 Fixes

- **docs:** Configuration ([55a6191](https://github.com/enkot/nuxt-open-fetch/commit/55a6191))
- Add explicit imports to prevent bundling issues ([ace0d01](https://github.com/enkot/nuxt-open-fetch/commit/ace0d01))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Mathieu ([@guibulator](http://github.com/guibulator))

## v0.4.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Refactor ([394c409](https://github.com/enkot/nuxt-open-fetch/commit/394c409))

### 🏡 Chore

- **release:** V0.2.3 ([c5c4987](https://github.com/enkot/nuxt-open-fetch/commit/c5c4987))
- **release:** V0.3.0 ([99185ed](https://github.com/enkot/nuxt-open-fetch/commit/99185ed))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.3.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.2.3...v0.3.0)

## v0.2.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.2.2...v0.2.3)

## v0.2.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.2.1...v0.2.2)

### 🚀 Enhancements

- Added warning message ([5ce9564](https://github.com/enkot/nuxt-open-fetch/commit/5ce9564))
- **docs:** New preview image ([2489803](https://github.com/enkot/nuxt-open-fetch/commit/2489803))

### 🩹 Fixes

- **docs:** Replace npm with pnpm ([15633c3](https://github.com/enkot/nuxt-open-fetch/commit/15633c3))
- **docs:** Fix quickstart ([362d724](https://github.com/enkot/nuxt-open-fetch/commit/362d724))
- **docs:** Smaller preview image ([950a607](https://github.com/enkot/nuxt-open-fetch/commit/950a607))
- **docs:** Edited warning ([6062d4f](https://github.com/enkot/nuxt-open-fetch/commit/6062d4f))
- Custom $fetch client hooks ([d158565](https://github.com/enkot/nuxt-open-fetch/commit/d158565))

### 🏡 Chore

- **release:** V0.2.1 ([0a87b84](https://github.com/enkot/nuxt-open-fetch/commit/0a87b84))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Ilya Semenov ([@IlyaSemenov](http://github.com/IlyaSemenov))

## v0.2.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.2.0...v0.2.1)

### 🩹 Fixes

- Use FetchError for error return type ([2de12d0](https://github.com/enkot/nuxt-open-fetch/commit/2de12d0))

### 🏡 Chore

- **release:** V0.2.0 ([cb34246](https://github.com/enkot/nuxt-open-fetch/commit/cb34246))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))
- Ilya Semenov ([@IlyaSemenov](http://github.com/IlyaSemenov))

## v0.2.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.1.2...v0.2.0)

## v0.1.2

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- **docs:** Addes nuxthq/studio ([7459ba1](https://github.com/enkot/nuxt-open-fetch/commit/7459ba1))

### 🩹 Fixes

- **docs:** Convert preview image to "webp" ([70cd619](https://github.com/enkot/nuxt-open-fetch/commit/70cd619))
- **docs:** Tautology ([0b99300](https://github.com/enkot/nuxt-open-fetch/commit/0b99300))
- **docs:** Fix module names ([45b808e](https://github.com/enkot/nuxt-open-fetch/commit/45b808e))
- **docs:** Improved Schemas docs ([4a336a2](https://github.com/enkot/nuxt-open-fetch/commit/4a336a2))
- Added note ([912042e](https://github.com/enkot/nuxt-open-fetch/commit/912042e))

### 🏡 Chore

- **deployment:** Add workflow file ([a6e875d](https://github.com/enkot/nuxt-open-fetch/commit/a6e875d))
- **deployment:** Remove workflow file ([6a2ea8b](https://github.com/enkot/nuxt-open-fetch/commit/6a2ea8b))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.1.1

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.1.0...v0.1.1)

### 🚀 Enhancements

- **docs:** Extend "Proxy" docs ([e1a0876](https://github.com/enkot/nuxt-open-fetch/commit/e1a0876))

### 🩹 Fixes

- **docs:** Fixes links ([b0d58f3](https://github.com/enkot/nuxt-open-fetch/commit/b0d58f3))
- Refactored module to use ".ts" template files ([812de33](https://github.com/enkot/nuxt-open-fetch/commit/812de33))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.1.0

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.9...v0.1.0)

### 🚀 Enhancements

- **docs:** Adds "Proxy" docs ([bcc06aa](https://github.com/enkot/nuxt-open-fetch/commit/bcc06aa))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.9

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.8...v0.0.9)

### 🩹 Fixes

- Remove baseURL ([281d13e](https://github.com/enkot/nuxt-open-fetch/commit/281d13e))
- Change preset ([1049112](https://github.com/enkot/nuxt-open-fetch/commit/1049112))
- Remove github workflow ([dd4f19b](https://github.com/enkot/nuxt-open-fetch/commit/dd4f19b))
- **docs:** Fixed factories docs ([7165ba9](https://github.com/enkot/nuxt-open-fetch/commit/7165ba9))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.8

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.7...v0.0.8)

### 🚀 Enhancements

- Options support for factories ([84521db](https://github.com/enkot/nuxt-open-fetch/commit/84521db))
- **docs:** Improved docs ([d17883f](https://github.com/enkot/nuxt-open-fetch/commit/d17883f))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.7

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.6...v0.0.7)

### 🚀 Enhancements

- **docs:** Preview image ([d8eadf9](https://github.com/enkot/nuxt-open-fetch/commit/d8eadf9))

### 🩹 Fixes

- **docs:** Upscale image ([3b069ee](https://github.com/enkot/nuxt-open-fetch/commit/3b069ee))
- **docs:** Simplified docs ([b357822](https://github.com/enkot/nuxt-open-fetch/commit/b357822))
- Types ([ff71f85](https://github.com/enkot/nuxt-open-fetch/commit/ff71f85))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.6

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.5...v0.0.6)

### 🩹 Fixes

- Imports ([3cb4ccd](https://github.com/enkot/nuxt-open-fetch/commit/3cb4ccd))
- **playground:** Removes "base" layer ([e11ab16](https://github.com/enkot/nuxt-open-fetch/commit/e11ab16))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.5

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.4...v0.0.5)

### 🩹 Fixes

- Utils ([19601b1](https://github.com/enkot/nuxt-open-fetch/commit/19601b1))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.4

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.3...v0.0.4)

### 🩹 Fixes

- Badges ([38dc9bd](https://github.com/enkot/nuxt-open-fetch/commit/38dc9bd))
- Fixes badges ([7dc924f](https://github.com/enkot/nuxt-open-fetch/commit/7dc924f))
- Docs link ([2707272](https://github.com/enkot/nuxt-open-fetch/commit/2707272))
- **docs:** Installation ([9da32b5](https://github.com/enkot/nuxt-open-fetch/commit/9da32b5))
- **docs:** Cover image ([0f23264](https://github.com/enkot/nuxt-open-fetch/commit/0f23264))
- Impoves types generation ([ae3baa4](https://github.com/enkot/nuxt-open-fetch/commit/ae3baa4))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.3

[compare changes](https://github.com/enkot/nuxt-open-fetch/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Docs ([a30b0e2](https://github.com/enkot/nuxt-open-fetch/commit/a30b0e2))
- Github workflow ([e2116d3](https://github.com/enkot/nuxt-open-fetch/commit/e2116d3))

### 🩹 Fixes

- Github workflow ([6d5bd86](https://github.com/enkot/nuxt-open-fetch/commit/6d5bd86))
- Workflow ([c6640c6](https://github.com/enkot/nuxt-open-fetch/commit/c6640c6))
- Workflow ([caf5314](https://github.com/enkot/nuxt-open-fetch/commit/caf5314))
- Workflow ([b922562](https://github.com/enkot/nuxt-open-fetch/commit/b922562))
- Workflow ([215632d](https://github.com/enkot/nuxt-open-fetch/commit/215632d))
- BaseURL ([e5520a8](https://github.com/enkot/nuxt-open-fetch/commit/e5520a8))
- Use github-preset ([7367c5c](https://github.com/enkot/nuxt-open-fetch/commit/7367c5c))
- Github link ([7eb61cd](https://github.com/enkot/nuxt-open-fetch/commit/7eb61cd))

### 🏡 Chore

- **deployment:** Add workflow file ([e0914f7](https://github.com/enkot/nuxt-open-fetch/commit/e0914f7))
- **deployment:** Add CNAME ([cdfad79](https://github.com/enkot/nuxt-open-fetch/commit/cdfad79))
- **deployment:** Remove workflow file ([9e5ee52](https://github.com/enkot/nuxt-open-fetch/commit/9e5ee52))

### ❤️ Contributors

- Enkot ([@enkot](http://github.com/enkot))

## v0.0.2

