<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import Card from '~/components/organisms/Card.vue'
import TextEditable from '~/components/atoms/TextEditable.vue'
import InputForm from '~/components/molecules/InputForm.vue'

const { moveCardWithinList, moveCardBetweenLists, renameList, addCardToBoard } = useBoardStore()

const props = defineProps({
  list: { type: Object, required: true },
  pos: { type: Number, required: true },
})

const isDragging = ref(false)
const draggingId = ref('')
const newCardName = ref('')

const updateTitle = (newTitle: string) => {
  renameList(props.list.boardId, props.list.id, newTitle)
}

function dragOver(e: DragEvent) {
  e.preventDefault()
  if (isDragging.value && e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.add('drag-card-over')
  }
}

function dragStart(e: DragEvent) {
  let target = e.target
  if (!(target instanceof HTMLElement) || !target.classList.contains('card-item')) return

  isDragging.value = true
  draggingId.value = target.id
  e.dataTransfer?.setData('text/plain', target.id)
}

function dragEnd() {
  isDragging.value = false
}

function dragLeave(e: DragEvent) {
  if (isDragging.value && e.currentTarget instanceof HTMLElement) {
    e.currentTarget.classList.remove('drag-card-over')
  }
}

function drop(e: DragEvent) {
  let target = e.currentTarget
  if (!(target instanceof HTMLElement)) return

  const id = e.dataTransfer?.getData('text/plain')
  if (!id) return

  const el = document.getElementById(id)
  if (!el || !(el instanceof HTMLElement)) return
  target.classList.remove('drag-card-over')

  const listId = el.dataset['listid']
  const posToMoveFrom = el.dataset['pos']
  const posToMoveTo = target.dataset['pos']

  if (!listId || !posToMoveFrom || !posToMoveTo) return

  if (listId !== props.list.id) {
    moveCardBetweenLists(props.list.boardId, listId, props.list.id, +posToMoveFrom, +posToMoveTo)
  } else {
    moveCardWithinList(props.list.boardId, props.list.id, +posToMoveFrom, +posToMoveTo)
  }
}
</script>

<template>
  <div class="list" v-if="list">
    <TextEditable
      class="list-title px2"
      :title="list.title"
      @updateTitle="updateTitle"
      @dragover="dragOver"
      @drop="drop"
      :data-pos="0" />

    <div class="card-items">
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

    <InputForm
      :toggleable="true"
      labelSubmit="create"
      labelCancel="cancel"
      v-model="newCardName"
      :data-pos="list.cardIds.length"
      @dragover="dragOver"
      @drop="drop"
      @submit="() => addCardToBoard(list.boardId, list.id, newCardName)">
      <template #toggle>
        <div i-carbon:add class="mr1"></div>
        add card
      </template>
    </InputForm>
  </div>
</template>

<style scoped lang="css">
.card-outer {
  @apply py-1 px-2;
}

.card-item {
  @apply outline-2 outline-blue;
}

.card-outer.drag-card-over .card-item {
  outline-style: solid;
}

.card-items {
  @apply relative z2;
}

.list-title {
  @apply text-lg;
}
</style>
