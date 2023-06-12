import webApi from "./webApi.js";

webApi.get("questions")
    .then(data => {
        document.querySelector("ul#question-list").innerHTML = data.map(q => {
            return `<li>${q.id} - ${q.title}</li>`
        }).join("")
    })
    .catch(console.error);

// The rest of the code will not be executed until await completes. If await fails, the rest of the code won't be executed.
let loggedInUser = await webApi.post("session", {
    "email": "tony@stark.com",
    "password": "123abc"
});

webApi.post("questions", {
    "question": {
        "title": "spaaaaaaaaaa title by john doe",
        "body": "editedwer3232323df2"
    }
}).then(data => {
    console.log(data)
}).catch(console.error)