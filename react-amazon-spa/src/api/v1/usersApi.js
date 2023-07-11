const domain = "localhost:3000";
const apiPrefix = "/api/v1";
const baseUrl = `http://${ domain }${ apiPrefix }`;

export const User = {
  current() {
    return fetch(`${ baseUrl }/users/current`, {
      credentials: "include",
    })
    .then(res => res.json())
    .catch(error => {
      console.log("error", error)
    })
  },
}
