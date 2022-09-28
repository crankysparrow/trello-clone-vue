<script setup>
import { defineProps, computed } from 'vue'
import { useBoardStore } from '../../store/boardstore'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

// const props = defineProps({
//   id: String,
// })

const { getBoardById } = useBoardStore()

const board = computed(() => {
  // return boards.find((board) => id === board.id)
  return getBoardById(id)
})
</script>

<template>
  <div class="wrapper board">
    <h1>Board: {{ board.name }}</h1>
    <pre>
      {{ board }}
    </pre>
  </div>
</template>
