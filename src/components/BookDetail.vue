<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">{{ book?.title }}</h1>
		<div v-if="loading">
			<LoadingSpinner />
		</div>
		<div v-else-if="error">
			<ErrorMessage :message="error" />
		</div>
		<div v-else>
			<img :src="book.coverImage" alt="Cover Image" class="w-64 mb-4" />
			<p><strong>Pengarang:</strong> {{ book.author }}</p>
			<p><strong>Deskripsi:</strong> {{ book.description }}</p>
			<p><strong>Penerbit:</strong> {{ book.publisher }}</p>
			<p><strong>Tanggal Terbit:</strong> {{ new Date(book.publishedDate).toLocaleDateString() }}</p>
			<p><strong>Kategori:</strong> {{ book.tags.join(", ") }}</p>
			<p><strong>Jumlah Tersedia:</strong> {{ book.qty }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import LoadingSpinner from "./LoadingSpinner.vue";
import ErrorMessage from "./ErrorMessage.vue";
import axios from "axios";

export default defineComponent({
	name: "BookDetail",
	components: {
		LoadingSpinner,
		ErrorMessage,
	},
	setup() {
		const route = useRoute();
		const book = ref(null);
		const loading = ref(true);
		const error = ref(null);

		onMounted(async () => {
			try {
				// Request tanpa header Authorization
				const response = await axios.get(`http://localhost:4000/book/${route.params.id}`);
				book.value = response.data.data;
			} catch (err) {
				error.value = err.message;
			} finally {
				loading.value = false;
			}
		});

		return { book, loading, error };
	},
});
</script>
