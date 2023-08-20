<script setup lang="ts">
import { useBoardStore } from '~/store/boardstore'

const { getCardById } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
  cardId: { type: String, required: true },
})

const card = getCardById(props.boardId, props.cardId)
</script>

<template>
  <router-link :to="{ name: 'card', params: { id: boardId, cardId: cardId } }" class="card">
    {{ card.title }}
  </router-link>
</template>

<style scoped>
.card {
  @apply block px3 py1 bg-slate-1 hover:bg-blue-2 text-slate-9;
}
</style>
