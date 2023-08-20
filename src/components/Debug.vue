<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import Dialog from '~/components/Dialog.vue'
import Button from '~/components/Button.vue'

const props = defineProps({
  boardId: { type: String, required: true },
})
const boardStore = useBoardStore()
const board = computed(() => boardStore.getBoardById(props.boardId))

const isOpen = ref(false)
const listIdToDelete = ref('')

const deleteList = () => {
  boardStore.deleteListFromBoard(props.boardId, listIdToDelete.value)
  listIdToDelete.value = ''
}
</script>

<template>
  <Dialog
    :fixed="true"
    title="debug"
    v-if="isOpen"
    @close="isOpen = false"
    class="w-60% min-h-80vh z-99 bg-slate-2">
    <div class="bg-slate-4 relative p-2 h-full">
      <div class="debug-border">
        <div><strong>ID: </strong>{{ board.id }}</div>
        <div><strong>name: </strong>{{ board.name }}</div>
        <div><strong>creatorId: </strong>{{ board.creatorId }}</div>
        <div><strong>listOrder: </strong>{{ board.listOrder }}</div>
      </div>

      <details>
        <summary>lists</summary>
        <details v-for="(list, i) in board.lists" :key="i">
          <summary>{{ list.title }} | {{ list.id }}</summary>
          <ul class="debug-list" v-if="list.cardIds.length > 0">
            <li v-for="cardId in list.cardIds">
              <strong>{{ board.cards[cardId].title }}</strong> | {{ cardId }}
            </li>
          </ul>
          <div v-else class="ml-4">no cards</div>
        </details>
      </details>
      <details>
        <summary>cards</summary>
        <ul class="debug-list">
          <li v-for="card in board.cards">
            <strong>{{ card.title }}</strong> | {{ card.id }}
          </li>
        </ul>
      </details>

      <div class="debug-border">
        <div>
          <label for="list-id-delete">delete list by id: </label>
          <input id="list-id-delete" type="text" class="mr-2" v-model="listIdToDelete" />
          <Button @click="deleteList">delete list</Button>
        </div>
      </div>
    </div>
  </Dialog>

  <button
    class="rounded-sm bg-cyan-400 px2 py1 absolute bottom-5 right-5 z-99 text-4"
    @click="isOpen = !isOpen">
    debug
  </button>
</template>

<style scoped>
.debug-border,
details {
  @apply border-slate-7 border-1 rounded-sm m-3 p-2 bg-slate-2;
}

details {
  @apply m-3 p-0;
}

summary {
  @apply cursor-pointer bg-slate-8 p-1  text-white;
}
.debug-list {
  @apply ml-8 list-disc text-4;
}
</style>
