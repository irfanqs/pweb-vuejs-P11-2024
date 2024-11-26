<template>
	<div class="p-6 text-center">
		<h1 class="text-4xl font-bold mb-4">Selamat Datang di Perpustakaan!</h1>
		<p class="text-gray-700 text-lg">Jelajahi koleksi buku kami, tambahkan buku baru, atau pinjam buku favorit Anda.</p>
		<router-link to="/book" class="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> Lihat Koleksi Buku </router-link>
	</div>
</template>

<script lang="ts">
export default {
	name: "WelcomePage",
};
</script>

<style scoped>
h1 {
	color: #2c3e50;
}
</style>
