const domain = "localhost:3000";
const apiPrefix = "/api/v1";
const baseUrl = `http://${ domain }${ apiPrefix }`;


export const Session = {
  create(params) {
    return fetch(`${ baseUrl }/session`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(res => res.json());
  },
  destroy() {
    return fetch(`${ baseUrl }/session`, {
      method: "DELETE",
      credentials: "include",
    }).then(res => res.json());
  }
}