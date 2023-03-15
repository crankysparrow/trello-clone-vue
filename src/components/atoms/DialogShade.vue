<template>
  <div class="shade">
    <slot></slot>
  </div>
</template>

<style scoped>
.shade {
  @apply fixed left-0 top-0 w-full h-full bg-dark-2 bg-opacity-50 flex items-center justify-center;
  z-index: 999;
}
</style>
