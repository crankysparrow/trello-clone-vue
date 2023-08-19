<script setup lang="ts">
import TopBar from './components/TopBar.vue'
</script>

<template>
  <div class="page-container">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
}
</style>
