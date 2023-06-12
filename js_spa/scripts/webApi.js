
const baseUrl = "http://127.0.0.1:3000/api/v1/";

async function get(path) {
    try {
        const response = await fetch(baseUrl + path);
        return response.json();
    }
    catch (error) {
        console.log(error);
    }
}

async function post(path, requestBody, method) {
    
    let options = {
        method: method || 'POST',
        credentials: 'include', //need this for cookies
        headers: {
            "Content-type": "application/json",
            "mode": "cors",
        },
        body: JSON.stringify(requestBody)
    }
    
    const response = await fetch(baseUrl + path, options)
    return response.json();
}

const webApi = { get, post }

export default webApi