<template>
	<div v-if="visible" class="modal">
		<div class="modal-content">
			<h3>Hapus Buku</h3>
			<p>Apakah Anda yakin ingin menghapus buku ini?</p>
			<div class="modal-actions">
				<button @click="confirmDelete">Hapus</button>
				<button @click="closeModal">Batal</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";

export default defineComponent({
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		bookId: {
			type: String,
			required: true,
		},
	},
	emits: ["close", "deleted"],
	setup(props, { emit }) {
		const confirmDelete = async () => {
			try {
				await axios.delete(`http://localhost:5000/api/books/${props.bookId}`);
				emit("deleted");
				closeModal();
			} catch (error) {
				console.error("Error deleting book:", error);
			}
		};

		const closeModal = () => {
			emit("close");
		};

		return {
			confirmDelete,
			closeModal,
		};
	},
});
</script>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
	background: white;
	padding: 20px;
	border-radius: 8px;
	max-width: 400px;
	text-align: center;
}

.modal-actions button {
	margin: 0 10px;
}
</style>
