<template>
	<div class="flex justify-center items-center min-h-screen bg-gray-100">
		<div class="w-full max-w-screen-xl  px-10 bg-white rounded-lg shadow-lg">
		<h1 class="text-2xl font-semibold mb-4 text-center">{{ book?.title }}</h1>
  
		<div v-if="loading" class="text-center text-gray-500">Loading book details...</div>
  
		<div v-if="error" class="text-red-500 text-center">{{ error }}</div>
  
		<div v-if="book" class="grid grid-cols-1 md:grid-cols-3 gap-6 ">
		  <!-- Book Image -->
		  <img 
			:src="book.coverImage || 'path/to/default-image.jpg'" 
			alt="Book Cover" 
			class="col-span-1 w-full h-full object-cover rounded-lg shadow-md" 
		  />
		  
		  <div class="col-span-2 space-y-2">
			<p><strong>Author:</strong> {{ book.author }}</p>
			<p><strong>Publisher:</strong> {{ book.publisher }}</p>
			<p><strong>Published Date:</strong> {{ new Date(book.publishedDate).toLocaleDateString() }}</p>
			<p><strong>Description:</strong> {{ book.description }}</p>
			<p><strong>Tags:</strong> {{ book.tags.join(", ") }}</p>
			<p><strong>Available Quantity:</strong> {{ book.qty }} / {{ book.initialQty }}</p>
		  </div>
  
		  <div class="col-span-3 flex justify-center space-x-4">
			<button
			  class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
			  :disabled="book.qty <= 0"
			  @click="borrowBook"
			>
			  Borrow
			</button>
			<button
			  class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
			  @click="returnBook"
			>
			  Return
			</button>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default defineComponent({
	name: "BookDetail",
	setup() {
	  const BASE_URL = "http://localhost:5000"; 
	  const route = useRoute();
	  const book = ref<any | null>(null); 
	  const loading = ref(false); 
	  const error = ref(""); 
  

	  const fetchBook = async () => {
		const id = route.params.id as string;
		loading.value = true;
		try {
		  const response = await axios.get(`${BASE_URL}/book/${id}`);
		  if (response.data.status === "success" && response.data.data) {
			book.value = response.data.data;
		  } else {
			throw new Error("Invalid response structure.");
		  }
		} catch (err: any) {
		  error.value = err.message || "An error occurred.";
		} finally {
		  loading.value = false;
		}
	  };
  

	  const borrowBook = async () => {
		try {
		  const response = await axios.post(`${BASE_URL}/mechanism/borrow/${route.params.id}`);
		  if (response.status === 200) {
			alert("Book borrowed successfully.");
			fetchBook(); 
		  }
		} catch (err: any) {
		  alert(err.message || "Failed to borrow book.");
		}
	  };
  

	  const returnBook = async () => {
		try {
		  const response = await axios.post(`${BASE_URL}/mechanism/return/${route.params.id}`);
		  if (response.status === 200) {
			alert("Book returned successfully.");
			fetchBook(); 
		  }
		} catch (err: any) {
		  alert(err.message || "Failed to return book.");
		}
	  };

	  onMounted(() => {
		fetchBook();
	  });
  
	  return { book, loading, error, borrowBook, returnBook };
	},
  });
  </script>
  
  <style scoped>
  button {
	transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  button:hover {
	transform: translateY(-2px);
  }
  </style>
  