<template>
	<div>
	  <h1 class="text-2xl font-bold mb-4">Book List</h1>
	  <div v-if="loading" class="text-center">Loading books...</div>
	  <div v-if="error" class="text-red-500">{{ error }}</div>
	  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div
		  v-for="book in books"
		  :key="book._id"
		  class="border p-4 rounded-md shadow-md"
		>
		  <img :src="book.coverImage || 'path/to/default-image.jpg'" alt="Book Cover" class="w-full h-48 object-cover mb-2 rounded-md" />
		  <h3 class="font-semibold text-lg mb-2">{{ book.title }}</h3>
		  <p class="text-sm">by {{ book.author }}</p>
		  <p class="text-sm text-gray-500">Published: {{ formatDate(book.publishedDate) }}</p>
		  <p class="text-sm text-gray-500">Publisher: {{ book.publisher }}</p>
		  <p class="text-sm text-gray-500">Description: {{ book.description }}</p>
		  <p class="text-sm text-gray-500">Rating: {{ book.rating.average }} ({{ book.rating.count }} reviews)</p>
		  <p class="text-sm text-gray-500">Tags: {{ book.tags.join(', ') }}</p>
		  <button
			class="bg-red-500 text-white px-4 py-2 rounded-md mt-2 inline-block"
			@click="deleteBook(book._id)"
		  >
			Delete
		  </button>
		</div>
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
  
	  const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) {
		  return "Invalid Date";
		}
		return date.toDateString();
	  };
  
	  onMounted(() => {
		fetchBooks();
	  });
  
	  return { books, loading, error, deleteBook, formatDate };
	},
  });
  </script>
  