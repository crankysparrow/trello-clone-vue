<script setup>
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue'
import BtnClose from '~/components/BtnClose.vue'
import BtnAdd from '~/components/BtnAdd.vue'

const props = defineProps({
  placeholder: { type: String, default: '' },
  submitVal: { type: String, default: 'submit' },
  btnName: { type: String, default: 'show form' },
  errorMsg: { default: false },
  modelValue: { default: false },
})

const content = ref('')
// const showForm = ref(false)

const emit = defineEmits(['submit', 'update:modelValue'])

const onSubmit = () => {
  emit('submit', content.value)
  content.value = ''
}
</script>

<template>
  <div class="miniform">
    <form v-if="modelValue" @submit.prevent="onSubmit" class="miniform-form">
      <input type="text" class="miniform-input" id="content" v-model="content" :placeholder="placeholder ?? ''" />
      <div flex items-center>
        <button type="submit" class="btn mr1">{{ submitVal }}</button>
        <button class="btn-cancel" @click.prevent="emit('update:modelValue', false)">cancel</button>
        <div class="text-error" v-if="errorMsg">{{ errorMsg }}</div>
      </div>
    </form>
    <slot name="button" v-else>
      <BtnAdd @click="emit('update:modelValue', true)">
        {{ btnName }}
      </BtnAdd>
    </slot>
  </div>
</template>

<style scoped>
.miniform-form {
  @apply relative p1;
}

.miniform-input {
  @apply mb-1 w-full;
}
</style>
