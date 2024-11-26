<template>
	<div class="spinner">
		<p>Loading...</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "LoadingSpinner",
});
</script>

<style scoped>
.spinner {
	text-align: center;
	margin: 20px 0;
}
</style>
