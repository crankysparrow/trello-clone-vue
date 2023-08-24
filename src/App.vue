<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import BottomBarInfo from './components/BottomBarInfo.vue'
</script>

<template>
  <div class="page-container">
    <top-bar></top-bar>
    <router-view></router-view>
    <BottomBarInfo />
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  /* grid-template-rows: auto 1fr; */
  padding-top: var(--topbar-height);
}
</style>
