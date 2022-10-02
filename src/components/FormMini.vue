<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import BtnClose from '~/components/BtnClose.vue'
import BtnAdd from '~/components/BtnAdd.vue'

const props = defineProps({
  placeholder: { type: String, default: '' },
  submitVal: { type: String, default: 'submit' },
  btnName: { type: String, default: 'show form' },
})

const content = ref('')
const showForm = ref(false)

const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit', content.value)
  content.value = ''
  showForm.value = false
}
</script>

<template>
  <div class="form-mini">
    <form v-if="showForm" @submit.prevent="onSubmit" class="form-mini" relative p1>
      <input type="text" id="content" v-model="content" :placeholder="placeholder ?? ''" mb-1 w-full />
      <div flex items-center>
        <input type="submit" :value="submitVal" class="btnSmall" />
        <BtnClose @click="() => (showForm = false)"></BtnClose>
      </div>
    </form>
    <BtnAdd v-else @click="() => (showForm = true)">{{ btnName }}</BtnAdd>
  </div>
</template>
