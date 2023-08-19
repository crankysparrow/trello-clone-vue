<script setup lang="ts">
import { computed, ref } from 'vue'

export interface props {
  linkTo?: string
  color?: 'dark' | 'light'
  size?: 'lg' | 'sm'
}

const props = withDefaults(defineProps<props>(), {
  color: 'dark',
  size: 'lg',
})

const className = computed(() => `clicky-box ${props.color} ${props.size}`)

const el = ref<HTMLButtonElement | HTMLAnchorElement | null>(null)

const focus = () => {
  el.value?.focus()
}

defineExpose({
  el,
  focus,
})
</script>

<template>
  <router-link v-if="linkTo" :to="linkTo" :class="className" ref="el">
    <slot></slot>
  </router-link>
  <button v-else :class="className" ref="el">
    <slot></slot>
  </button>
</template>

<style scoped>
.clicky-box {
  @apply block p-2 rounded-sm flex items-center w-full font-500;
}

.clicky-box.lg {
  @apply min-h-30 items-end p-4;
}

.clicky-box.dark {
  @apply bg-slate-9 bg-opacity-90 text-gray-1;
}

.clicky-box.light {
  @apply bg-slate-3 bg-opacity-90;
}

.clicky-box:hover,
.clicky-box:focus {
  @apply shadow-lg bg-opacity-100;
}
</style>
