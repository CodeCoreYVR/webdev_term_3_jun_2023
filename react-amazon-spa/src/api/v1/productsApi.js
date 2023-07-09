const domain = "localhost:3000";
const apiPrefix = "/api/v1";
const baseUrl = `http://${ domain }${ apiPrefix }`;

export const Product = {
	index() {
		return fetch(`${ baseUrl }/products`).then((response) => {
			// console.log(response);
			return response.json();
		});
	},
	show(id) {
		return fetch(`${ baseUrl }/products/${ id }`).then((res) => res.json());
	},
};
