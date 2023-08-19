<script setup lang="ts">
import { ref } from 'vue'
const profileOpen = ref(false)

const profileBtn = () => {
  profileOpen.value = !profileOpen.value
}
</script>

<template>
  <div class="topbar">
    <div class="topbar-inner">
      <router-link to="/" btn text-white bg="cyan-7 op-50 hover:op-80"> TRELLO CLONE </router-link>

      <button
        aria-label="Your Profile"
        title="Your Profile"
        @click="profileBtn"
        class="profile-btn">
        <div i-carbon:person></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  @apply w-full bg-cyan-8;
  height: 50px;
}

.profile-btn {
  @apply bg-cyan-6 bg-opacity-30 text-white text-xl p-2 rounded-full;
  @apply hover:opacity-60 hover:bg-cyan-5;
}

.topbar-inner {
  @apply container mx-auto flex items-center justify-between h-full relative;
}
</style>
