<script setup lang="ts">
import { computed, nextTick } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useUserStore } from '~/store/userstore'
import { useRoute, useRouter } from 'vue-router'
import Lists from '~/components/Lists.vue'
import List from '~/components/List.vue'
import PageWrap from '~/components/PageWrap.vue'
import InputForm from '~/components/InputForm.vue'
import TextEditable from '~/components/TextEditable.vue'
import Button from '~/components/Button.vue'
import Debug from '~/components/Debug.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const boardStore = useBoardStore()
const userStore = useUserStore()

const board = computed(() => boardStore.getBoardById(id))
const userName = computed(() => userStore.name)

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
        <div>
          <h2>
            <TextEditable
              :text="board.name"
              @updateText="updateBoardTitle"
              inputId="board-name"
              class="font-500" />
          </h2>
          <div v-if="userName" class="text-sm ml-2 mt-1">created by {{ userName }}</div>
        </div>

        <Button @click="deleteBoard" btnStyle="error" icon="delete" label="delete board" />
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
