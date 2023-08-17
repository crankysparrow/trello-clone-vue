<script setup lang="ts">
import FormBtns from './FormBtns.vue'
import Input from '~/components/atoms/Input.vue'
import ClickyBox from '~/components/atoms/ClickyBox.vue'
import { onMounted, ref, defineEmits, nextTick } from 'vue'

export interface Props {
  labelSubmit?: string
  labelCancel?: string
  inputId?: string
  inputLabel?: string
  focusOnMount?: boolean
  modelValue?: string
  toggleable?: boolean
  errorMessage?: string | false
  onSubmit: <T>() => void | Error | T
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

const input = ref<typeof Input | null>(null)
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
  shown.value = false
  nextTick(() => toggleBox.value?.focus())
}

const onCancel = () => {
  emit('cancel')
  emit('update:modelValue', '')
  if (props.toggleable) {
    shown.value = false
  }
}

const onSubmit = () => {
  if (props.onSubmit) {
    let res = props.onSubmit()
    if (res instanceof Error) {
      error.value = res
      input.value?.focus()
      emit('submitError', res)
    } else {
      error.value = null
      emit('update:modelValue', '')
      emit('submitSuccess', res)
      if (props.toggleable) {
        shown.value = false
      }
    }
  }
}

const emit = defineEmits(['submitSuccess', 'submitError', 'update:modelValue', 'cancel'])
defineExpose({ show, hide })
</script>

<template>
  <div>
    <ClickyBox v-if="toggleable && !shown" @click="show" size="sm" color="light" ref="toggleBox">
      <slot name="toggle">
        <span class="text-sm text-gray-800">show</span>
      </slot>
    </ClickyBox>
    <form class="input-form" v-if="(toggleable && shown) || !toggleable" @keyup.escape="hide">
      <Input
        ref="input"
        :id="inputId"
        :label="inputLabel"
        v-model="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" />
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
.input-form {
  @apply py-4 px-2;
}
</style>
