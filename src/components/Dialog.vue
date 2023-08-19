<script setup lang="ts">
import Button from './Button.vue'

defineEmits(['close'])

defineProps({
  title: { type: String, default: '', required: false },
  fixed: { type: Boolean, default: false, required: false },
})
</script>

<template>
  <div
    :class="fixed ? 'dialog dialog-fixed' : 'dialog'"
    v-click-outside="() => $emit('close')"
    @keyup.esc="() => $emit('close')">
    <Button
      icon="close"
      @click.native="$emit('close')"
      class="close"
      btnStyle="flat-light"
      label="Close Dialog"
      :showText="false"
      size="sm" />
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

.dialog-fixed {
  @apply fixed left-50% top-50% transform -translate-x-1/2 -translate-y-1/2;
}

.close {
  @apply absolute top-2 right-2 text-white;
}

.dialog-title {
  @apply mb-0 p4 border-b-1 border-slate-900 bg-slate-9 bg-opacity-90 text-gray-1;
}

.dialog-content {
  @apply overflow-auto h-full relative;
}
</style>
