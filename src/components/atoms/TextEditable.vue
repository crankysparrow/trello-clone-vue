<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import Button from '~/components/atoms/Button.vue'

export interface Props {
  text: string
  multiline?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  multiline: false,
})

const isEditing = ref(false)
const editedText = ref(props.text)
const editedTextHtml = computed(() => {
  if (props.multiline) {
    return editedText.value.replace(/\n/g, '<br>')
  }
  return editedText.value
})
const input = ref<HTMLInputElement | null>(null)
const cancelButton = ref<HTMLButtonElement | null>(null)

const emit = defineEmits(['updateText'])

const doUpdateText = () => {
  let text = editedText.value
  // if (props.multiline) {
  //   text = text.replace(/\n/g, '<br>')
  // }
  emit('updateText', text)
  isEditing.value = false
}

const editMode = () => {
  isEditing.value = true
  nextTick(() => {
    input.value?.focus()
  })
}

const undoEdit = () => {
  editedText.value = props.text
  isEditing.value = false
}

const onBlur = (e: FocusEvent) => {
  if (e.relatedTarget === cancelButton.value) return
  emit('updateText', editedText.value)
  isEditing.value = false
}
</script>

<template>
  <div :class="`editable${multiline ? ' multiline' : ''}`">
    <div class="editable-text" v-if="!isEditing" @click="editMode">
      <span v-if="text.length > 0" v-html="editedTextHtml" />
      <span v-else-if="placeholder" class="placeholder">{{ placeholder }}</span>
    </div>
    <div v-else @keyup.esc.stop="undoEdit">
      <div v-if="multiline" class="textarea-wrap grid">
        <span
          class="edited-sizer col-start-1 row-start-1 invisible opacity-0"
          v-html="editedTextHtml" />
        <textarea
          class="editable-edit col-start-1 row-start-1 my-0"
          ref="input"
          v-model="editedText"
          @blur="onBlur"
          @keydown.enter.exact="doUpdateText"
          v-click-outside="doUpdateText" />
      </div>
      <input
        v-else
        type="text"
        class="editable-edit"
        v-model="editedText"
        ref="input"
        @blur="onBlur"
        @keyup.enter="doUpdateText"
        v-click-outside="doUpdateText" />
      <Button
        ref="cancelButton"
        btnStyle="flat-dark"
        size="xs"
        class="editable-cancel"
        @click="undoEdit"
        v-if="editedText !== text"
        icon="close"
        label="cancel edit title"
        :showText="false" />
    </div>
  </div>
</template>

<style scoped>
.editable {
  @apply min-h-10 relative;
}

.editable-text,
.editable-edit,
.edited-sizer {
  @apply lh-snug! w-full text-size-inherit! relative;
  @apply py2 pr6 px1 border-1 border-solid border-transparent;
}

.editable-edit {
  @apply border-slate-4;
}

.editable-cancel {
  @apply absolute top-0 right-1 op-50 hover:op-100;
}

.placeholder {
  @apply opacity-50;
}
</style>
