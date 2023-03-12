<script setup>
import FormMini from '~/components/FormMini.vue'
import AddForm from '~/components/AddForm.vue'
import { ref, defineProps } from 'vue'
import { useBoardStore } from '~/store/boardstore'

const { addCardToBoard } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
  listId: { type: String, required: true },
})

const newCardName = ref('')
const errorMsg = ref(false)
const show = ref(false)

const create = (newName) => {
  let err = addCardToBoard(props.boardId, props.listId, newName)
  if (err) {
    errorMsg.value = err
  } else {
    errorMsg.value = false
    newCardName.value = ''
    show.value = false
  }
}
</script>

<template>
  <div class="add-form">
    <AddForm
      placeholder="card title"
      valueSubmit="add"
      valueShow="add card"
      v-model="show"
      :valueError="errorMsg"
      @submit="(newName) => create(newName)" />
  </div>
</template>
