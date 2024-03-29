<script setup lang="ts">
import { ref } from 'vue'
import { type List } from '~/store/boardstore'

const isDragging = ref(false)

export interface props {
  lists: Record<string, List>
  listOrder: string[]
}
defineProps<props>()

const emit = defineEmits(['moveList', 'dragListStart', 'dragListEnd'])
defineExpose({ isDragging })

function dragOver(e: DragEvent) {
  if (isDragging.value) {
    e.preventDefault()
    let target = e.currentTarget
    if (target instanceof HTMLElement) {
      target.classList.add('drag-over')
    }
  }
}

function dragStart(e: DragEvent) {
  let target = e.target
  if (!(target instanceof HTMLElement) || !target.classList.contains('list-inner')) return

  target.parentElement?.classList.add('dragging-list')
  isDragging.value = true

  e.dataTransfer?.setData('text/plain', target.id)
  emit('dragListStart')
}

function dragEnd() {
  isDragging.value = false
  emit('dragListEnd')
}

function dragLeave(e: DragEvent) {
  if (isDragging.value) {
    let target = e.currentTarget
    if (target instanceof HTMLElement) {
      target.classList.remove('drag-over')
    }
  }
}

function drop(e: DragEvent) {
  console.log('list drop', e)
  if (!isDragging.value) return

  let target = e.currentTarget
  if (!(target instanceof HTMLElement)) return

  const id = e.dataTransfer?.getData('text/plain')
  if (!id) return

  const el = document.getElementById(id)
  if (!el || !el.classList.contains('list-inner')) return

  el.parentElement?.classList.remove('dragging-list')
  target.classList.remove('drag-over')

  const posToMoveTo = target.dataset['pos']
  const posToMoveFrom = el.dataset['pos']
  if (posToMoveTo && posToMoveFrom) {
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
.list-outer {
  @apply relative mx-a w-69;
}

.list-inner {
  @apply bg-slate-2;
}

.drag-over {
  /* outline: 3px dashed green; */
  @apply outline-emerald outline-dashed outline-3 bg-emerald-2 bg-opacity-10;
}
</style>
