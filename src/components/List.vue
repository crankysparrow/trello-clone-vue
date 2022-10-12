<script setup>
import { defineProps, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import TooltipList from '~/components/TooltipList.vue'
import Card from '~/components/Card.vue'
import CreateCard from '~/components/CreateCard.vue'

const { moveCardWithinList, moveCardBetweenLists } = useBoardStore()

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

  if (posToMoveTo) {
    const id = e.dataTransfer.getData('text/plain')
    const el = document.getElementById(id)
    e.currentTarget.classList.remove('drag-card-over')

    const listId = el.dataset['listid']

    const posToMoveFrom = el.dataset['pos']

    if (listId !== props.list.id) {
      moveCardBetweenLists(props.list.boardId, listId, props.list.id, posToMoveFrom, posToMoveTo)
    } else {
      moveCardWithinList(props.list.boardId, props.list.id, posToMoveFrom, posToMoveTo)
    }
  }
}
</script>

<template>
  <div class="list" v-if="list">
    <h2>{{ list.title }}</h2>

    <TooltipList :listId="list.id" :boardId="list.boardId" :position="pos" class="tip-container" />

    <div class="card-items relative">
      <div
        v-if="list.cardIds.length === 0"
        p2
        class="card-outer"
        :data-pos="0"
        @dragover="dragOver"
        dragleave="dragLeave"
        @drop="drop" />
      <div
        v-for="(cardId, i) in list.cardIds"
        class="card-outer outline-2 outline-blue"
        :data-pos="i"
        :key="cardId"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop">
        <Card
          class="card-item"
          :cardId="cardId"
          :boardId="list.boardId"
          :id="`card-${cardId}`"
          :data-pos="i"
          :data-listId="list.id"
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
  outline-style: solid;
}
.tip-container {
  right: 0.5rem;
  top: 0.5rem;
}

.card-items {
  z-index: 2;
}
</style>
