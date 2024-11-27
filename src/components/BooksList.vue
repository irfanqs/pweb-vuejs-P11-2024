<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Daftar Buku</h1>
		<!-- Spinner Saat Loading -->
		<LoadingSpinner v-if="loading" />
		<!-- Pesan Error -->
		<ErrorMessage v-else-if="error" :message="error" />
		<!-- Tabel Data Buku -->
		<table v-else class="table-auto w-full border-collapse border border-gray-400">
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
					<td class="border border-gray-400 px-4 py-2">
						<RouterLink :to="`/book/${book._id}`">
							<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Detail</button>
						</RouterLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LoadingSpinner from "../components/LoadingSpinner.vue"; // Pastikan path benar
import ErrorMessage from "../components/ErrorMessage.vue"; // Pastikan path benar
import api from "../config/apiConfig";

export default defineComponent({
	components: {
		LoadingSpinner,
		ErrorMessage,
	},
	setup() {
		// State untuk Buku
		const books = ref([]);
		const loading = ref(false);
		const error = ref("");

		// Fungsi Fetch Buku dari API
		const fetchBooks = async () => {
			loading.value = true; // Tampilkan Spinner
			error.value = ""; // Reset Error
			try {
				const response = await api.get("http://localhost:5000/book");
				console.log("Respons Buku:", response.data); // Debugging respons API
				if (response.data && response.data.status === "success") {
					books.value = response.data.data; // Ambil data buku
				} else {
					throw new Error("Format data API tidak sesuai.");
				}
			} catch (err) {
				console.error("Error Fetch Buku:", err); // Log error ke console
				error.value = err.response?.data?.message || err.message || "Terjadi kesalahan tak terduga.";
			} finally {
				loading.value = false; // Sembunyikan Spinner
			}
		};

		// Panggil API Saat Komponen Dimuat
		onMounted(fetchBooks);

		return { books, loading, error };
	},
});
</script>
