<script setup lang="ts">
import { ref } from 'vue'
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

const doDeletion = () => {
  emit('delete')
  show.value = false
}

const onCancel = () => {
  show.value = false
  button.value?.focus()
}

const emit = defineEmits(['delete'])
</script>

<template>
  <Button
    :label="label"
    :showText="showLabel"
    @click="show = true"
    size="xs"
    btnStyle="flat-dark"
    icon="delete"
    ref="button">
  </Button>
  <Teleport to="body">
    <DialogShade v-if="show">
      <Dialog :title="confirmTitle" @close="onCancel" class="max-w-60">
        <div class="p4">
          <div class="mb-3">{{ confirmMessage }}</div>

          <FormBtns
            :labelCancel="cancelBtnText"
            :labelSubmit="confirmBtnText"
            @cancel="onCancel"
            @submit="doDeletion" />
        </div>
      </Dialog>
    </DialogShade>
  </Teleport>
</template>
