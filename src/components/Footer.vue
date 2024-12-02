<template>
	<footer class="footer py-2">
		<p>&copy; 2024 Perpustakaan Pemweb EZ</p>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Footer",
});
</script>

<style scoped>
.footer {
	background-color: #333;
	color: white;
	text-align: center;
	padding: 1rem;
	width: 100%;
}
</style>
