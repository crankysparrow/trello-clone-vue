<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
})

const isEditing = ref(false)
const editedTitle = ref(props.title)
const input = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['updateTitle'])

const updateTitle = () => {
  emit('updateTitle', editedTitle.value)
  isEditing.value = false
}

const editMode = () => {
  isEditing.value = true
  setTimeout(() => {
    input.value?.focus()
  })
}

const undoEdit = () => {
  editedTitle.value = props.title
  isEditing.value = false
}
</script>

<template>
  <div class="editable">
    <div class="editable-text" v-if="!isEditing" @click="editMode">
      {{ title }}
    </div>
    <div v-else>
      <input
        type="text"
        class="editable-edit"
        v-model="editedTitle"
        ref="input"
        @blur="updateTitle"
        @keyup.enter="updateTitle"
        v-click-outside="updateTitle"
        @keyup.esc="undoEdit" />
      <button
        v-if="editedTitle !== title"
        class="btn-reset editable-cancel"
        @click="undoEdit"
        aria-label="cancel edit title">
        <div i-carbon:close></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.editable {
  @apply min-h-10;
}

.editable-text,
.editable-edit {
  @apply py2 px1! lh-snug! w-full border-1 border-solid text-size-inherit!;
}

.editable-edit {
  @apply border-slate-4 py1! my1! pr6!;
}

.editable-cancel {
  @apply absolute right-2 text-7 top-4 op-50 hover:op-100;
}
</style>
