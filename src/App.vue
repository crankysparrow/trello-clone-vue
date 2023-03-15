<script setup>
import TopBar from './components/organisms/TopBar.vue'
</script>

<template>
  <div class="page-container">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.page-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
}
</style>
