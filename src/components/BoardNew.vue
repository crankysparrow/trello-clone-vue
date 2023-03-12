<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/userstore'
import { useBoardStore } from '../store/boardstore'
import DialogShade from './DialogShade.vue'
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
  <DialogShade>
    <div class="new-board-form" bg-white relative min="w-sm" v-click-outside="() => $emit('close')">
      <button btn-reset absolute text-6 class="close" aria-label="close" @click="$emit('close')">
        <div i-carbon:close />
      </button>
      <form @submit.prevent="create">
        <h2 text-xl mb-4 p-4 bg-slate-1 border="b-1 slate-3">create board</h2>
        <div p-4 flex>
          <label for="newname" mr-3>New Board Title</label>
          <input type="text" id="newname" v-model="newBoardName" flex-grow />
        </div>
        <div p-4 bg-slate-1 border="t-1 slate-3" text-right>
          <button btn-cancel mr2 @click.prevent="$emit('close')">cancel</button>
          <button btn text="white" type="submit">create</button>
        </div>
      </form>
    </div>
  </DialogShade>
</template>

<style lang="scss" scoped>
@use '../styles/colors' as *;
.new-board-form {
  // width: 290px;
  // background-color: #fff;
  // padding: 1rem;
  // max-height: 100vh;
  // overflow: auto;
}

button.close {
  top: 0.5rem;
  right: 0.5rem;
}
</style>
