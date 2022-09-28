<script setup>
import TopBar from './components/TopBar.vue'
</script>

<template>
	<div>
		<top-bar></top-bar>
		<router-view></router-view>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
</style>
