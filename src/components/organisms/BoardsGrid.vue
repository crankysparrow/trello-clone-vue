<script setup lang="ts">
import ClickyBox from '~/components/atoms/ClickyBox.vue'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import InputForm from '~/components/molecules/InputForm.vue'
import Dialog from '~/components/atoms/Dialog.vue'
import { ref, nextTick } from 'vue'

const showFormButton = ref<typeof ClickyBox | null>(null)
const showNewBoardForm = ref(false)
const newBoardName = ref('')

const userStore = useUserStore()
const boardStore = useBoardStore()

const { newBoard, boards } = boardStore

const openForm = () => {
  showNewBoardForm.value = true
}

const closeForm = (focus = true) => {
  showNewBoardForm.value = false
  focus && showFormButton.value?.el?.focus()
}

const onCreateBoardSuccess = (newBoardId: string) => {
  closeForm(false)
  nextTick(() => {
    let newBoardEl = document.querySelector(`.clicky-box[href*="board/${newBoardId}"]`)
    newBoardEl instanceof HTMLAnchorElement && newBoardEl.focus()
  })
}
</script>

<template>
  <ClickyBox
    v-for="(board, i) in boards"
    :key="`board-link-${i}`"
    :linkTo="`board/${board.id}`"
    class="boardgrid-box">
    {{ board.name }}
  </ClickyBox>

  <ClickyBox @click.native="openForm" color="light" ref="showFormButton" class="boardgrid-box">
    Create Board
  </ClickyBox>

  <transition name="fade">
    <Dialog title="Create Board" @close="closeForm" v-if="showNewBoardForm">
      <div class="px-2">
        <InputForm
          inputLabel="New Board Title"
          v-model="newBoardName"
          inputId="newname"
          :focusOnMount="true"
          @submit="() => newBoard(userStore.id, newBoardName)"
          @submitSuccess="onCreateBoardSuccess"
          @cancel="closeForm" />
      </div>
    </Dialog>
  </transition>
</template>

<style scoped>
.boardgrid-box {
  @apply my-2 mr-2 w-64 max-w-64;
}
</style>
