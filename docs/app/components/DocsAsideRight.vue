<script setup lang="ts">
import type { DocsCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page?: DocsCollectionItem | null
}>()

const links = computed(() => props.page?.body?.toc?.links || [])
const appConfig = useAppConfig()
const { t } = useDocusI18n()
const { subNavigationMode } = useSubNavigation()
const contentTocVariants = useUIConfig('contentToc')
</script>

<template>
  <div>
    <UContentToc
      v-if="links.length"
      :highlight="contentTocVariants.highlight ?? true"
      :highlight-color="contentTocVariants.highlightColor"
      :highlight-variant="contentTocVariants.highlightVariant ?? 'circuit'"
      :color="contentTocVariants.color"
      :title="appConfig.toc?.title || t('docs.toc')"
      :links="links"
      :class="{ 'hidden lg:block': subNavigationMode }"
    >
      <template #bottom>
        <DocsAsideRightBottom />
      </template>
    </UContentToc>

    <div
      v-else
      class="hidden lg:block"
    >
      <DocsAsideRightBottom />
    </div>

    <DocsAsideMobileBar :links="links" />
  </div>
</template>
