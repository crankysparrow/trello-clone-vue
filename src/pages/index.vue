<script setup lang="ts">
import BoardsGrid from '~/components/BoardsGrid.vue'
import PageWrap from '~/components/PageWrap.vue'
</script>

<template>
  <PageWrap title="Your Boards" :rows="true">
    <BoardsGrid />
  </PageWrap>
</template>
