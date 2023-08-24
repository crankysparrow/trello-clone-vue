<script setup lang="ts">
import { computed } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute, useRouter } from 'vue-router'
import DialogShade from '~/components/DialogShade.vue'
import Dialog from '~/components/Dialog.vue'
import TextEditable from '~/components/TextEditable.vue'
import Button from '~/components/Button.vue'

const router = useRouter()
const route = useRoute()
const boardId = route.params.id as string
const cardId = route.params.cardId as string

const { getCardById, describeCard, renameCard, deleteCardFromBoard } = useBoardStore()

const card = computed(() => getCardById(boardId, cardId))

const goToBoard = () => {
  router.push(`/board/${boardId}`)
}

const updateDescription = (newDescription: string) => {
  describeCard(boardId, cardId, newDescription)
}

const updateTitle = (newTitle: string) => {
  renameCard(boardId, cardId, newTitle)
}

const deleteCard = () => {
  deleteCardFromBoard(boardId, cardId)
  goToBoard()
}
</script>

<template>
  <DialogShade v-if="card">
    <Dialog class="card" @close="goToBoard" :title="card.title">
      <template #title>
        <TextEditable
          :text="card.title"
          @updateText="updateTitle"
          inputId="card-title"
          placeholder="card title"
          color="dark"
          class="mt-3 mr-4" />
      </template>
      <div class="card__content">
        <TextEditable
          :text="card.description"
          @updateText="updateDescription"
          inputId="card-desc"
          :multiline="true"
          placeholder="card description"
          instructions="enter to save; shift+enter for line break"
          class="my2 min-h-30" />
        <Button
          icon="delete"
          color="flat-dark"
          size="xs"
          label="delete card"
          :showText="false"
          class="absolute bottom-1 right-1"
          @click="deleteCard" />
      </div>
    </Dialog>
  </DialogShade>
</template>

<style scoped>
.card {
  @apply bg-white relative w-sm;
}

.card__content {
  @apply px5 pb6 relative;
}
</style>
