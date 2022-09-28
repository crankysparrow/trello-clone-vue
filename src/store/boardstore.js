import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const useBoardStore = defineStore('boards', () => {
  const boards = ref(useStorage('boards', []))

  const getBoardById = computed(() => {
    return (boardId) => boards.value.find((board) => board.id === boardId)
  })

  function newBoard(creator, boardName) {
    boards.value.push({
      id: uuidv4(),
      name: boardName,
      creator,
      lists: [{ title: 'My First List', id: 1, cardIDs: [] }],
    })
  }

  return { boards, newBoard, getBoardById }
})
