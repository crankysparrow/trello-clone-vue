<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  linkTo: { type: String, required: false },
  color: { type: String, default: 'dark' },
  size: { type: String, default: 'lg' },
})

const className = computed(() => `clicky-box ${props.color} ${props.size}`)

const el = ref(null)

defineExpose({
  el,
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
  @apply block p-4 my-2 mr-2 rounded-sm flex  items-end;
}

.clicky-box.lg {
  @apply w-64 h-30 max-w-64;
}

.clicky-box.dark {
  @apply bg-slate-9 bg-opacity-90 text-gray-1;
}

.clicky-box.light {
  @apply bg-slate-2 bg-opacity-90 text-dark-2 font-400;
}

.clicky-box:hover,
.clicky-box:focus {
  @apply shadow-lg bg-opacity-100;
}
</style>
