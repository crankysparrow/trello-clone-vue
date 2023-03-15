<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' },
  color: { type: String, default: 'primary' },
})

const className = computed(() => `btn btn-${props.color} btn-${props.variant}`)
const ariaLabel = computed(() => (props.variant === 'close' ? 'close' : null))
</script>

<template>
  <button :class="className" :aria-label="ariaLabel">
    <div v-if="variant === 'close'" i-carbon:close />
    <slot v-else></slot>
  </button>
</template>

<style scoped>
.btn {
  @apply px3 py2 lh-none font-500 text-sm rounded-none transition-all cursor-pointer;
}

.btn.btn-primary {
  @apply bg-cyan-7 text-slate-1 hover:bg-cyan-6 focus:bg-cyan-6;
}

.btn.btn-subdued {
  @apply text-dark-1 bg-transparent hover:bg-slate-2 focus:bg-slate-2;
}

.btn.btn-close {
  @apply text-7 btn-reset color-inherit;
  @apply hover:text-cyan-7 focus:text-cyan-7;
}
</style>
