<script setup lang="ts">
import { ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute, useRouter } from 'vue-router'
import DialogShade from '~/components/atoms/DialogShade.vue'

const router = useRouter()
const route = useRoute()
const boardId = route.params.id as string
const cardId = route.params.cardId as string

const { getCardById, describeCard } = useBoardStore()

const card = ref(getCardById(boardId, cardId))
// const board = ref(getBoardById(boardId))

const goToBoard = () => {
  router.push(`/board/${boardId}`)
}

const editing = ref(false)
const describeText = ref(card.value.description ?? '')
const describeError = ref<false | string>(false)

const updateDescription = () => {
  const err = describeCard(boardId, cardId, describeText.value)
  if (err) {
    describeError.value = err
  } else {
    describeError.value = false
    editing.value = false
  }
}
</script>

<template>
  <DialogShade>
    <div class="card" v-click-outside="goToBoard">
      <!-- <TooltipCard class="tip" :boardId="boardId" :cardId="cardId" @deleteCard="goToBoard" /> -->
      <h2 class="card__title">{{ card.title }}</h2>
      <div class="card__content">
        <form @submit.prevent="updateDescription" v-if="editing">
          <textarea v-model="describeText" bg-dark-1 bg-opacity-5 b-1 b-gray-2></textarea>

          <input type="submit" value="save" class="btn" />
          <button class="btn-cancel mr2" @click.prevent="editing = false">cancel</button>

          <div text-sm color-red v-if="describeError">{{ describeError }}</div>
        </form>

        <div v-else>
          <div v-if="card.description">
            {{ card.description }}
          </div>
          <div v-else color-slate-5>(card has no description)</div>
          <button class="btn" @click="editing = true" mt-4>edit description</button>
        </div>
      </div>
    </div>
  </DialogShade>
</template>

<style scoped>
.card {
  @apply bg-white relative w-sm h-sm;
}

.card__title {
  @apply bg-slate-2 p5 border-b-1 border-slate-3;
}

.card__content {
  @apply px5;
}
.tip {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.desc-edit textarea {
  width: 100%;
  display: block;
}
</style>
