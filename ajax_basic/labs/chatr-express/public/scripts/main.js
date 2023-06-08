// Write chatr code here!

//--------Fetch API-----------------

//All our request to messages
const Message = {
  // 'index()' method to get all the requests
  index() {
    return fetch('/messages')
      .then(response => response.json())
  },

  // 'create()' method to create a new request
  create(params) {
    return fetch('/messages', { // We can omit the domain because '/' is on the same domain as the server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  },

  // 'delete()' method to delete a request
  delete(id) {
    return fetch(`/messages/${id}`,{
      method: 'DELETE'
    })
  }
}

// 'DOMContentLoaded' event is fired when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  // 'querySelector()' method to get the element with the id 'messages'
  const messageUI = document.querySelector("#messages") 
  // 'querySelector()' method to get the element with the id 'new-message'
  const messageForm = document.querySelector("#new-message")


  const refreshMessages = () => {
    // 'index()' method to get all the requests
    Message.index()
    .then(messages => {
      // 'map()' method to iterate over the array of messages
      messageUI.innerHTML = messages.map(message => {
        // data attribute is used to store data attributes on HTML
        return `<li>
                  <strong>${message.username}</strong> - 
                  ${message.body}
                  <button data-id="${message.id}" class="delete-button">
                    Delete
                  </button>
                </li>`
      }).join('')
    })
  }

  // 'setInterval()' method to call the 'refreshMessages()' function every 500 milliseconds
  setInterval(refreshMessages, 1000)
  
  // 'submit' event is fired when a form is submitted
  messageForm.addEventListener('submit', event => {
    // We prevent the form from being submitted
    event.preventDefault(); // This needs to be the first line of code in the event handler  
    const { currentTarget } = event // The form element
    // Use the 'formData' constructor to create an object representation
    // of the keys and values of the form that we pass as an argument
    // to the constructor.
    const formData = new FormData(currentTarget);

    // 'formData.get()' returns the value associated with a given key
    // from within a 'formData' object.
    Message.create({body: formData.get("body"), username: formData.get("username")})
    .then(() => {
      console.log("Message created!")
      // 'refreshMessages()' method to refresh the messages
      refreshMessages()
      currentTarget.reset() // This will reset(empty) the form inputs
    })
  })

  // 'click' event is fired when a pointing device button is pressed and released on a single element
  messageUI.addEventListener('click', event => {
    // Extract the element that was clicked on with Object destructuring
    const { target } = event
    
    // 'matches()' method to check if the element matches a given selector
    if(target.matches('.delete-button')){
      // 'preventDefault()' method to cancel the event if it is cancelable
      event.preventDefault()

      // Use ‘dataset’ property to read ‘data-*’ attributes.
      Message.delete(target.dataset.id).then(() => {
        console.log("Message deleted!")
        refreshMessages()
      })
    }
  })
})
