<script setup>
import FormBtns from './FormBtns.vue'
import Input from '../atoms/Input.vue'

const props = defineProps({
  labelSubmit: { type: String, default: 'submit' },
  labelCancel: { type: String, default: 'cancel' },
  inputId: { type: String, required: true },
  inputLabel: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  errorMessage: { type: String, default: '' },
})

const emit = defineEmits(['submit', 'update:modelValue', 'cancel'])
</script>

<template>
  <form class="input-form">
    <Input
      :id="inputId"
      :label="inputLabel"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <FormBtns
      :labelSubmit="labelSubmit"
      :labelCancel="labelCancel"
      @submit="$emit('submit')"
      @cancel="$emit('cancel')" />
  </form>
</template>

<style scoped>
.input-form {
  @apply p-4;
}
</style>
