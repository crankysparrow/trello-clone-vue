<script setup lang="ts">
import FormBtns from '~/components/FormBtns.vue'
import ClickyBox from '~/components/ClickyBox.vue'
import { onMounted, ref, nextTick } from 'vue'

export interface Props {
  labelSubmit?: string
  labelCancel?: string
  inputId: string
  inputLabel?: string
  focusOnMount?: boolean
  modelValue?: string
  toggleable?: boolean
  errorMessage?: string | false
  onSubmit: (text: string) => any
}

const props = withDefaults(defineProps<Props>(), {
  labelSubmit: 'submit',
  labelCancel: 'cancel',
  inputLabel: '',
  focusOnMount: true,
  modelValue: '',
  toggleable: false,
  errorMessage: false,
})

const input = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const shown = ref(props.toggleable ? false : true)
const toggleBox = ref<typeof ClickyBox | null>(null)
const error = ref<Error | null>(null)

onMounted(() => {
  if (props.focusOnMount && !props.toggleable) {
    input.value?.focus()
  }
})

const show = () => {
  shown.value = true
  nextTick(() => input.value?.focus())
}

const hide = () => {
  inputText.value = ''
  error.value = null
  shown.value = false
  nextTick(() => toggleBox.value?.focus())
}

const onCancel = () => {
  emit('cancel')
  if (props.toggleable) {
    hide()
  }
}

const onSubmit = () => {
  if (props.onSubmit) {
    let res = props.onSubmit(inputText.value)
    if (res instanceof Error) {
      error.value = res
      input.value?.focus()
      emit('submitError', res)
    } else {
      emit('submitSuccess', res)
      if (props.toggleable) {
        hide()
      }
    }
  }
}

const emit = defineEmits(['submitSuccess', 'submitError', 'cancel'])
defineExpose({ show, hide })
</script>

<template>
  <div class="input-form-wrap">
    <ClickyBox v-if="toggleable && !shown" @click="show" size="sm" color="light" ref="toggleBox">
      <slot name="toggle">
        <span class="text-sm text-gray-800">show</span>
      </slot>
    </ClickyBox>
    <form class="input-form" v-if="(toggleable && shown) || !toggleable" @keyup.escape="onCancel">
      <input type="text" :id="inputId" v-model="inputText" ref="input" class="input-form-input" />
      <div class="text-error" v-if="error">{{ error.message }}</div>
      <FormBtns
        :labelSubmit="labelSubmit"
        :labelCancel="labelCancel"
        @submit="onSubmit"
        @cancel="onCancel" />
    </form>
  </div>
</template>

<style scoped>
.input-form-wrap {
  @apply bg-slate-3 bg-opacity-60;
}

.input-form {
  @apply py-4 px-2;
}

.input-form-input {
  @apply w-full text-sm mb-2 py-2;
}
</style>
