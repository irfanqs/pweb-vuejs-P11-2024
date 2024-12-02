<template>
	<div class="error">
		<p>Error: {{ message }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ErrorMessage",
	props: {
		message: {
			type: String,
			required: true,
		},
	},
});
</script>

<style scoped>
.error {
	color: red;
	text-align: center;
	margin: 20px 0;
}
</style>
