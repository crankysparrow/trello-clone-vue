<script setup>
import { defineProps, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import TooltipList from '~/components/TooltipList.vue'
import Card from '~/components/Card.vue'
import CreateCard from '~/components/CreateCard.vue'
import TextEditable from '~/components/TextEditable.vue'

const { moveCardWithinList, moveCardBetweenLists, renameList } = useBoardStore()

const props = defineProps({
  list: { type: Object, required: true },
  pos: { type: Number, required: true },
})

const isDragging = ref(false)
const draggingId = ref('')

const updateTitle = (newTitle) => {
  renameList(props.list.boardId, props.list.id, newTitle)
}

function dragOver(e) {
  e.preventDefault()
  if (isDragging.value) {
    e.currentTarget.classList.add('drag-card-over')
  }
}

function dragStart(e) {
  if (!e.target.classList.contains('card-item')) return
  isDragging.value = true
  draggingId.value = e.target.id
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
    <!-- <h2>{{ list.title }}</h2> -->
    <TextEditable
      class="list-title"
      :title="list.title"
      @updateTitle="updateTitle"
      @dragover="dragOver"
      @drop="drop"
      :data-pos="0" />

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
          :id="`card-${cardId}`"
          :data-pos="i"
          :data-listId="list.id"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd" />
      </div>
    </div>

    <CreateCard
      pt1
      :boardId="list.boardId"
      :listId="list.id"
      :data-pos="list.cardIds.length"
      @dragover="dragOver"
      @drop="drop" />
  </div>
</template>

<style scoped lang="scss">
.card-outer {
  @apply py-1;
}

.card-item {
  @apply outline-2 outline-blue;
}
.card-outer.drag-card-over .card-item {
  outline-style: solid;
}
.tip-container {
  right: 0.5rem;
  top: 0.5rem;
}

.card-items {
  z-index: 2;
}

.list-title {
  @apply text-lg;
}
</style>
