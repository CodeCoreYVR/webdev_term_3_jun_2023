import webApi from "./webApi.js";

// Event listeners
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(element => {
    element.addEventListener("click", showPage, false);
});

document.querySelector("#new-question-btn").addEventListener("click", createQuestion, false);
document.querySelector("#question-list").addEventListener("click", showQuestion, false);
document.querySelector("#show-question").addEventListener("click", editDeleteQuestion, false);
document.querySelector("#update-question-btn").addEventListener("click", updateQuestion, false);

function showPage(e, pageId) {
    let pageName;
    if(e) {
        e.preventDefault();
        pageName = e.target.attributes["target-id"].value;
    } else {
        pageName = pageId;
    }
    document.querySelectorAll(".page").forEach(element => {
        element.style.display = 'none';
    })
    document.querySelector(`.page#${pageName}`).style.display = 'block';
    
    if (pageName === "questions") {
        loadQuestionList();
    }
    else if(pageName === "question") {
        //loadQuestion()
    }
    else if (pageName === "login") {
        //
    }
    else if (pageName === "new-question") {
        //
    }
}

const loadQuestionList = () => {
    webApi.get("questions")
    .then(data => {
        document.querySelector("#question-list").innerHTML = data.map(q => {
            return `<li>
                <a class="question-link" data-id="${q.id}" href="#"> ${q.id} - ${q.title}</a>
            </li>`
        }).join("");
    
        // let listHtml = "";
        // for (let index = 0; index < data.length; index++) {
        //     let q = data[index];
        //     listHtml += `<li>${q.id} - ${q.title}</li>`;
        // }
        // document.querySelector("ul#question-list").innerHTML = listHtml;
    })
}

let sampleUser = {
    "email": "tony@stark.com",
    "password": "123abc"
}
let loggedInuser = await webApi.request("session", sampleUser);

let sampleQueston = {
    title: "Sample title from spa",
    body: "body of the question ............................."
}

function createQuestion() {
    let titleNode = document.querySelector("#new-question input[id=title]");
    let bodyNode = document.querySelector("#new-question textarea[id=body]");
    let title = titleNode.value;
    let body = bodyNode.value;
    webApi.request("questions", {title, body})
    .then(data => {
        titleNode.value = "";
        bodyNode.value = "";
        showPage(null,"questions");
    })
}

function renderQuestion(data){
    document.querySelector("#show-question").innerHTML = `
        <h2>${data.title}</h2>
            <p>${data.body}</p>
            <small>Like count: ${data.like_count}</small>
            <div>
                <button data-action="edit" data-id="${data.id}" href="#">Edit</button>
                <button data-action="delete" data-id="${data.id}" href="#">Delete</button>
            </div>
        `;
        showPage(null, "show-question");
}

function showQuestion(event) {
    event.preventDefault();
    if(event.target.matches("a.question-link")){
        webApi.get(`questions/${event.target.dataset.id}`)
            .then(data => {
                renderQuestion(data);
            })
    }
}

function editDeleteQuestion(event) {
    event.preventDefault();
    if(event.target.dataset.action === "edit"){
        webApi.get(`questions/${event.target.dataset.id}`)
        .then(data => {
            document.querySelector("#update-question input[id=title]").value = data.title;
            document.querySelector("#update-question textarea[id=body]").value = data.body;
            document.querySelector("#update-question input[name=id]").value = data.id;
            showPage(null, "update-question");
        })
    } 

    if(event.target.dataset.action === "delete"){
        webApi.request(`questions/${event.target.dataset.id}`, {}, "DELETE")
        .then(() => {
            showPage(null,"questions");
        })
    }
}

function updateQuestion(event) {
    event.preventDefault()
    let title = document.querySelector("#update-question input[id=title]").value;
    let body = document.querySelector("#update-question textarea[id=body]").value;
    let id = document.querySelector("#update-question input[name=id]").value;

    webApi.request(`questions/${id}`, {title, body}, "PATCH")
    .then(data => {
        renderQuestion(data);
    })
}