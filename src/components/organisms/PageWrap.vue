<script setup lang="ts">
import HeadingPage from '~/components/atoms/HeadingPage.vue'

defineProps({
  title: { type: String, required: true },
  rows: { type: Boolean, default: false },
})
</script>

<template>
  <div class="page-wrap">
    <HeadingPage>{{ title }}</HeadingPage>

    <div :class="`content-wrap ${rows ? 'rows' : 'columns'}`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-wrap {
  @apply relative w-full grid h-full;
  grid-template-rows: auto 1fr;
}
.content-wrap.columns {
  @apply grid pb6 px-4 overflow-x-auto grid-flow-col max-w-full h-full;
  grid-auto-columns: 18rem;
}

.content-wrap.rows {
  @apply flex flex-wrap items-start self-start container mx-a w-full;
}
</style>
