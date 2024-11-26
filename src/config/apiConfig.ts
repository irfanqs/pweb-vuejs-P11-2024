import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzMxZWZjNWYxZjZhOWM1YzYwZmQyNjQiLCJpYXQiOjE3MzI2MjM1MTgsImV4cCI6MTczMjcwOTkxOH0.aKoM6Avg1otzsF4BWP5yZo2G7awyYg_SXIFbJIIylYQ"; // Token disimpan di sini

const api = axios.create({
	baseURL: "http://localhost:4000", // Ganti sesuai base URL backend Anda
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export default api;
