// AJAX - Asynchronous Javascript and XML

//---------------Native XMLHttpRequest----------------

//to use it. we have to set an instance of it
const students = new XMLHttpRequest()

//specify what we want to do with it
students.open("GET", "http://localhost:3000/students")

students.onload = () => {
    console.log("XML students:", JSON.parse(students.responseText))
}

students.send()

//---------------jQuery request---------------------
$.ajax({
    method: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/ditto",
    success: function(data) {
        console.log("jQuery pokemon:", data)
    }
})

//----------------XML AJAX Pokemon Example-----------


const fetchDataButton = document.querySelector("#fetch-button")

fetchDataButton.addEventListener("click", function() {
    const getReq = new XMLHttpRequest()

    getReq.addEventListener('load', function(){
        console.log("Ditto:", this.responseText)
    })

    getReq.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto")
    getReq.send()
})

//-----------------Axios req to data.json data.json departments-------
fetchDataButton.addEventListener("click", async function() {
    const response = await axios.get("http://localhost:3000/departments")
    console.log("axios data: ", response.data)
})

//-----------------Superagent req to data.json data.json students-------
fetchDataButton.addEventListener("click", async function() {
    superagent.get("http://localhost:3000/students").then(res =>{
        console.log("superagent data: ", JSON.parse(res.text))
    })
})

//---------------Fecthing data using Fetch AJAX--------------------
fetchDataButton.addEventListener("click", async function() {
    fetch("http://localhost:3000/students").then(res =>{
        return res.json()
    }).then(data => {
        console.log("using fetch:", data)
    })
})