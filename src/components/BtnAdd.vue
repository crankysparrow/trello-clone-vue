<template>
  <!-- <button btn-reset text-sm fw-500 flex items-center w-full bg="slate-1 op80" p="x4 y1" hover:bg="op-100 slate-3"> -->
  <button class="btn-add">
    <slot name="icon"><div i-carbon:add /></slot>
    <slot>add</slot>
  </button>
</template>

<style scoped>
.btn-add {
  @apply text-sm text-dark fw-500 flex items-center w-full;
  @apply bg-slate1 bg-op-80 p-x4 p-y1;
  @apply hover:bg-slate3 hover:bg-op-100;
}
</style>
