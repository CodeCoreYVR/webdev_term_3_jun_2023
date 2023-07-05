const DOMAIN = "localhost:3000";
const API_PREFIX = "/api/v1";
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

export const Review = {
	index(productId) {
		return fetch(`${BASE_URL}/reviews`, {
			credentials: "include",
		}).then((res) => res.json());
	},
};
