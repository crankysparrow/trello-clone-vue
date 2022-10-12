<script setup>
import { ref } from 'vue'
import { useBoardStore } from '../../store/boardstore'
import { useRoute } from 'vue-router'
import CreateList from '~/components/CreateList.vue'
import Lists from '~/components/Lists.vue'
import List from '~/components/List.vue'

const route = useRoute()
const id = route.params.id
const { getBoardById, moveList } = useBoardStore()

const board = ref()
board.value = getBoardById(id)

const getList = (listId) => board.value.lists[listId]
</script>

<template>
  <div class="board" relative w-full>
    <router-view :boardId="id"></router-view>
    <div container mx-auto p4 pb0 w-full>
      <h1 mb-3>Board: {{ board?.name }}</h1>
    </div>

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
  </div>
</template>
