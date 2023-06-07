// Write chatr code here!

//--------Fetch API-----------------

//All our request to messages
const Message = {
    // 'index()' method to get all the requests
    index() {
        return fetch('/messages')
            .then(response => response.json())
    },

    create(params) {
        return fetch('/messages', { // We can omit the domain because '/' is on the same domain as the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
    },

    delete(id) {
        return fetch(`/messages/${id}`,{
            method: 'DELETE'
        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const messageUI = document.querySelector("#messages")
    const messageForm = document.querySelector("#new-message")

    const refreshMessages = () => {
        Message.index()
        .then(messages => {
            messageUI.innerHTML = messages.map(message => {
                // data attribute is used to store data attributes on HTML
                return `<li>
                            <stong>#${message.id}</strong> ${message.username} - ${message.body}
                            <button data-id="${message.id}" class="delete-button">Delete</button>
                        </li>`
            }).join('')
        })
    }

    setInterval(refreshMessages, 500)
    
    messageForm.addEventListener('submit', event => {
        // We prevent the form to be submitted
        const { currentTarget } = event // The form element
        // Use the 'formData' constructor to create as object representation
        // of the keys and values of the form that we pass as an argument
        // to the constructor.
        const formData = new FormData(event.currentTarget);

        // 'formData.get()' returns the value associated with a given key
        // from within a 'formData' object.
        Message.create({body: formData.get("body"), username: formData.get("username")})
        .then(() => {
            console.log("Message created!")
            refreshMessages()
            currentTarget.reset() // This will reset(empty) the form inputs
        })

    })

    messageUI.addEventListener('click', event => {
        const {target} = event
        
        if(target.matches('.delete-button')){
            event.preventDefault()

            // Use ‘dataset’ property to read ‘data-*’ attributes.
            Message.delete(target.dataset.id).then(() => {
                console.log("Message deleted!")
                refreshMessages()
            })
        }
    })
})
