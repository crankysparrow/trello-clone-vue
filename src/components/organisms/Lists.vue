<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const isDragging = ref(false)
const props = defineProps({
  lists: { type: Object, required: true },
  listOrder: { type: Array, required: true },
})

const emit = defineEmits(['moveList'])

function dragOver(e) {
  if (isDragging.value) {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }
}

function dragStart(e) {
  if (!e.target.classList.contains('list-inner')) return
  e.target.parentElement.classList.add('dragging-list')
  isDragging.value = true
  e.dataTransfer.setData('text/plain', e.target.id)
}

function dragEnd(e) {
  isDragging.value = false
}

function dragLeave(e) {
  if (isDragging.value) {
    e.currentTarget.classList.remove('drag-over')
  }
}

function drop(e) {
  const posToMoveTo = e.currentTarget.dataset['pos']

  if (isDragging.value && posToMoveTo) {
    const id = e.dataTransfer.getData('text/plain')
    const el = document.getElementById(id)
    el.parentElement.classList.remove('dragging-list')
    e.currentTarget.classList.remove('drag-over')
    const posToMoveFrom = el.dataset['pos']
    emit('moveList', posToMoveFrom, posToMoveTo)
  }
}
</script>

<template>
  <div
    v-for="(id, i) in listOrder"
    class="list-outer"
    :key="id"
    :data-pos="i"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="drop">
    <div
      class="list-inner"
      draggable="true"
      :id="`list-${id}`"
      :data-pos="i"
      @dragstart="dragStart"
      @dragend="dragEnd">
      <slot name="listItem" :listId="id" :i="i"></slot>
    </div>
  </div>
  <slot name="lastCol"></slot>
</template>

<style scoped>
.lists {
  @apply pt2 pb6 max-w-full overflow-x-auto grid grid-flow-col;
  grid-auto-columns: 18rem;
}

.list-outer {
  @apply relative mx-a w-69;
}

.list-inner {
  @apply bg-slate-2;
}

.drag-over {
  outline: 3px dashed green;
}
</style>
