<script setup>
import Button from '~/components/atoms/Button.vue'

const props = defineProps({
  labelSubmit: { type: String, default: 'submit' },
  labelCancel: { type: String, default: 'cancel' },
})

const emit = defineEmits(['submit', 'cancel'])

const cancelSubmit = (e) => {
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
