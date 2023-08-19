<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import { useUserStore } from '~/store/userstore'
import TextEditable from '~/components/TextEditable.vue'

const profileOpen = ref(false)

const user = useUserStore()

const changeUserName = (newName: string) => {
  user.setName(newName)
}

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
  <DialogShade v-if="profileOpen">
    <Dialog @close="profileOpen = false">
      <template #title>
        <h2>Your Profile</h2>
      </template>
      <div class="p4">
        <div class="text-3.5">Click your name to edit it</div>
        <strong>Name: </strong>
        <TextEditable
          class="inline-block"
          :text="user.name"
          @updateText="changeUserName"
          placeholder="Your Name" />
      </div>
    </Dialog>
  </DialogShade>
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
