<script setup lang="ts">
import Button from '~/components/Button.vue'

defineProps({
  labelSubmit: { type: String, default: 'submit' },
  labelCancel: { type: String, default: 'cancel' },
})

const emit = defineEmits(['submit', 'cancel'])

const cancelSubmit = () => {
  emit('cancel')
}
</script>

<template>
  <div class="form-btns">
    <Button
      type="button"
      @click="cancelSubmit"
      btnStyle="flat-dark"
      class="mr2"
      :label="labelCancel" />
    <Button
      @click.prevent="$emit('submit')"
      btnStyle="primary"
      :label="labelSubmit"
      type="submit" />
  </div>
</template>

<style scoped>
.form-btns {
  @apply py-0 text-right;
}
</style>
