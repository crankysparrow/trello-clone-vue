<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'

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
    <Button type="button" @click="cancelSubmit" btn-style="subdued" class="mr2">
      {{ labelCancel }}
    </Button>
    <Button @click.prevent="$emit('submit')" type="submit">{{ labelSubmit }}</Button>
  </div>
</template>

<style scoped>
.form-btns {
  @apply py-0 text-right;
}
</style>
