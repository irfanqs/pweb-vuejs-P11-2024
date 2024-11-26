import axios from "axios";
import { API_BASE_URL, BEARER_TOKEN } from "../config/apiConfig";

export const fetchBooks = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/books`, {
			headers: {
				Authorization: `Bearer ${BEARER_TOKEN}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
