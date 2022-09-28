<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/userstore'
import { useBoardStore } from '../store/boardstore'
const newBoardName = ref('')

const userStore = useUserStore()
const boardStore = useBoardStore()

const emit = defineEmits(['close'])

const create = () => {
  boardStore.newBoard(userStore.id, newBoardName.value)
  newBoardName.value = ''
  emit('close')
}
</script>

<template>
  <div fixed bg-light-2 px-4 py-4 class="new-board-form">
    <button btnReset absolute class="close" aria-label="close" @click="$emit('close')">
      <div i-carbon:close />
    </button>
    <form @submit.prevent="create">
      <h2 mb-4 text-center border-b-1 border-slate-2>create board</h2>
      <div flex flex-col>
        <label for="newname">New Board Title</label>
        <input type="text" id="newname" v-model="newBoardName" />
      </div>
      <input type="submit" value="create" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/colors' as *;
.new-board-form {
  box-shadow: 0 0 10px transparentize($color-slate-5, 0.6);
  width: 290px;
  background-color: #fff;
  padding: 1rem;
  max-height: 100vh;
  overflow: auto;
}

button.close {
  top: 0.5rem;
  right: 0.5rem;
}
</style>
