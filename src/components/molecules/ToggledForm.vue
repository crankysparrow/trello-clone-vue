<script setup lang="ts">
import { ref } from 'vue'
import ClickyBox from '~/components/atoms/ClickyBox.vue'

const show = ref(false)
</script>

<template>
  <ClickyBox @click="show = !show" v-if="!show" color="light" size="sm">
    <slot name="button">Show</slot>
  </ClickyBox>
  <slot v-else name="content"></slot>
</template>
