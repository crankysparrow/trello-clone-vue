<script setup>
const props = defineProps({
  label: { type: String, required: false },
  id: { type: String, required: true },
  type: { type: String, required: false, default: 'text' },
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
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
