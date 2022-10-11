<script setup>
import BtnClose from '~/components/BtnClose.vue'
import BtnAdd from '~/components/BtnAdd.vue'
import FormMini from '~/components/FormMini.vue'
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
  <FormMini
    placeholder="card title"
    submitVal="add"
    btnName="add card"
    v-model="show"
    :errorMsg="errorMsg"
    @submit="(newName) => create(newName)"
    class="bg-slate1" />
</template>
