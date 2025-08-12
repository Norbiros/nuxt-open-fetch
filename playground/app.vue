<script setup lang="ts">
import { useApi } from '#imports'

const { data, execute } = await useApi('/pet/{petId}', {
  immediate: false,
  path: {
    petId: 1,
  },
})

const { data: value } = await useApi('/pet/{petId}', {
  path: {
    petId: 3,
  },
})

const { data: valueV2 } = await useApi('/pet/{petId}', {
  path: {
    petId: 4,
  },
  accept: 'application/vnd.petstore.v2+json',
})

const {
  data: helloValue,
} = useFetch('/api/hello')
</script>

<template>
  <h1>Playground</h1>
  <pre>New: {{ data }}</pre>
  <pre>Immediate: {{ value }}</pre>
  <pre>Immediate (v2): {{ valueV2 }}</pre>
  <pre>Nitro: {{ helloValue }}</pre>
  <button @click="() => execute()">
    execute
  </button>
</template>
