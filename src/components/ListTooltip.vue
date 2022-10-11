<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import FormMini from '~/components/FormMini.vue'

const { deleteListFromBoard, renameList } = useBoardStore()

const open = ref(false)
const renameForm = ref()

const props = defineProps({
  listId: String,
  boardId: { type: String, required: true },
  position: { type: Number, required: true },
})
</script>

<template>
  <div class="tooltip-container" absolute>
    <button class="tip-control" @click="() => (open = !open)" btnReset block>
      <div i-carbon:menu />
    </button>
    <div class="tooltip" v-if="open" bg-white v-click-outside="() => (open = false)">
      <ul list-none p-0>
        <li>
          <button
            @click="() => deleteListFromBoard(boardId, position)"
            btnReset
            p2
            fw-400
            text="red-4 sm"
            hover="bg-red-1 text-red-7">
            <div i-carbon:trash-can></div>
            delete list
          </button>
        </li>
        <li>
          <FormMini
            submitVal="rename"
            btnName="rename list"
            ref="renameForm"
            @submit="(newName) => renameList(boardId, listId, newName)">
            <template #button>
              <button
                btnReset
                p2
                fw400
                text-sm
                hover:bg-gray1
                focus:bg-gray1
                @click="() => ($refs.renameForm.showForm = true)">
                <div i-carbon:term></div>
                rename list
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
  width: 200px;
}
ul button {
  display: flex;
  width: 100%;
  line-height: 1;
  justify-content: space-between;
}
</style>
