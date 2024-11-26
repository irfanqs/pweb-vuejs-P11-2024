<template>
	<div>
		<h1>{{ isEdit ? "Edit Buku" : "Tambah Buku" }}</h1>
		<form @submit.prevent="submitForm">
			<input v-model="book.title" placeholder="Judul Buku" required />
			<input v-model="book.author" placeholder="Penulis" required />
			<input v-model="book.year" placeholder="Tahun" type="number" required />
			<button type="submit">{{ isEdit ? "Simpan" : "Tambah" }}</button>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

interface Book {
	title: string;
	author: string;
	year: number;
}

export default defineComponent({
	setup() {
		const book = ref<Book>({ title: "", author: "", year: 0 });
		const isEdit = ref(false);
		const id = window.location.pathname.split("/").pop() || "";

		const fetchBook = async () => {
			if (id) {
				isEdit.value = true;
				try {
					const response = await axios.get<Book>(`http://localhost:5000/api/books/${id}`);
					book.value = response.data;
				} catch (error) {
					console.error(error);
				}
			}
		};

		const submitForm = async () => {
			try {
				if (isEdit.value) {
					await axios.put(`http://localhost:5000/api/books/${id}`, book.value);
					alert("Buku berhasil diperbarui");
				} else {
					await axios.post("http://localhost:5000/api/books", book.value);
					alert("Buku berhasil ditambahkan");
				}
				window.location.href = "/";
			} catch (error) {
				console.error(error);
			}
		};

		onMounted(fetchBook);

		return {
			book,
			isEdit,
			submitForm,
		};
	},
});
</script>
