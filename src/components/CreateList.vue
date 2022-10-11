<script setup>
import BtnClose from '~/components/BtnClose.vue'
import BtnAdd from '~/components/BtnAdd.vue'
import { useBoardStore } from '~/store/boardstore'
import { ref, defineProps } from 'vue'
import FormMini from './FormMini.vue'

const newListName = ref('')
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
    <FormMini
      p-2
      bg-slate-2
      v-model="showForm"
      placeholder="list title"
      btnName="add list"
      :errorMsg="errorMsg"
      @submit="(newName) => create(newName)" />
    <!--
      <div v-if="showForm" class="new-list-form" relative>
        <form @submit.prevent="create">
          <div flex flex-col>
            <input type="text" id="newname" v-model="newListName" />
          </div>
          <div flex items-center>
            <input type="submit" value="add" class="btnSmall" />
            <BtnClose @click="() => (showForm = false)" />
          </div>
        </form>
      </div>
      <BtnAdd p="y2 x2" v-else @click="() => (showForm = true)"> add list </BtnAdd> -->
  </div>
</template>
