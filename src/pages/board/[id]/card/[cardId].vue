<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute, useRouter } from 'vue-router'
import DialogShade from '~/components/DialogShade.vue'
import Dialog from '~/components/Dialog.vue'
import TextEditable from '~/components/TextEditable.vue'

const router = useRouter()
const route = useRoute()
const boardId = route.params.id as string
const cardId = route.params.cardId as string

const { getCardById, describeCard } = useBoardStore()

const card = computed(() => getCardById(boardId, cardId))
// const board = ref(getBoardById(boardId))

const goToBoard = () => {
  router.push(`/board/${boardId}`)
}

const describeError = ref<false | string>(false)

// const updateDescription = () => {
//   const err = describeCard(boardId, cardId, describeText.value)
//   if (err) {
//     describeError.value = err
//   } else {
//     describeError.value = false
//     editing.value = false
//   }
// }

const updateDescription = (newDescription: string) => {
  const err = describeCard(boardId, cardId, newDescription)
  if (err) {
    describeError.value = err
  } else {
    describeError.value = false
  }
}
</script>

<template>
  <DialogShade>
    <Dialog class="card" @close="goToBoard" :title="card.title">
      <div class="card__content">
        <TextEditable
          :text="card.description"
          @updateText="updateDescription"
          inputId="card-desc"
          :multiline="true"
          placeholder="card description"
          class="my2" />
        <!-- <form @submit.prevent="updateDescription" v-if="editing">
          <textarea v-model="describeText" bg-dark-1 bg-opacity-5 b-1 b-gray-2></textarea>

          <input type="submit" value="save" class="btn" />
          <button class="btn-cancel mr2" @click.prevent="editing = false">cancel</button>

          <div text-sm color-red v-if="describeError">{{ describeError }}</div>
        </form> -->

        <!-- <div v-else>
          <div v-if="card.description">
            {{ card.description }}
          </div>
          <div v-else class="color-slate-5 mt-3 text-sm">(card has no description)</div>
          <button class="btn mt-4" @click="editing = true">edit description</button>
        </div> -->
      </div>
    </Dialog>
  </DialogShade>
</template>

<style scoped>
.card {
  @apply bg-white relative w-sm;
}

.card__content {
  @apply px5 relative;
}

.desc-edit textarea {
  width: 100%;
  display: block;
}
</style>
