<script setup>
import { defineProps, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'

const { getCardById } = useBoardStore()

const props = defineProps({
  boardId: { type: String, required: true },
  cardId: { type: String, required: true },
})

const card = getCardById(props.boardId, props.cardId)
</script>

<template>
  <div class="card" p1 bg-slate-1 mb-2>
    {{ card.title }}
  </div>
</template>
