<script setup lang="ts">
import { ref } from 'vue'
import { useBoardStore } from '~/store/boardstore'
import { useRoute } from 'vue-router'
import Lists from '~/components/organisms/Lists.vue'
import List from '~/components/organisms/List.vue'
import PageWrap from '~/components/organisms/PageWrap.vue'
import InputForm from '~/components/molecules/InputForm.vue'

const route = useRoute()
const id = route.params.id as string
const { getBoardById, moveList, addListToBoard } = useBoardStore()

const board = ref()
board.value = getBoardById(id)

const newListTitle = ref('')
const newListForm = ref(null)

const getList = (listId: string) => board.value.lists[listId]
</script>

<template>
  <router-view :boardId="id"></router-view>
  <PageWrap :title="board.name">
    <Lists
      v-if="board?.lists"
      :lists="board.lists"
      :listOrder="board.listOrder"
      @moveList="(posToMoveFrom: string, posToMoveTo: string) => moveList(id, +posToMoveFrom, +posToMoveTo)">
      <template #listItem="{ listId, i }">
        <List :list="getList(listId)" :pos="i" />
      </template>
      <template #lastCol>
        <InputForm
          ref="newListForm"
          placeholder="list title"
          :toggleable="true"
          labelSubmit="create"
          labelCancel="cancel"
          v-model="newListTitle"
          @submit="() => addListToBoard(id, newListTitle)">
          <template #toggle>
            <div i-carbon:add class="mr1"></div>
            add list
          </template>
        </InputForm>
      </template>
    </Lists>
  </PageWrap>
</template>
