const baseUrl = "http://127.0.0.1:3000/api/v1/";

async function get(path) {
    try {
        const response = await fetch(baseUrl + path);
        return response.json();

        // fetch(resource)
        // .then(response => {
        //     console.log(response)
        // })
    }
    catch(error) {
        console.error(error);
    }
}

async function request(path, requestBody, method) {
    try {
        let options = {
            method: method || 'POST',
            credentials: 'include', //need this for cookies
            headers: {
                "Content-type": "application/json",
                "mode": "cors"
            },
            body: JSON.stringify(requestBody)
        }

        const response = await fetch(baseUrl + path, options);

        if(response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(response)
        }
    }
    catch(error) {
        console.log(error);
        return Promise.reject(error);
    }
}

const webApi = { get, request }


export const Question = {
    index(){
        return webApi.get("questions")
    },

    create(params){
        return  webApi.request("questions", params)
    },

    show(id) {
        return webApi.get(`questions/${id}`)
    },

    update(id, params){
        return webApi.request(`questions/${id}`, params, "PATCH")
    },

    destroy(id){
        return webApi.request(`questions/${id}`, {}, "DELETE")
    }
}

export const Session = {
    create(params) {
        return  webApi.request("session", params)
    }
}