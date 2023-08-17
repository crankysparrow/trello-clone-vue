<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  variant?: 'default' | 'close'
  btnStyle?: 'primary' | 'subdued'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  btnStyle: 'primary',
})

const className = computed(() => `btn btn-style-${props.btnStyle} btn-${props.variant}`)
const ariaLabel = computed(() => (props.variant === 'close' ? 'close' : null))
</script>

<template>
  <button :class="className" :aria-label="ariaLabel ?? ''">
    <div v-if="variant === 'close'" i-carbon:close />
    <slot v-else></slot>
  </button>
</template>

<style scoped>
.btn {
  @apply px3 py2 lh-none font-500 text-sm rounded-none transition-all cursor-pointer;
}

.btn.btn-style-primary {
  @apply bg-cyan-7 text-slate-1 hover:bg-cyan-6 focus:bg-cyan-6;
}

.btn.btn-style-subdued {
  @apply text-dark-1 bg-transparent hover:bg-slate-2 focus:bg-slate-2;
}

.btn.btn-close {
  @apply text-7 btn-reset style-inherit;
  @apply hover:text-cyan-7 focus:text-cyan-7;
}
</style>
