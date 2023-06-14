import webApi from "./webApi.js";

// Event listeners
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(element => {
    element.addEventListener("click", showPage, false);
});

[
    { selector: "#new-question-btn", eventFunction: createQuestion },
    { selector: "#question-list", eventFunction: showQuestion },
    { selector: "#show-question", eventFunction: editDeleteQuestion },
    { selector: "#update-question-btn", eventFunction: updateQuestion },
    { selector: "#login-btn", eventFunction: login },
    { selector: "#logged-in-user", eventFunction: logout }
].forEach(item => {
    document.querySelector(item.selector).addEventListener("click", item.eventFunction, false)
})

showLoggedInUser();

function showPage(e, pageId) {
    let pageName;

    removeAlert();
    showLoggedInUser();

    if (e) {
        e.preventDefault();
        pageName = e.target.attributes["target-id"].value;
    } else {
        pageName = pageId;
    }
    document.querySelectorAll(".page").forEach(element => {
        element.style.display = 'none';
        // or, we could remove active class for all
    })
    document.querySelector(`.page#${pageName}`).style.display = 'block';
    //or, we could add active class for all

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

function createQuestion() {
    let titleNode = document.querySelector("#new-question input[id=new-title]");
    let bodyNode = document.querySelector("#new-question textarea[id=new-body]");
    let title = titleNode.value;
    let body = bodyNode.value;
    webApi.request("questions", { title, body })
        .then(data => {
            titleNode.value = "";
            bodyNode.value = "";
            renderQuestion(data);
        })
        .catch(error => {
            showAlertForApiCall(error);
        })
}

function renderQuestion(data) {
    document.querySelector("#show-question").innerHTML = `
        <h2>${data.title}</h2>
            <p>${data.body}</p>
            <small>Like count: ${data.like_count}</small>
            <div>
                <button class="btn btn-primary" data-action="edit" data-id="${data.id}" href="#">Edit</button>
                <button class="btn btn-danger" data-action="delete" data-id="${data.id}" href="#">Delete</button>
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
                document.querySelector("#update-question input[id=update-title]").value = data.title;
                document.querySelector("#update-question textarea[id=update-body]").value = data.body;
                document.querySelector("#update-question input[name=id]").value = data.id;
                showPage(null, "update-question");
            })
            .catch(error => {
                showAlertForApiCall(error);
            })
    }

    if (event.target.dataset.action === "delete") {
        webApi.request(`questions/${event.target.dataset.id}`, {}, "DELETE")
            .then(() => {
                showPage(null, "questions");
            })
            .catch(error => {
                showAlertForApiCall(error);
            })
    }
}

function updateQuestion(event) {
    event.preventDefault()
    let title = document.querySelector("#update-question input[id=update-title]").value;
    let body = document.querySelector("#update-question textarea[id=update-body]").value;
    let id = document.querySelector("#update-question input[name=id]").value;

    webApi.request(`questions/${id}`, { title, body }, "PATCH")
        .then(data => {
            renderQuestion(data);
        })
        .catch(error => {
            showAlertForApiCall(error);
        })
}

function login() {
    let emailNode = document.getElementById("email"),
        passwordNode = document.getElementById("password");
    let email = emailNode.value,
        password = passwordNode.value;

    webApi.request("session", { email, password })
        .then(data => {
            document.cookie = `loggedInuser=${data.name}; SameSite=None; Secure`;
            showPage(null, "welcome");
        })
        .catch(error => {
            if (error.status && error.status === 401) {
                showAlert("Invalid username or password");
            }
            else {
                console.log(error)
                showAlert("Something went wrong!");
            }
        })

    emailNode.value = "";
    passwordNode.value = "";
}

function logout(e) {
    if (e.target.dataset.action === "logout") {
        webApi.request("session", {}, 'DELETE')
            .then(data => {
                removeCookie("loggedInuser");
                showPage(null, "welcome");
            })
            .catch(error => {

            })
    }
}

function showAlert(message) {
    document.getElementById("alert-info").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

function removeAlert() {
    document.getElementById("alert-info").innerHTML = ""
}

function showLoggedInUser() {
    let userName = getCookieValue("loggedInuser")
    if (userName) {
        document.querySelector(".nav-link[target-id=login]").style.display = "none";
        document.getElementById("logged-in-user").innerHTML = `
        Hello ${userName}
        <button class="btn btn-primary btn-sm" data-action="logout">Logout</button>
        `
    }
    else {
        document.getElementById("logged-in-user").innerHTML = "";
        document.querySelector(".nav-link[target-id=login]").style.display = "block";
    }
}

function getCookieValue(cookieName) {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split("=")[1];
    return cookieValue || "";
}

function removeCookie(name, path, domain) {
    if (getCookieValue(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function showAlertForApiCall(error) {
    if (error.status && error.status === 401) {
        showPage(null, "login")
        showAlert("Unauthorized user, Please login.");
    }
    else {
        console.log(error)
    }
}