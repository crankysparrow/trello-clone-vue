<script setup lang="ts">
import { computed, nextTick } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute, useRouter } from 'vue-router'
import Lists from '~/components/organisms/Lists.vue'
import List from '~/components/organisms/List.vue'
import PageWrap from '~/components/organisms/PageWrap.vue'
import InputForm from '~/components/molecules/InputForm.vue'
import TextEditable from '~/components/atoms/TextEditable.vue'
import Button from '~/components/atoms/Button.vue'
import Debug from '~/components/Debug.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const boardStore = useBoardStore()
// const test = ref(false)
// const testDeleteListId = ref('')
// const { getBoardById, moveList, addListToBoard } = useBoardStore()

const board = computed(() => boardStore.getBoardById(id))

const updateBoardTitle = (newTitle: string) => {
  if (newTitle.length > 0) boardStore.renameBoard(id, newTitle)
}

const deleteBoard = () => {
  boardStore.deleteBoard(id)
  nextTick(() => router.push('/'))
}
</script>

<template>
  <router-view :boardId="id"></router-view>
  <PageWrap :title="board.name" v-if="board">
    <template #title>
      <div class="board-title-wrap">
        <TextEditable
          :text="board.name"
          @updateText="updateBoardTitle"
          inputId="board-name"
          class="text-2xl font-bold" />

        <Button @click="deleteBoard" btnStyle="error" icon="delete" label="delete board" />
        <!-- <button @click="deleteBoard" class="text-error">
          <div i-carbon:trash-can></div>
          delete board
        </button> -->
      </div>
    </template>
    <Lists
      v-if="board?.lists"
      :lists="board.lists"
      :listOrder="board.listOrder"
      @moveList="(posToMoveFrom: string, posToMoveTo: string) => boardStore.moveList(id, +posToMoveFrom, +posToMoveTo)">
      <template #listItem="{ listId, i }">
        <List :boardId="id" :listId="listId" :pos="i" />
      </template>
      <template #lastCol>
        <InputForm
          class="self-start"
          ref="newListForm"
          placeholder="list title"
          :toggleable="true"
          inputId="new-list"
          labelSubmit="create"
          labelCancel="cancel"
          @submit="(newListTitle) => boardStore.addListToBoard(id, newListTitle)">
          <template #toggle>
            <div i-carbon:add class="mr1"></div>
            add list
          </template>
        </InputForm>
      </template>
    </Lists>

    <Debug :boardId="id" />
  </PageWrap>
</template>

<style scoped>
.board-title-wrap {
  @apply flex justify-between items-center;
}
</style>
