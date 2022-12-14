import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const useBoardStore = defineStore('boards', () => {
  const boards = ref(useStorage('boards', {}))

  const getBoardById = computed(() => {
    return (boardId) => boards.value[boardId]
  })

  const getCardById = computed(() => {
    return (boardId, cardId) => {
      let board = boards.value[boardId]
      return board.cards[cardId]
    }
  })

  const newBoard = (creator, boardName) => {
    let id = uuidv4()
    boards.value[id] = {
      id,
      name: boardName,
      creator,
      lists: {},
      listOrder: [],
      cards: {},
    }

    addListToBoard(id, 'My First List')
  }

  const addListToBoard = (boardId, listTitle) => {
    let board = boards.value[boardId]
    let newListId = uuidv4()

    if (!listTitle || listTitle.length < 1) {
      return 'list needs a title!'
    }

    board.lists[newListId] = {
      title: listTitle,
      id: newListId,
      cardIds: [],
      boardId: board.id,
    }

    board.listOrder.push(newListId)
  }

  const deleteListFromBoard = (boardId, listPos) => {
    let board = boards.value[boardId]
    let listId = board.listOrder[listPos]
    board.listOrder.splice(listPos, 1)
    delete board.lists[listId]
  }

  const moveList = (boardId, posToMoveFrom, posToMoveTo) => {
    let board = boards.value[boardId]
    if (board.listOrder[posToMoveFrom] && board.listOrder[posToMoveTo]) {
      let idToMove = board.listOrder.splice(posToMoveFrom, 1)[0]
      board.listOrder.splice(posToMoveTo, 0, idToMove)
      return true
    }
    return false
  }

  const moveCardWithinList = (boardId, listId, posToMoveFrom, posToMoveTo) => {
    let board = boards.value[boardId]
    let list = board.lists[listId]

    if (list.cardIds[posToMoveFrom] && list.cardIds[posToMoveTo]) {
      let idToMove = list.cardIds.splice(posToMoveFrom, 1)[0]
      list.cardIds.splice(posToMoveTo, 0, idToMove)
      return true
    }

    return false
  }

  const moveCardBetweenLists = (boardId, oldListId, newListId, posToMoveFrom, posToMoveTo) => {
    let board = boards.value[boardId]
    let oldList = board.lists[oldListId]
    let newList = board.lists[newListId]

    if (oldList && newList && board) {
      let idToMove = oldList.cardIds.splice(posToMoveFrom, 1)[0]
      newList.cardIds.splice(posToMoveTo, 0, idToMove)

      let card = board.cards[idToMove]
      card.currentList = newListId

      return true
    }

    return false
  }

  const addCardToBoard = (boardId, listId, cardTitle) => {
    let board = boards.value[boardId]
    let list = board.lists[listId]

    if (!cardTitle || cardTitle.length < 1) {
      return 'card needs a title!'
    }

    let newCardId = uuidv4()
    let card = {
      id: newCardId,
      title: cardTitle,
      description: '',
      currentList: listId,
    }

    board.cards[newCardId] = card
    list.cardIds.push(newCardId)
  }

  const deleteCardFromBoard = (boardId, cardId) => {
    let board = boards.value[boardId]
    let card = board.cards[cardId]
    let currentListId = card.currentList
    let currentList = board.lists[currentListId]

    currentList.cardIds = currentList.cardIds.filter((id) => id !== cardId)
    delete board.cards[cardId]
  }

  const renameList = (boardId, listId, newTitle) => {
    if (!newTitle || newTitle.length < 1) {
      return 'you need a title!'
    }
    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)
    let list = board.lists[listId]
    if (!list) return console.warn(`list doesn't exist! searched for ID: ${listId}`)

    list.title = newTitle
  }

  const renameCard = (boardId, cardId, newTitle) => {
    if (!newTitle || newTitle.length < 1) {
      return 'you need a title!'
    }
    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)

    let card = board.cards[cardId]
    if (!card) return console.warn(`card doesn't exist! searched for ID: ${cardId}`)

    card.title = newTitle
  }

  const describeCard = (boardId, cardId, description) => {
    if (!description || description.length < 1) {
      return 'enter some text for description'
    }

    let board = boards.value[boardId]
    if (!board) return console.warn(`board doesn't exist! searched for ID: ${boardId}`)
    let card = board.cards[cardId]
    if (!card) return console.warn(`card doesn't exist! searched for ID: ${cardId}`)

    card.description = description
  }

  return {
    boards,
    newBoard,
    getBoardById,
    getCardById,
    deleteListFromBoard,
    moveList,
    addListToBoard,
    addCardToBoard,
    moveCardWithinList,
    renameList,
    moveCardBetweenLists,
    deleteCardFromBoard,
    renameCard,
    describeCard,
  }
})
