<script setup>
import BoardsGrid from '~/components/organisms/BoardsGrid.vue'
import PageWrap from '~/components/organisms/PageWrap.vue'
</script>

<template>
  <PageWrap title="Your Boards" :rows="true">
    <BoardsGrid />
  </PageWrap>
</template>
