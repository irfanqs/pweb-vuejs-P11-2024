<template>
	<div>
		<h1 class="text-2xl font-bold mb-4 text-center">Hapus Buku</h1>
		<!-- Spinner Saat Loading -->
		<div v-if="loading" class="text-center">Loading books...</div>
		<!-- Pesan Error -->
		<div v-else-if="error" class="text-red-500">{{ error }}</div>
		<!-- Tabel Data Buku -->
		<div v-else class="overflow-x-auto">
			<table class="table-auto w-full border-collapse border border-gray-400 overflow-x-auto mx-auto">
				<thead>
					<tr class="bg-gray-200">
						<th class="border border-gray-400 px-4 py-2">Judul</th>
						<th class="border border-gray-400 px-4 py-2">Pengarang</th>
						<th class="border border-gray-400 px-4 py-2">Kategori</th>
						<th class="border border-gray-400 px-4 py-2">Jumlah</th>
						<th class="border border-gray-400 px-4 py-2">Aksi</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="book in books" :key="book._id" class="hover:bg-gray-100">
						<td class="border border-gray-400 px-4 py-2">{{ book.title }}</td>
						<td class="border border-gray-400 px-4 py-2">{{ book.author }}</td>
						<td class="border border-gray-400 px-4 py-2">{{ book.tags.join(", ") }}</td>
						<td class="border border-gray-400 px-4 py-2">{{ book.qty }}</td>
						<td class="border border-gray-400 px-4 py-2 text-center">
							<button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="deleteBook(book._id)">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

interface Rating {
	average: number;
	count: number;
}

interface Book {
	_id: string;
	coverImage: string;
	title: string;
	author: string;
	publishedDate: string;
	publisher: string;
	description: string;
	rating: Rating;
	tags: string[];
	qty: number;
}

export default defineComponent({
	name: "BookList",
	setup() {
		const BASE_URL = "http://localhost:5000";

		const books = ref<Book[]>([]);
		const loading = ref(false);
		const error = ref("");

		const fetchBooks = async () => {
			loading.value = true;
			try {
				const response = await fetch(`${BASE_URL}/book`);
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

		const deleteBook = async (id: string) => {
			if (!confirm("Are you sure you want to delete this book?")) return;
			try {
				const response = await fetch(`${BASE_URL}/book/${id}`, { method: "DELETE" });
				if (!response.ok) throw new Error("Failed to delete book.");
				books.value = books.value.filter((book: any) => book._id !== id);
				alert("Book deleted successfully.");
			} catch (err: any) {
				alert(err.message || "Failed to delete book.");
			}
		};

		onMounted(() => {
			fetchBooks();
		});

		return { books, loading, error, deleteBook };
	},
});
</script>
