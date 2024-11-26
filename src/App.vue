<template>
	<div id="app">
		<!-- Header -->
		<Header />

		<!-- Main Content -->
		<main>
			<RouterView />
		</main>

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
	name: "App",
	components: {
		Header,
		Footer,
	},
});
</script>

<style scoped>
#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	flex-grow: 1;
}
</style>
