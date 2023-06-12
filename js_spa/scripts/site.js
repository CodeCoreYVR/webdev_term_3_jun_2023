import webApi from "./webApi.js";

// Event listeners
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(element => {
    element.addEventListener("click", showPage, false);
});

document.querySelector("#new-question-btn").addEventListener("click", createQuestion, false);

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
            return `<li>${q.id} - ${q.title}</li>`
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
    let titleNode = document.querySelector("#title");
    let bodyNode = document.querySelector("#body");
    let title = titleNode.value;
    let body = bodyNode.value;
    webApi.request("questions", {title, body})
    .then(data => {
        titleNode.value = "";
        bodyNode.value = "";
        showPage(null,"questions");
    })
}