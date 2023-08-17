<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useBoardStore } from '~/store/boardstore'

const { deleteCardFromBoard } = useBoardStore()

// TODO: remove?

const open = ref(false)
// const showRenameForm = ref(false)
// const renameError = ref(false)

const props = defineProps({
  cardId: { type: String, required: true },
  boardId: { type: String, required: true },
})

// const doRename = (newName) => {
//   const err = renameCard(props.boardId, props.cardId, newName)
//   if (err) {
//     renameError.value = err
//   } else {
//     renameError.value = false
//     showRenameForm.value = false
//     open.value = false
//   }
// }

const emit = defineEmits(['deleteCard'])

const doDelete = () => {
  deleteCardFromBoard(props.boardId, props.cardId)
  emit('deleteCard')
}
</script>

<template>
  <div class="tooltip-container" absolute>
    <button class="tip-control" @click="() => (open = !open)">
      <div i-carbon:menu />
    </button>
    <div class="tooltip" v-if="open" v-click-outside="() => (open = false)" shadow bg-coolgray-50>
      <ul list-none p-0>
        <li>
          <button
            @click="doDelete"
            class="red-4 text-3 tooltip-btn hover:bg-red-1 hover:text-red-7">
            <div i-carbon:trash-can></div>
            delete card
          </button>
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
  width: 200px;
}
ul button {
  width: 100%;
  line-height: 1;
}

.tooltip-btn {
  @apply flex p2 fw-400;
}
</style>
