<script setup>
import { ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute, useRouter } from 'vue-router'
import Modal from '~/components/Modal.vue'
import TooltipCard from '~/components/TooltipCard.vue'
import BtnClose from '~/components/BtnClose.vue'

const router = useRouter()

const route = useRoute()
const boardId = route.params.id
const cardId = route.params.cardId

const { getBoardById, getCardById, describeCard } = useBoardStore()

const card = ref()
const board = ref()
card.value = getCardById(boardId, cardId)
board.value = getBoardById(boardId)

const goToBoard = () => {
  router.push(`/board/${boardId}`)
}

const editing = ref(false)
const describeText = ref(card.value.description ?? '')
const describeError = ref(false)
const openEditor = () => {
  editing.value = true
}

const updateDescription = () => {
  const err = describeCard(boardId, cardId, describeText)
  if (err) {
    describeError.value = err
  } else {
    describeError.value = false
    editing.value = false
  }
}
</script>

<template>
  <Modal :routeToPush="`/board/${boardId}`">
    <div p5 bg-white relative>
      <TooltipCard class="tip" :boardId="boardId" :cardId="cardId" @deleteCard="goToBoard" />
      <h1>{{ card.title }}</h1>
      <div class="desc-edit" v-if="editing">
        <form @submit.prevent="updateDescription">
          <textarea v-model="describeText" bg-dark-1 bg-opacity-5 b-1 b-gray-2></textarea>
          <div flex items-center justify-between mt-2>
            <input type="submit" value="save" class="btnSmall" />
            <BtnClose />
          </div>
          <div text-sm color-red v-if="describeError">{{ describeError }}</div>
        </form>
      </div>
      <div class="desc" v-else>
        <div v-if="card.description">
          {{ card.description }}
        </div>
        <div v-else color-slate-5>(card has no description)</div>
        <button class="btnSmall" @click="openEditor" mt-8>edit description</button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
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
