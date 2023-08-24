<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import { useUserStore } from '~/store/userstore'
import TextEditable from '~/components/TextEditable.vue'
import Button from '~/components/Button.vue'

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
      <Button linkTo="/" label="TRELLO CLONE" size="md" shape="rounded" />
      <!-- <router-link to="/" class="topbar-btn"> TRELLO CLONE </router-link> -->

      <Button
        label="Your Profile"
        @click="profileBtn"
        shape="circle"
        :showText="false"
        color="primary"
        size="lg">
        <div class="i-carbon:person"></div>
      </Button>
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
  @apply w-full bg-cyan-8 fixed top-0 left-0 z-99;
  height: 50px;
}

.profile-btn {
  @apply rounded-full text-xl p-2;
}

.topbar-inner {
  @apply container px-4 mx-auto flex items-center justify-between h-full relative;
}
</style>
