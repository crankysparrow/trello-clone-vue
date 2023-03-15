<script setup>
import Button from './Button.vue'
import DialogShade from './DialogShade.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  title: { type: String, default: '', required: false },
})
</script>

<template>
  <DialogShade>
    <div class="dialog" v-click-outside="() => $emit('close')" @keyup.esc="() => $emit('close')">
      <Button variant="close" @click.native="$emit('close')" class="close" />
      <slot name="title">
        <h2 v-if="title" class="dialog-title">{{ title }}</h2>
      </slot>
      <slot></slot>
    </div>
  </DialogShade>
</template>

<style scoped>
.dialog {
  @apply min-w-sm bg-white relative;
}

.close {
  @apply absolute top-2 right-2;
}

.dialog-title {
  @apply text-xl mb-0 p4 bg-slate-1 border-b-1 border-slate-3;
}
</style>
