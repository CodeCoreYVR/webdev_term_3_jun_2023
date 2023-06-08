( [Steps](#stepscommands-used-for-labs) | [Labs](#labs-for-js-ajax-basics) )
# Chatr in Express

To get started:

```bash
git clone https://github.com/CodeCoreYVR/chatr-express.git
cd chatr-express
nvm install 12.18.4
nvm use 12.18.4
npm install fsevents
npm i
npm install -g json-server
npm run db:setup
npm run db:seed
npm start
```

Go to `http://localhost:3434` to view the app.

Run your server either by using VSCode's Live server, 

or in terminal if you installed json-server:
```bash
json-server data.json
```

Write your client-side JavaScript in `public/javascripts/main.js`!

Also, remember to change the scripts in /views/partials/header.ejs if you are adding jquery.

✨🤓✨

---
# Steps/Commands Used for JS AJAX Basics Labs: 
### Add User Names to Messages
([Back to Lab](#lab-chatr-add-user-names-to-messages))
* ./public/scripts/main.js
  * Modify the Message.create function to include the username parameter when creating a new message.
    ```javascript 
    const Message = {
      // existing code...
      create(params) {
        return fetch('/messages', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
      },
      // ...existing code
    }
    ```
  * Update the rendering of messages in the refreshMessages function to include the username:
    ```javascript    
    // existing code...
      const refreshMessages = () => {
        Message.index()
        .then(messages => { 
          messageUI.innerHTML = messages.map(message => {
            // Put username first
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
    // ...existing code
    ```
  * Make sure you prevent default form submission:
    ```javascript    
    // existing code...
    messageForm.addEventListener('submit', event => {
      event.preventDefault(); // add this line   
      const { currentTarget } = event 
    // ...existing code
    ```


### Enable Flagging
([Back to Lab](#lab-chatr-enable-flagging))
* ./public/scripts/main.js
  * Create a header for content type in the Message model:
    ```javascript 
    // Above Messages...
    const headers = new Headers({
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    });
    // ...rest of code
    ```
  * Change content-type to header in create function and create an update function:
    ```javascript 
    const Message = {
      // above code...
      create(params) {
        return fetch('/messages', { 
          method: 'POST',
          headers: headers, // change this line
          body: JSON.stringify(params)
        })
      },

      // Add this function
      update(params, id) {
        return fetch(`/messages/${id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(params)
        })
      },
      // ...rest of code
    }
    ```
  * In the JavaScript file, update the event listener for the flag button in the messagesUI.addEventListener function:
    ```javascript 
    messagesUI.addEventListener("click", event => {
      const { target } = event;
      // Above Messages...

      // Add this code
      if (target.matches('.flag-link')) {
        Message.update({ flagged: target.dataset.flag === "false" ? true : false }, target.dataset.id)
        .then(() => {
          refreshMessages();
        })
      }
      // ...rest of code
    });
    ```
  * Update the rendering of messages in the refreshMessages function to reflect the flagged status by changing the background color and include a flag button:
    ```javascript 
    messageUI.innerHTML = messages.map(message => {
      return `<li>
                // Add this next line
                <li style="background:${message.flagged ? "lightblue" : "lightpink"}">
                
                <strong>${message.username}</strong> - ${message.body}
                
                // Add this next button(next 3 lines)
                <button>
                  <i data-id=${message.id} data-flag=${message.flagged} class="flag-link">flag</i>
                </button>
                // End of added code

                <button data-id="${message.id}" class="delete-button">
                  Delete
                </button>
              </li>`
      }).join('')
    ```


---
# Labs for JS AJAX Basics:

### [Lab] Chatr: Add User Names to Messages
([Back to Steps](#add-user-names-to-messages))
* All of today's labs build upon the Chatr Express app!

* You can clone a new copy form [**here**](https://github.com/CodeCoreYVR/chatr-express), or build from the directory used in lecture.  Either way, you will need to update the directory with the code from lecture.

* If you do decide to clone a new project, remember to: 1. npm i, 2. npm run db:setup (See README for more info)

* Add the ability for messages to store user names and display

  * You will need to upgrade the backend to support this. It'll requires changes to models, database and routers. Don't add a **User** model. Simply add **username** string column to messages.
  * User names should be displayed to the left of messages
  * You will need a new form field for the username

* If you're interested to learn more about Sequelize migrations, follow [**these instructions**](https://sequelize.org/v3/docs/migrations/#addcolumntablenameoroptions-attributename-datatypeoroptions-options). This is not necessary for the labs, as the project is already set up.


### [Lab] Chatr: Enable Flagging
([Back to Steps](#enable-flagging))
* Add "Flag" feature for messages on the Chatr application.
  * Clicking a link "flag" (or icon) should mark the message as flagged
  * The flag icon should indicate that a message has been flagged by changing its colour or changing its icon
  * This requires changes to the routers, model & database in addition to the JS.

