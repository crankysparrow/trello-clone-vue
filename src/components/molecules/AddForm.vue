<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  placeholder: { type: String, default: '' },
  valueSubmit: { type: String, default: 'submit' },
  valueShow: { type: String, default: 'show form' },
  valueError: { default: false },
  modelValue: { default: false },
})

const content = ref('')
const input = ref(null)
const openButton = ref(null)

const emit = defineEmits(['submit', 'update:modelValue'])

const openForm = () => {
  emit('update:modelValue', 'true')
  setTimeout(() => input.value.focus())
}

const closeForm = () => {
  emit('update:modelValue', 'false')
  // setTimeout(() => openButton.value.focus())
}

const onSubmit = () => {
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <div class="addform">
    <form v-if="modelValue" @submit.prevent="onSubmit" class="addform-form">
      <input
        type="text"
        class="addform-input"
        id="content"
        v-model="content"
        ref="input"
        :placeholder="placeholder" />
      <div class="addform-btns">
        <button type="submit" class="btn mr1">{{ valueSubmit }}</button>
        <button class="btn-cancel" @click.prevent="closeForm">cancel</button>
      </div>
      <div class="text-error" mt1 v-if="valueError">{{ valueError }}</div>
    </form>
    <div v-else>
      <button class="addform-btn" @click="openForm" ref="openButton">
        <div i-carbon:add mr1></div>
        {{ valueShow }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.addform {
  @apply bg-slate3;
}
.addform-form {
  @apply p2;
}
.addform-input {
  @apply w-full;
}
.addform-btns {
  @apply mt-2;
}
.addform-btn {
  @apply btn-reset color-inherit fw-500 w-full flex items-center p2;
}

.addform-btn:hover,
.addform-btn:focus {
  @apply bg-slate7 text-white;
}
</style>
