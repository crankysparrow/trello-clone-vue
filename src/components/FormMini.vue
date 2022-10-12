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
  <div class="form-mini">
    <form v-if="modelValue" @submit.prevent="onSubmit" class="form-mini" relative p1>
      <input type="text" id="content" v-model="content" :placeholder="placeholder ?? ''" mb-1 w-full />
      <div flex items-center>
        <input type="submit" :value="submitVal" class="btnSmall" />
        <BtnClose @click.prevent="emit('update:modelValue', false)"></BtnClose>
        <div text-sm text-red v-if="errorMsg">{{ errorMsg }}</div>
      </div>
    </form>
    <slot name="button" v-else>
      <BtnAdd @click="emit('update:modelValue', true)">
        {{ btnName }}
      </BtnAdd>
    </slot>
  </div>
</template>
