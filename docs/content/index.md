---
seo:
  title: Nuxt Open Fetch
  description: Generate zero-overhead, 100% typed OpenAPI fetch for Nuxt
  navigation: false
---

::u-page-hero
---
orientation: horizontal
---
  ::prose-pre
  ```ts twoslash
  // @noErrors
  const { data } = await usePets('/pet/{petId}', {
  //                                          ^|
    path: {
      petId: 2
    },
    transform: input => ({
      name: input.name,
      status: input.status
    }),
    default: () => ({
      name: 'Tony Stark',
      email: 'tony@stark.com'
    }),
    lazy: true
  })
  ```
  ::

#title
OpenAPI fetch<br/>for Nuxt

#description
Generate zero-overhead, 100% typed OpenAPI fetch clients

#links
  :::u-button
  ---
  size: lg
  to: /setup/quick-start
  trailing-icon: i-heroicons-arrow-right-20-solid
  ---
  Get started
  :::

  :::u-button
  ---
  color: gray
  icon: i-simple-icons-github
  size: lg
  to: https://github.com/Norbiros/nuxt-open-fetch
  target: _blank
  variant: subtle
  ---
  View on GitHub
  :::
::

::u-page-section
#title
All-in-one typed fetch

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-typescript
  ---
  #title
  Full type safety

  #description
  All parameters, request bodies, and responses are type-checked and 100% match your schema.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-openapiinitiative
  ---
  #title
  OpenAPI

  #description
  Supports OpenAPI 3.0 and 3.1 (including advanced features like discriminators).
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-json
  ---
  #title
  YAML or JSON

  #description
  Load schemas from YAML or JSON, locally or remotely.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-deno
  ---
  #title
  Runtime-free

  #description
  Generate runtime-free types that outperform old school codegen.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-speedtest
  ---
  #title
  Fast

  #description
  Generate types for even huge schemas within milliseconds.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-nuxtdotjs
  ---
  #title
  Layers

  #description
  Works with Nuxt Layers.
  :::
::
