<script setup lang="ts">
import { defineExpose, ref, inject } from 'vue'

const htmlId: () => string = inject('htmlId')!

export interface Props {
  label?: string
  id?: string
  type?: string
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  id: undefined,
  type: 'text',
})

const inputid = props.id || htmlId()

defineEmits(['update:modelValue'])

const inputEl = ref<HTMLInputElement | null>(null)

const focus = () => {
  inputEl.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <div class="input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      ref="inputEl"
      :id="inputid"
      :type="type"
      v-model="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)" />
  </div>
</template>

<style scoped>
.input {
  @apply flex items-center mb-2;
}

.input label {
  @apply mr3;
}

.input input {
  @apply flex-1;
}
</style>
