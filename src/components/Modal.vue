<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['routeToPush'])
const router = useRouter()

const onClickOutside = () => {
  router.push(props.routeToPush)
}
</script>

<template>
  <div class="modal-outer">
    <div bg-white p4 class="modal-inner" v-click-outside="onClickOutside">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-outer {
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-inner {
  width: Min(90%, 600px);
  height: Min(90%, 600px);
}
</style>
