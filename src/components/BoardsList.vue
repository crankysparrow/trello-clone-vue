<script setup>
import BoardNew from './BoardNew.vue'
import { useBoardStore } from '../store/boardstore'
import { ref } from 'vue'

const boardStore = useBoardStore()

const wrapCreate = ref(null)
const newBoardForm = ref(null)
const formLeft = ref(0)
const formRight = ref('auto')
const formTranslateX = ref(0)
const formTop = ref(0)
const showNewBoardForm = ref(false)

const openForm = (e) => {
  showNewBoardForm.value = true
}

const boardNewEnter = (el) => {
  let create = wrapCreate.value.getBoundingClientRect()
  let center = create.right - create.width / 2

  const formWidth = el.clientWidth
  const formHeight = el.clientHeight

  if (center <= window.innerWidth / 2) {
    formLeft.value = `${create.left + create.width - 20}px`
  } else {
    formLeft.value = `${Math.max(create.left - formWidth + 10, 10)}px`
  }

  let top = create.top
  let offset = window.innerHeight - (top + formHeight)
  if (offset < 0) {
    top = Math.max(top + offset - 10, 0)
  }
  formTop.value = top + 'px'
}

const closeForm = () => {
  showNewBoardForm.value = false
}
</script>

<template>
  <div class="boards-list-outer wrapper">
    <h1>Your Boards</h1>
    <div class="boards-list" flex items-end mb-20>
      <router-link
        v-for="(board, i) of boardStore.boards"
        class="board-item"
        :to="`/board/${board.id}`">
        <h3 mb-0>{{ board.name }}</h3>
      </router-link>

      <div class="wrap-create" ref="wrapCreate" relative>
        <button class="create board-item" @click="openForm">Create Board</button>
        <transition @enter="boardNewEnter">
          <BoardNew
            v-if="showNewBoardForm"
            ref="newBoardForm"
            v-click-outside="closeForm"
            @close="closeForm"
            :style="{ left: formLeft, top: formTop }" />
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.boards-list {
  @apply m--2 flex flex-wrap;
}
.board-item {
  @apply bg-cerulean-6 p-4 text-gray-1  m-2 rounded-sm flex items-end;
  max-width: 250px;
  min-width: 250px;
  max-height: 100px;
  min-height: 100px;
}

button.board-item.create {
  @apply block text-dark flex items-end font-normal bg-gray-2 bg-opacity-50;
  width: 100%;
  // background-color: #e9e9e9;

  &:hover,
  &:focus {
    @apply shadow-lg bg-opacity-80;
  }
}
</style>
