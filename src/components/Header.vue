<template>
	<header class="bg-blue-600 text-white py-2 px-6">
		<nav class="flex justify-between items-center">
			<div class="text-2xl font-bold">Perpustakaan</div>
			<ul class="flex space-x-4">
				<li>
					<router-link to="/" class="hover:underline" active-class="text-yellow-300" exact> Beranda </router-link>
				</li>
				<li>
					<router-link to="/book" class="hover:underline" active-class="text-yellow-300"> Daftar Buku </router-link>
				</li>
				<li>
					<router-link to="/book/add" class="hover:underline" active-class="text-yellow-300"> Tambah Buku </router-link>
				</li>
				<li>
					<router-link to="/hapus" class="hover:underline" active-class="text-yellow-300"> Hapus Buku </router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
export default {};
</script>
