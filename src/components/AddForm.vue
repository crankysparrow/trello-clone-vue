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

const emit = defineEmits(['submit', 'update:modelValue'])
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
        :placeholder="placeholder" />
      <div class="addform-btns">
        <button type="submit" class="btn mr1">{{ valueSubmit }}</button>
        <button class="btn-cancel" @click.prevent="emit('update:modelValue', false)">cancel</button>
      </div>
      <div class="text-error" mt1 v-if="valueError">{{ valueError }}</div>
    </form>
    <div v-else>
      <button class="addform-btn" @click="emit('update:modelValue', 'true')">
        <div i-carbon:add mr1></div>
        {{ valueShow }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.addform-input {
  @apply w-full;
}
.addform-btns {
  @apply mt-2;
}
.addform-btn {
  @apply btn text-dark-1 fw-500 bg-slate1 bg-op80 w-full flex items-center;
}

.addform-btn:hover,
.addform-btn:focus {
  @apply bg-slate3;
}
</style>
