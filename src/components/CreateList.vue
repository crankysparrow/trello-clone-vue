<script setup>
import { useBoardStore } from '~/store/boardstore'
import { ref, defineProps } from 'vue'
import AddForm from './molecules/AddForm.vue'

const showForm = ref(false)
const errorMsg = ref(false)

const { addListToBoard } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
})

const create = (newName) => {
  let err = addListToBoard(props.boardId, newName)
  if (err) {
    errorMsg.value = err
  } else {
    errorMsg.value = false
    showForm.value = false
  }
}
</script>

<template>
  <div class="list-add">
    <AddForm
      v-model="showForm"
      placeholder="list title"
      valueShow="add list"
      :valueError="errorMsg"
      @submit="(newName) => create(newName)" />
  </div>
</template>
