<script setup>
import BtnClose from '~/components/BtnClose.vue'
import BtnAdd from '~/components/BtnAdd.vue'
import { useBoardStore } from '~/store/boardstore'
import { ref, defineProps } from 'vue'

const newListName = ref('')
const showForm = ref(false)

const { addListToBoard } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
})

const create = () => {
  addListToBoard(props.boardId, newListName.value)
  newListName.value = ''
  showForm.value = false
}
</script>

<template>
  <div class="list-add">
    <div p-2 bg-slate-2>
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
      <BtnAdd p="y2 x2" v-else @click="() => (showForm = true)"> add list </BtnAdd>
    </div>
  </div>
</template>
