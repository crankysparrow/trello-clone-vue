<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import DialogShade from './DialogShade.vue'
import Dialog from './Dialog.vue'
import Button from './Button.vue'
import FormBtns from './FormBtns.vue'

export interface Props {
  label: string
  showLabel?: boolean
  confirmTitle?: string
  confirmMessage?: string
  confirmBtnText?: string
  cancelBtnText?: string
}

withDefaults(defineProps<Props>(), {
  showLabel: true,
  label: 'Delete',
  confirmTitle: 'Are you sure?',
  confirmMessage: 'Are you sure?',
  confirmBtnText: 'confirm',
  cancelBtnText: 'cancel',
})

const show = ref(false)
const button = ref<typeof Button | null>(null)
const formBtns = ref<typeof FormBtns | null>(null)

const doDeletion = () => {
  emit('delete')
  show.value = false
}

const onCancel = () => {
  show.value = false
  button.value?.focus()
}

const emit = defineEmits(['delete'])

watch(show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      console.log(formBtns.value)
      formBtns.value?.cancelBtn?.focus()
    })
  }
})
</script>

<template>
  <Button
    :label="label"
    :showText="showLabel"
    @click="show = true"
    size="xs"
    color="flat-dark"
    icon="delete"
    ref="button"
    v-bind="$attrs">
  </Button>
  <Teleport to="body">
    <DialogShade v-if="show">
      <Dialog :title="confirmTitle" @close="onCancel" class="max-w-60">
        <div class="p4">
          <div class="mb-3">{{ confirmMessage }}</div>

          <FormBtns
            ref="formBtns"
            :labelCancel="cancelBtnText"
            :labelSubmit="confirmBtnText"
            @cancel="onCancel"
            @submit="doDeletion" />
        </div>
      </Dialog>
    </DialogShade>
  </Teleport>
</template>
