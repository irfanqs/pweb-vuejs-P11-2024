<template>
	<div class="container mx-auto p-4 flex justify-center items-start min-h-screen bg-gray-100">
	  <div class="w-full max-w-lg bg-white p-2 rounded-lg shadow-md">
		<h1 class="text-lg font-bold mb-4 text-center">Tambah Buku</h1>
		<form @submit.prevent="addBook" class="grid grid-cols-1 gap-3">
			<div class="grid grid-cols-2 gap-2">
		<div>
		<label for="title" class="block text-sm font-medium">Judul Buku</label>
		<input
			id="title"
			v-model="book.title"
			type="text"
			class="border rounded-md w-full p-2"
			required
		/>
		</div>
		<div>
		<label for="author" class="block text-sm font-medium">Pengarang</label>
		<input
			id="author"
			v-model="book.author"
			type="text"
			class="border rounded-md w-full p-2"
			required
		/>
		</div>
	</div>
  
		  <div class="grid grid-cols-2 gap-2">
			<div>
			  <label for="publisher" class="block text-sm font-medium">Penerbit</label>
			  <input
				id="publisher"
				v-model="book.publisher"
				type="text"
				class="border rounded-md w-full p-2"
				required
			  />
			</div>
			<div>
			  <label for="publishedDate" class="block text-sm font-medium">Tanggal</label>
			  <input
				id="publishedDate"
				v-model="book.publishedDate"
				type="date"
				class="border rounded-md w-full p-2"
				required
			  />
			</div>
		  </div>
  
		  <div>
			<label for="tags" class="block text-sm font-medium">Kategori</label>
			<input
			  id="tags"
			  v-model="tagsInput"
			  type="text"
			  class="border rounded-md w-full p-2"
			/>
		  </div>
  
		  <div>
			<label for="description" class="block text-sm font-medium">Deskripsi</label>
			<textarea
			  id="description"
			  v-model="book.description"
			  class="border rounded-md w-full p-2"
			  rows="2"
			  required
			></textarea>
		  </div>
		  <div>
          <label for="coverImage" class="block text-sm font-medium">URL Gambar Sampul</label>
          <input
            id="coverImage"
            v-model="book.coverImage"
            type="text"
            class="border rounded-md w-full p-2"
          />
        </div>
		  <div class="grid grid-cols-2 gap-2">
			<div>
			  <label for="initialQty" class="block text-sm font-medium">Jumlah Awal</label>
			  <input
				id="initialQty"
				v-model.number="book.initialQty"
				type="number"
				class="border rounded-md w-full p-2"
				min="1"
				required
			  />
			</div>
			<div>
			  <label for="rating" class="block text-sm font-medium">Rating</label>
			  <input
				id="rating"
				v-model.number="book.rating.average"
				type="number"
				class="border rounded-md w-full p-2"
				step="0.1"
				min="0"
				max="5"
				required
			  />
			</div>
		  </div>
  
		  <div class="text-center">
			<button
			  type="submit"
			  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
			>
			  Tambah Buku
			</button>
		  </div>
		</form>
	  </div>
	</div>
  </template>  
  
  <script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import type { Book } from "src/assets/book";
  
  export default defineComponent({
	name: "AddBook",
	setup() {
	  const book = reactive<Book>({
		title: "",
		author: "",
		publisher: "",
		publishedDate: new Date(),
		description: "",
		coverImage: "",
		tags: [],
		initialQty: 1,
		qty: 1,
		rating: { average: 0, count: 0 }, // Input langsung pada form
	  });
  
	  const tagsInput = ref("");
  
	  const addBook = async () => {
		book.tags = tagsInput.value.split(",").map((tag) => tag.trim());
		try {
		  const response = await fetch("http://localhost:5000/book", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(book),
		  });
		  if (!response.ok) {
			throw new Error("Gagal menambahkan buku.");
		  }
		  alert("Buku berhasil ditambahkan!");
		  window.location.href = "/";
		} catch (err) {
		  if (err instanceof Error) {
			alert(err.message);
		  } else {
			alert("Terjadi kesalahan.");
		  }
		}
	  };
  
	  return { book, tagsInput, addBook };
	},
  });
  </script>
  