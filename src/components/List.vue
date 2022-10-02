<script setup>
import { defineProps, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import ListTooltip from '~/components/ListTooltip.vue'
import Card from '~/components/Card.vue'
import CreateCard from '~/components/CreateCard.vue'

const { moveCard } = useBoardStore()

const props = defineProps({
  list: { type: Object, required: true },
  pos: { type: Number, required: true },
})

const isDragging = ref(false)

function dragOver(e) {
  e.preventDefault()
  if (isDragging.value) {
    e.currentTarget.classList.add('drag-card-over')
  }
}

function dragStart(e) {
  if (!e.target.classList.contains('card-item')) return
  isDragging.value = true
  e.dataTransfer.setData('text/plain', e.target.id)
  // e.target.parentElement.classList.add('dragging-list')
}

function dragEnd(e) {
  isDragging.value = false
}

function dragLeave(e) {
  if (isDragging.value) {
    e.currentTarget.classList.remove('drag-card-over')
  }
}

function drop(e) {
  const posToMoveTo = e.currentTarget.dataset['pos']
  if (isDragging.value && posToMoveTo) {
    const id = e.dataTransfer.getData('text/plain')
    const el = document.getElementById(id)

    e.currentTarget.classList.remove('drag-card-over')

    const posToMoveFrom = el.dataset['pos']
    moveCard(props.list.boardId, props.list.id, posToMoveFrom, posToMoveTo)
  }
  // const posToMoveFrom = e.dataTransfer.getData('text/plain')
  // emit('moveList', posToMoveFrom, posToMoveTo)
}
</script>

<template>
  <div class="list" v-if="list">
    <h2>{{ list.title }}</h2>

    <ListTooltip :listId="list.id" :boardId="list.boardId" :position="pos" class="tip-container" />

    <div class="card-items relative">
      <div
        v-for="(cardId, i) in list.cardIds"
        class="card-outer"
        :data-pos="i"
        :key="cardId"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop">
        <Card
          class="card-item"
          :cardId="cardId"
          :boardId="list.boardId"
          :id="`card-${i}`"
          :data-pos="i"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd" />
      </div>
    </div>

    <CreateCard :boardId="list.boardId" :listId="list.id" />
  </div>
</template>

<style scoped lang="scss">
.card-outer.drag-card-over {
  outline: 2px solid blue;
}
.tip-container {
  right: 0.5rem;
  top: 0.5rem;
}

.card-items {
  z-index: 2;
}
</style>
