<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import FormMini from '~/components/FormMini.vue'

const { deleteCardFromBoard, renameCard } = useBoardStore()

const open = ref(false)
const showRenameForm = ref(false)
const renameError = ref(false)

const props = defineProps({
  cardId: { type: String, required: true },
  boardId: { type: String, required: true },
})

const doRename = (newName) => {
  const err = renameCard(props.boardId, props.cardId, newName)
  if (err) {
    renameError.value = err
  } else {
    renameError.value = false
    showRenameForm.value = false
    open.value = false
  }
}

const emit = defineEmits(['deleteCard'])

const doDelete = () => {
  const err = deleteCardFromBoard(props.boardId, props.cardId)
  emit('deleteCard')
}
</script>

<template>
  <div class="tooltip-container" absolute>
    <button class="tip-control" @click="() => (open = !open)" btn-reset block>
      <div i-carbon:menu />
    </button>
    <div class="tooltip" v-if="open" v-click-outside="() => (open = false)" shadow bg-coolgray-50>
      <ul list-none p-0>
        <li>
          <button @click="doDelete" btn-reset p2 fw-400 text="red-4 sm" hover="bg-red-1 text-red-7">
            <div i-carbon:trash-can></div>
            delete card
          </button>
        </li>
        <li>
          <FormMini
            submitVal="rename"
            btnName="rename list"
            v-model="showRenameForm"
            :errorMsg="renameError"
            @submit="(newName) => doRename(newName)">
            <template #button>
              <button btn-reset p2 fw400 text-sm hover:bg-gray1 focus:bg-gray1 @click="() => (showRenameForm = true)">
                <div i-carbon:term></div>
                rename card
              </button>
            </template>
          </FormMini>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip-container {
  height: 1.2rem;
  button.tip-control {
    height: 1.1rem;
  }
}
.tooltip {
  position: absolute;
  right: 0;
  left: auto;
  z-index: 3;
  top: 100%;
  width: 250px;
}
ul button {
  display: flex;
  width: 100%;
  line-height: 1;
  justify-content: space-between;
}
</style>
