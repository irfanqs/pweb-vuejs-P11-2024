<template>
	<div>
		<h1 class="text-2xl font-bold mb-4 text-center">Daftar Buku</h1>
		<div v-if="loading" class="text-center">Loading books...</div>
		<div v-if="error" class="text-red-500">{{ error }}</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div v-for="book in books" :key="book._id" class="border p-4 rounded-md shadow-md">
				<img :src="book.coverImage || 'path/to/default-image.jpg'" alt="Book Cover" class="w-full h-48 object-cover mb-2 rounded-md" />
				<h3 class="font-semibold text-lg">{{ book.title }}</h3>
				<p class="text-sm mb-2">by {{ book.author }}</p>
				<p class="text-sm text-gray-500">Publisher: {{ book.publisher }}</p>
				<p class="text-sm text-gray-500">Description: {{ book.description }}</p>
				<p class="text-sm text-gray-500">Tags: {{ book.tags.join(", ") }}</p>
				<RouterLink :to="`/book/${book._id}`">
					<button class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 flex text-center align-center">Detail</button>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
	name: "BookListGrid",
	setup() {
		const books = ref([]);
		const loading = ref(false);
		const error = ref("");

		const fetchBooks = async () => {
			loading.value = true; // Tampilkan Spinner
			error.value = ""; // Reset Error
			try {
				const response = await fetch("http://localhost:5000/book");
				if (!response.ok) throw new Error("Failed to fetch books.");
				const data = await response.json();
				if (data.status === "success" && data.data) {
					books.value = data.data;
				} else {
					throw new Error("Invalid response structure.");
				}
			} catch (err: any) {
				error.value = err.message || "An error occurred.";
			} finally {
				loading.value = false;
			}
		};

		onMounted(() => {
			fetchBooks();
		});

		return { books, loading, error };
	},
});
</script>
