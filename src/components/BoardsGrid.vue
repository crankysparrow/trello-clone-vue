<script setup lang="ts">
import ClickyBox from '~/components/ClickyBox.vue'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import InputForm from '~/components/InputForm.vue'
// import InputNew from '~/components/molecules/InputNew.vue'
import Dialog from '~/components/Dialog.vue'
import DialogShade from '~/components/DialogShade.vue'
import { ref, nextTick } from 'vue'

const showFormButton = ref<typeof ClickyBox | null>(null)
const showNewBoardForm = ref(false)
// const newBoardName = ref('')

const userStore = useUserStore()
const boardStore = useBoardStore()

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
    v-for="(board, i) in boardStore.boards"
    :key="`board-link-${i}`"
    :linkTo="`board/${board.id}`"
    class="boardgrid-box">
    {{ board.name }}
  </ClickyBox>

  <ClickyBox @click.native="openForm" color="light" ref="showFormButton" class="boardgrid-box">
    Create Board
  </ClickyBox>

  <transition name="fade">
    <DialogShade v-if="showNewBoardForm">
      <Dialog title="Create Board" @close="closeForm">
        <InputForm
          inputLabel="New Board Title"
          inputId="newname"
          :focusOnMount="true"
          @submit="(newBoardName) => boardStore.newBoard(userStore.id, newBoardName)"
          @submitSuccess="onCreateBoardSuccess"
          @cancel="closeForm" />
      </Dialog>
    </DialogShade>
  </transition>
</template>

<style scoped>
.boardgrid-box {
  @apply my-2 mr-2 w-64 max-w-64;
}
</style>
