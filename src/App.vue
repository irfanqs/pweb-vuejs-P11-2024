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
html,
body {
	height: 100%;
	margin: 0;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	flex: 1;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	padding: 1rem;
}
</style>
