<script setup>
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
        bg="cyan-6 opacity-30 hover:opacity-60 hover:cyan-5"
        text="white xl"
        p-2
        rounded-full>
        <div i-carbon:person></div>
      </button>

      <div class="profile" absolute px-3>
        <!-- <h3>your profile: {{ userStore }}</h3> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  @apply w-full bg-cyan-8;
  height: 50px;
}

.topbar-inner {
  @apply container mx-auto flex items-center justify-between h-full relative;
}
</style>
