<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Button from './Button.vue'

defineEmits(['close'])

export interface Props {
  title?: string
  fixed?: boolean
  focusOnMount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  fixed: false,
  focusOnMount: true,
})

const el = ref<HTMLElement | null>(null)

// hacky focus trap
const focusInEvent = (e: FocusEvent) => {
  if (el.value && !el.value.contains(e.target as Node)) {
    el.value.focus()
  }
}

onMounted(() => {
  if (props.focusOnMount) {
    el.value?.focus()
  }

  document.body.addEventListener('focusin', focusInEvent)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('focusin', focusInEvent)
})
</script>

<template>
  <div
    :class="fixed ? 'dialog dialog-fixed' : 'dialog'"
    v-click-outside="() => $emit('close')"
    @keyup.esc="() => $emit('close')"
    tabIndex="-1"
    ref="el">
    <Button
      icon="close"
      @click.native="$emit('close')"
      class="close"
      color="flat-light"
      label="Close Dialog"
      :showText="false"
      size="sm"
      shape="circle" />
    <div class="dialog-title">
      <slot name="title">
        <h2 v-if="title">{{ title }}</h2>
      </slot>
    </div>
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  @apply min-w-sm bg-white relative grid;
  grid-template-rows: min-content 1fr;
  max-height: 90vh;
}

.close {
  @apply absolute top-1 right-1 text-white;
}

.dialog-title {
  @apply mb-0 p4 border-b-1 border-slate-900 bg-slate-9 bg-opacity-90 text-gray-1;
}

.dialog-content {
  @apply overflow-auto h-full relative;
}
</style>
