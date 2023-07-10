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
		return fetch(`${ baseUrl }/products/${ id }`).then(res => res.json());
	},
  create(params) {
    return fetch(`${ baseUrl }/products`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  destroy(id) {
    return fetch(`${ baseUrl }/products/${ id }`, {
      method: "DELETE",
      credentials: "include",
    }).then(res => res.json());
  },
};
