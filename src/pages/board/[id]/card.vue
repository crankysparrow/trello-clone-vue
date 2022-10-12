<script setup>
import { ref } from 'vue'
import Modal from '~/components/Modal.vue'

const props = defineProps(['boardId'])
</script>

<template>
  <Modal :routeToPush="`/board/${boardId}`">
    <router-view></router-view>
  </Modal>
</template>
