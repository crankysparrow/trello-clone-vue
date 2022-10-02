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
const showForm = ref(false)

const create = (newName) => {
  addCardToBoard(props.boardId, props.listId, newName)

  newCardName.value = ''
  showForm.value = false
}
</script>

<template>
  <FormMini
    placeholder="card title"
    submitVal="add"
    btnName="add card"
    @submit="(newName) => create(newName)"
    class="bg-slate1" />
  <!-- <div class="list-add">
    <form @submit.prevent="create" v-if="showForm" class="new-card-form" relative bg-slate-1 p1>
      <div flex flex-col>
        <input type="text" id="newname" v-model="newCardName" placeholder="card title" mb1 />
      </div>
      <div flex items-center>
        <input type="submit" value="add" class="btnSmall" />
        <BtnClose @click="() => (showForm = false)"></BtnClose>
      </div>
    </form>

    <BtnAdd v-else @click="() => (showForm = true)"> add card </BtnAdd>
  </div> -->
</template>
