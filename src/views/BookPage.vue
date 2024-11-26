<template>
	<div>
		<h2>Detail Buku</h2>

		<LoadingSpinner v-if="isLoading" />
		<ErrorMessage v-if="error" :message="error" />

		<div v-if="!isLoading && !error">
			<p>Judul: {{ book.title }}</p>
			<p>Pengarang: {{ book.author }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

export default defineComponent({
	name: "BookPage",
	components: {
		LoadingSpinner,
		ErrorMessage,
	},
	setup() {
		const book = ref(null);
		const isLoading = ref(true);
		const error = ref("");

		const fetchBook = async () => {
			try {
				const id = 1; // Ganti dengan ID dinamis dari rute.
				const response = await fetch(`http://localhost:5000/api/book/${id}`);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				book.value = await response.json();
			} catch (err: any) {
				error.value = err.message;
			} finally {
				isLoading.value = false;
			}
		};

		onMounted(fetchBook);

		return { book, isLoading, error };
	},
});
</script>
