import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../views/WelcomePage.vue";
import BooksList from "../components/BooksList.vue";
import BookDetail from "../components/BookDetail.vue";
import BookForm from "../components/BookForm.vue";
import BorrowPage from "../views/BorrowPage.vue";

const routes = [
	{ path: "/", component: WelcomePage }, // Welcome page
	{ path: "/book", component: BooksList }, // Daftar buku
	{ path: "/book/:id", component: BookDetail }, // Detail buku
	{ path: "/book/add", component: BookForm }, // Tambah buku
	{ path: "/book/edit/:id", component: BookForm }, // Edit buku
	{ path: "/borrow", component: BorrowPage }, // Pinjam buku
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
