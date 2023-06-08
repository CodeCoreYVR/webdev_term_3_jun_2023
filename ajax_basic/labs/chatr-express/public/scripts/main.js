// Write chatr code here!

//--------Fetch API-----------------

// 'Headers()' constructor returns a new Headers object
const headers = new Headers({
  "Accept": "application/json, text/plain, */*",
  "Content-Type": "application/json"
});

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
      headers: headers,
      body: JSON.stringify(params)
    })
  },

  // 'update()' method to update a request
  update(params, id) {
    return fetch(`/messages/${id}`, {
        method: "PATCH",
        headers: headers,
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
        // filterMessages is given the value of messages
        let filteredMessages = messages;

        // If the filter button is clicked
        if (isFilter) {
          // filterMessages is given the value of all messages which are flagged
          filteredMessages = messages.filter((m) => m.flagged);
        }

        // If the username filter is not null
        if (usernameFilter) {
          // filteredMessages is given the value of all existing filteredMessages which have the same username as the username filter
          filteredMessages = filteredMessages.filter((m) => m.username === usernameFilter);
        }

        // 'map()' method to iterate over the array of messages
        messageUI.innerHTML = filteredMessages.map(message => { // changed from messages to filteredMessages
          return `<li>
                    <li style="background:${message.flagged ? "lightblue" : "lightpink"}">
                    
                    <strong>${message.username}</strong> - ${message.body}
                    
                    <button>
                      <i data-id=${message.id} data-flag=${message.flagged} class="flag-link">flag</i>
                    </button>
                    
                    <button data-id="${message.id}" class="delete-button">
                      Delete
                    </button>
                  </li>`;
        }).join('')
      })
  }

  // 'setInterval()' method to call the 'refreshMessages()' function every 1000 milliseconds
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

    // If the element that was clicked on has the class 'flag-link'
    if (target.matches('.flag-link')) {
      // Change the value of the 'flagged' attribute to the opposite of what it currently is
      Message.update({ flagged: target.dataset.flag === "false" ? true : false }, target.dataset.id)
      .then(() => {
        // Then refresh the messages
        refreshMessages();
      })
    }
  })

  // 'isFilter' is set to false by default
  let isFilter = false;

  // Create a filter button that will filter the messages by flagged or not flagged
  const filterButton = document.getElementById("flag-filter");
  // 'click' event is fired when flag filter button is clicked and flagged is set to true
  filterButton.addEventListener("click", event => {
    // Set 'isFilter' to the opposite of what it currently is aka using it as a flag
    isFilter = !isFilter;  
    refreshMessages();
  });

  // 'usernameFilter' is set to null by default
  let usernameFilter = null;
  
  // Create a filter form that will filter the messages by username
  const filterForm = document.getElementById('filter-form');
  // 'submit' event is fired when a form is submitted
  filterForm.addEventListener('submit', event => {
    event.preventDefault();     
    // 'getElementById()' method to get the element with the id 'username-filter'
    const usernameInput = document.getElementById('username-filter');
    // 'trim()' method to remove whitespace from both ends of a string and assign the value to usernameFilter
    usernameFilter = usernameInput.value.trim();
    
    refreshMessages();
  });
})
