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
document.querySelector("#login-btn").addEventListener("click", login, false);

function showPage(e, pageId) {
    let pageName;

    if (e) {
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
    else if (pageName === "question") {
        //loadQuestion()
    }
    else if (pageName === "login") {
        //
    }
    else if (pageName === "new-question") {
        //
    }

    removeAlert();
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

function login() {
    let emailNode = document.getElementById("email");
    let passwordNode = document.getElementById("password")
    let email = emailNode.value;
    let password = passwordNode.value;

    webApi.request("session", { email, password })
        .then(data => {
            showPage(null, "welcome")
        })
        .catch(error => {
            if(error.status && error.status === 401) {
                showAlert("Invalid username or password")
            }
        })
}

function createQuestion() {
    let titleNode = document.querySelector("#new-question input[name=title]");
    let bodyNode = document.querySelector("#new-question textarea[name=body]");
    let title = titleNode.value;
    let body = bodyNode.value;
    webApi.request("questions", { title, body })
        .then(data => {
            titleNode.value = "";
            bodyNode.value = "";
            renderQuestion(data);
        })
}

function renderQuestion(data) {
    document.querySelector("#show-question").innerHTML = `
        <h2>${data.title}</h2>
            <p>${data.body}</p>
            <small>Like count: ${data.like_count}</small>
            <div>
                <button data-action="edit" class="btn btn-primary" data-id="${data.id}" href="#">Edit</button>
                <button data-action="delete" class="btn btn-danger" data-id="${data.id}" href="#">Delete</button>
            </div>
        `;
    showPage(null, "show-question");
}

function showQuestion(event) {
    event.preventDefault();
    if (event.target.matches("a.question-link")) {
        webApi.get(`questions/${event.target.dataset.id}`)
            .then(data => {
                renderQuestion(data);
            })
    }
}

function editDeleteQuestion(event) {
    event.preventDefault();
    if (event.target.dataset.action === "edit") {
        webApi.get(`questions/${event.target.dataset.id}`)
            .then(data => {
                document.querySelector("#update-question input[name=title]").value = data.title;
                document.querySelector("#update-question textarea[name=body]").value = data.body;
                document.querySelector("#update-question input[name=id]").value = data.id;
                showPage(null, "update-question");
            })
    }

    if (event.target.dataset.action === "delete") {
        webApi.request(`questions/${event.target.dataset.id}`, {}, "DELETE")
            .then(() => {
                showPage(null, "questions");
            })
    }
}

function updateQuestion(event) {
    event.preventDefault()
    let title = document.querySelector("#update-question input[name=title]").value;
    let body = document.querySelector("#update-question textarea[name=body]").value;
    let id = document.querySelector("#update-question input[name=id]").value;

    webApi.request(`questions/${id}`, { title, body }, "PATCH")
        .then(data => {
            renderQuestion(data);
        })
}

function showAlert(message) {
    document.getElementById("alert-info").innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

function removeAlert() {
    document.getElementById("alert-info").innerHTML = ""
}