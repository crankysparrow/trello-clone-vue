<template>
  <button btnReset text-sm fw-500 flex items-center w-full bg="slate-1 op80" p="x4 y1" hover:bg="op-100 slate-3">
    <slot name="icon"><div i-carbon:add /></slot>
    <slot>add</slot>
  </button>
</template>
