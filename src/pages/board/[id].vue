<script setup>
import { ref } from 'vue'
import { useBoardStore } from '../../store/boardstore'
import { useRoute } from 'vue-router'
import CreateList from '~/components/CreateList.vue'
import Lists from '~/components/organisms/Lists.vue'
import List from '~/components/organisms/List.vue'
import PageWrap from '~/components/organisms/PageWrap.vue'

const route = useRoute()
const id = route.params.id
const { getBoardById, moveList } = useBoardStore()

const board = ref()
board.value = getBoardById(id)

const getList = (listId) => board.value.lists[listId]
</script>

<template>
  <router-view :boardId="id"></router-view>
  <PageWrap :title="board.name">
    <Lists
      v-if="board?.lists"
      :lists="board.lists"
      :listOrder="board.listOrder"
      @moveList="(posToMoveFrom, posToMoveTo) => moveList(id, posToMoveFrom, posToMoveTo)">
      <template #listItem="{ listId, i }">
        <List :list="getList(listId)" :pos="i" />
      </template>
      <template #lastCol>
        <CreateList :boardId="id" />
      </template>
    </Lists>
  </PageWrap>
</template>
