<script setup>
import CreateBoard from '../CreateBoard.vue'
import ClickyBox from '../atoms/ClickyBox.vue'
import { useBoardStore } from '../../store/boardstore'
import { useUserStore } from '~/store/userstore'
import InputForm from '../molecules/InputForm.vue'
import Dialog from '~/components/atoms/Dialog.vue'
import { ref, onMounted } from 'vue'

const showFormButton = ref(null)
const showNewBoardForm = ref(false)
const newBoardName = ref('')

const userStore = useUserStore()
const boardStore = useBoardStore()

const openForm = (e) => {
  showNewBoardForm.value = true
}

const closeForm = () => {
  showNewBoardForm.value = false
  showFormButton.value.el?.focus()
}

const createBoard = () => {
  boardStore.newBoard(userStore.id, newBoardName.value)
  newBoardName.value = ''
  closeForm()
}
</script>

<template>
  <ClickyBox v-for="(board, i) in boardStore.boards" :linkTo="`board/${board.id}`">
    {{ board.name }}
  </ClickyBox>

  <ClickyBox @click.native="openForm" color="light" ref="showFormButton">Create Board</ClickyBox>

  <transition name="fade">
    <Dialog title="Create Board" @close="closeForm" v-if="showNewBoardForm">
      <InputForm
        inputLabel="New Board Title"
        v-model="newBoardName"
        inputId="newname"
        @submit="createBoard"
        @cancel="closeForm" />
    </Dialog>
  </transition>
</template>
