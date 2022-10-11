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
  <div :class="isDragging ? 'lists dragging' : 'lists'" pt2 pb6>
    <div
      v-for="(id, i) in listOrder"
      class="list-outer droppable"
      :key="id"
      :data-pos="i"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @drop="drop">
      <div
        p2
        bg-slate-2
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
  </div>
</template>

<style scoped lang="scss">
.lists {
  max-width: 100%;
  overflow-x: auto;
  display: grid;
  grid-auto-columns: 300px;
  grid-template-rows: auto;
  grid-auto-flow: column;
  min-height: 50vh;
  .list-outer {
    position: relative;
    margin: 0 10px;
    width: 280px;
    &:after {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      content: '';
      position: absolute;
      pointer-events: none;
      z-index: 4;
    }
  }
}
.list-outer {
  position: relative;
}

.drag-over {
  outline: 3px dashed green;
}
</style>

<style lang="scss">
// .lists.dragging .list-outer:after {
//   pointer-events: all;
// }
.lists.dragging .list-outer.dragging-list:after {
  pointer-events: none;
}
</style>
