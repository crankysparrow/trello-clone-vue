<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import Dialog from '~/components/atoms/Dialog.vue'

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
  <Dialog :fixed="true" title="debug" v-if="isOpen" @close="isOpen = false" class="w-60%">
    <pre class="text-3.5">
      id: {{ board.id }} 
      name: {{ board.name }} 
      creatorId: {{ board.creatorId }} 
      listOrder: {{ board.listOrder }} 
      </pre
    >
    <details>
      <summary>lists</summary>
      <details v-for="(list, i) in board.lists" :key="i" class="ml-5">
        <summary>{{ list.title }} | {{ list.id }}</summary>
        <div v-for="cardId in list.cardIds">
          <div class="text-4">
            <strong>{{ board.cards[cardId].title }}</strong> | {{ cardId }}
          </div>
        </div>
      </details>
      <pre class="text-3.5">
          
          <!-- {{ board.lists }} -->

        </pre>
    </details>
    <details>
      <summary>cards</summary>
      <pre class="text-3.5">
          {{ board.cards }}
        </pre
      >
    </details>

    <input type="text" v-model="listIdToDelete" />
    <button @click="deleteList">delete list</button>
  </Dialog>

  <button class="rounded-full bg-cyan-400 p3 absolute bottom-5 right-5" @click="isOpen = !isOpen">
    debug
  </button>
</template>
