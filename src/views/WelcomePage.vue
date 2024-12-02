<template>
	<div class="flex flex-col justify-center items-center p-6 text-center">
		<h1 class="text-3xl lg:text-5xl font-bold mb-4">Selamat Datang di Perpustakaan!</h1>
		<p class="text-gray-700 text-lg lg:text-2xl mb-6">Jelajahi koleksi buku kami, tambahkan buku baru, atau hapus buku yang tidak diperlukan.</p>

		<!-- Tombol Navigasi -->
		<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
			<router-link to="/book" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> Lihat Koleksi Buku </router-link>

			<router-link to="/book/add" class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"> Tambah Buku </router-link>

			<router-link to="/hapus" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"> Hapus Buku </router-link>
		</div>
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
