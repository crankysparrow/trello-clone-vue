<script setup lang="ts">
import HeadingPage from '~/components/HeadingPage.vue'

defineProps({
  title: { type: String, required: true },
  rows: { type: Boolean, default: false },
})
</script>

<template>
  <div class="page-wrap">
    <div class="page-wrap-title">
      <slot name="title">
        <HeadingPage>{{ title }}</HeadingPage>
      </slot>
    </div>

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

.page-wrap-title {
  @apply my-4 container px-4 mx-auto w-full;
}
.content-wrap.columns {
  @apply grid pb-18 pt1 px-4 overflow-x-auto grid-flow-col max-w-full h-full;
  grid-auto-columns: 18rem;
}

.content-wrap.rows {
  @apply flex flex-wrap items-start self-start container mx-a w-full;
}
</style>
