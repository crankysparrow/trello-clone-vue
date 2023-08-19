<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import Card from '~/components/organisms/Card.vue'
import TextEditable from '~/components/atoms/TextEditable.vue'
import InputForm from '~/components/molecules/InputForm.vue'
import Button from '~/components/atoms/Button.vue'

const {
  deleteListFromBoard,
  moveCardWithinList,
  moveCardBetweenLists,
  renameList,
  addCardToBoard,
  getListById,
} = useBoardStore()

export interface Props {
  listId: string
  boardId: string
  pos: number
}

// TODO: drag a card over another list - card doesn't get outline style

const props = defineProps<Props>()

const list = computed(() => getListById(props.boardId, props.listId))

const isDragging = ref(false)
const draggingId = ref('')

const updateTitle = (newTitle: string) => {
  renameList(props.boardId, props.listId, newTitle)
}

const deleteList = () => {
  deleteListFromBoard(props.boardId, props.listId)
}

const onSubmitSuccess = (newCardId: string) => {
  nextTick(() => {
    let newCardEl = document.getElementById(`card-${newCardId}`)
    console.log(newCardEl)
    newCardEl instanceof HTMLElement && newCardEl.focus()
  })
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

  if (listId !== props.listId) {
    moveCardBetweenLists(props.boardId, listId, props.listId, +posToMoveFrom, +posToMoveTo)
  } else {
    moveCardWithinList(props.boardId, props.listId, +posToMoveFrom, +posToMoveTo)
  }
}
</script>

<template>
  <div class="list" v-if="list">
    <div class="list-title">
      <TextEditable
        :text="list.title"
        @updateText="updateTitle"
        @dragover="dragOver"
        @drop="drop"
        :data-pos="0" />
      <Button
        icon="delete"
        @click="deleteList"
        btnStyle="flat-dark"
        size="xs"
        label="Delete List"
        :showText="false" />
    </div>

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
      inputId="newcardform"
      :toggleable="true"
      placeholder="card title"
      labelSubmit="create"
      labelCancel="cancel"
      :data-pos="list.cardIds.length"
      @dragover="dragOver"
      @drop="drop"
      @submit="(newCardName) => addCardToBoard(list.boardId, list.id, newCardName)"
      @submitSuccess="onSubmitSuccess">
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
  @apply text-lg px2 flex justify-between items-center;
}
</style>
