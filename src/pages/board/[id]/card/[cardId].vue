<script setup lang="ts">
import { computed } from 'vue'
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

const goToBoard = () => {
  router.push(`/board/${boardId}`)
}

const updateDescription = (newDescription: string) => {
  describeCard(boardId, cardId, newDescription)
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
</style>
