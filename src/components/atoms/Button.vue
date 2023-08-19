<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  btnStyle?: 'primary' | 'subdued' | 'error' | 'flat-light' | 'flat-dark' | 'none'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: 'close' | 'delete'
  showText?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  btnStyle: 'primary',
  showText: true,
  size: 'md',
})

const className = computed(() => `btn btn-style-${props.btnStyle} btn-size-${props.size}`)
const ariaLabel = computed(() => props.label ?? undefined)
</script>

<template>
  <button :class="className" :aria-label="ariaLabel ?? ''">
    <slot>
      <div v-if="icon && icon === 'close'" class="i-carbon:close" />
      <div v-else-if="icon && icon === 'delete'" class="i-carbon:trash-can" />

      <div v-if="label && showText && icon" class="btn-spacer"></div>
      <div v-if="label && showText" class="btn-label">{{ label }}</div>
    </slot>
  </button>
</template>

<style scoped>
.btn {
  @apply cursor-pointer inline-flex items-center;
}

.btn-spacer {
  @apply w-1;
}

.btn-size-md {
  @apply px3 py2 text-sm lh-none;
}

.btn-size-sm {
  @apply px2 py1 text-3.5 lh-none;
}

.btn-size-xs {
  @apply px1 py1 text-3 lh-none;
}

.btn-size-lg {
  @apply px4 py3 text-lg lh-none;
}

.btn.btn-style-primary {
  @apply bg-cyan-7 text-slate-1 hover:bg-cyan-6 focus:bg-cyan-6;
  @apply lh-none font-500 rounded-none transition-all;
}

.btn.btn-style-error {
  @apply text-error bg-transparent;
  @apply hover:bg-red-8 hover:bg-opacity-10 focus:bg-red-8 focus:bg-opacity-10;
}

.btn.btn-style-subdued {
  @apply text-dark-1 bg-transparent hover:bg-slate-2 focus:bg-slate-2;
}

.btn.btn-style-flat-light {
  @apply text-slate-1 bg-slate-1 bg-opacity-0;
  @apply hover:bg-opacity-10 focus:bg-opacity-10;
}

.btn.btn-style-flat-dark {
  @apply text-slate-9 bg-slate-7 bg-opacity-0;
  @apply hover:bg-opacity-10 focus:bg-opacity-10;
}

.btn > *[class^='i-'] {
  @apply text-140%;
}
</style>
