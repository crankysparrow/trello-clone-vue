<script setup lang="ts">
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'

import { onMounted, ref } from 'vue'

const boardStore = useBoardStore()
const userStore = useUserStore()

const { boards } = boardStore

const newBoardCounter = ref(0)
const newListCounter = ref(0)

const addNewBoard = () => {
  boardStore.newBoard(userStore.id, `New Board ${newBoardCounter.value++}`)
}

const addNewList = () => {
  if (!boardIdToAddTo.value) return
  boardStore.addListToBoard(boardIdToAddTo.value, `New List ${newListCounter.value++}`)
}

const listIdToAddTo = ref<null | string>(null)
const boardIdToAddTo = ref<null | string>(null)
onMounted(() => {
  let boardKeys = Object.keys(boardStore.boards)

  if (boardKeys.length === 0) return

  let board = boardStore.boards[boardKeys[0]]
  if (!board) return
  boardIdToAddTo.value = board.id

  let listId = board.listOrder?.[0]
  if (!listId) return
  listIdToAddTo.value = listId
})
</script>

<template>
  <div class="p-4">
    <button @click="addNewBoard" class="btn">
      {{ `add a new board called "New Board ${newBoardCounter}"` }}
    </button>

    <button v-if="boardIdToAddTo" @click="addNewList" class="btn">
      {{ `add a new list called "New List ${newListCounter}" to board ${boardIdToAddTo}` }}
    </button>

    <div class="mt-4 text-3">
      <div v-for="(board, i) in boards" :key="`board-${i}`">
        {{ board.name }}
      </div>
    </div>
    <!-- <pre class="mt-4 text-3">
        {{ JSON.stringify(boardStore.boards, null, 2) }}
    </pre> -->
  </div>
</template>

<style scoped>
.btn {
  @apply text-cyan-9 bg-slate-2 p-3 hover:bg-slate-3;
}
</style>
