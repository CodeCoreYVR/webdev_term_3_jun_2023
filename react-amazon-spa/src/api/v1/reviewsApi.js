const domain = "localhost:3000";
const apiPrefix = "/api/v1";
const baseUrl = `http://${ domain }${ apiPrefix }`;

export const Review = {
  create(productId, params) {
    return fetch(`${ baseUrl }/products/${ productId }/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  update(productId, reviewId, params) {
    return fetch(`${ baseUrl }/products/${ productId }/reviews/${ reviewId }`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  destroy(productId, reviewId) {
    return fetch(`${ baseUrl }/products/${ productId }/reviews/${ reviewId }`, {
      method: "DELETE",
      credentials: "include",
    }).then(res => res.json());
  }
}

