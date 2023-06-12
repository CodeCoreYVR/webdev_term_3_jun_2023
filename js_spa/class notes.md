* Create `index.html`, scripts and styles.

* Install `Live Server` or `npm i -g http-server` or, both. These allow our index.html file to run on server.

* Command `http-server -p 8081 .` from the directory of `index.html` to run the server in localhost:8081.

* Install `gem 'rack-cors', '~> 1.1', '>= 1.1.1'` to config CORS for rails. Check the documentation file for details.

* Add the following code in `application.rb` to allow all origin, all resource
```ruby
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :options]
      end
    end
```

* We can change the origin, resource and methods for security.
```ruby
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '127.0.0.1:8081'
        resource '/api/v1/*', headers: :any, methods: [:get, :post, :options]
      end
    end
```

* Now, if we run the server for index.html from different port. We will get a cors error.

* Add `deter` and `type=module` attribute to script tag.
```html
    <script deter type="module" src="./scripts/webApi.js"></script>
    <script deter type="module" src="./scripts/site.js"></script>
```

* From Frontend request to get all the questions.
```javascript
//webApi.js
const baseUrl = "http://127.0.0.1:3000/api/v1/";

async function get(path) {
    try {
        const response = await fetch(baseUrl + path);
        const jsonData = await response.json();
        return jsonData;
    }
    catch (error) {
        console.log(error);
    }
}

const webApi = { get }

export default webApi
```

* Show the questions in the home page
```javascript
\\site.js
import webApi from "./webApi.js";

webApi.get("questions")
    .then(data => {
        document.querySelector("ul#question-list").innerHTML = data.map(q => {
            return `<li>${q.id} - ${q.title}</li>`
        }).join("")
    })

```

* Add credential true in application.rb
```ruby
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '127.0.0.1:8081'

        resource '/api/v1/*', 
          headers: :any, 
          methods: [:get, :post, :options], 
          credentials: true
      end
    end
```

* Add post function in webApi.js
```javascript
async function post(path, requestBody, method) {
    
    let options = {
        method: method || 'POST',
        credentials: 'include', //need this for cookies
        headers: {
            "Content-type": "application/json",
            "mode": "cors",
        },
        body: JSON.stringify(requestBody)
    }
    
    const response = await fetch(baseUrl + path, options)
    return response.json();
}
```

* Login and create a quetion from site.js
```javascript
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
```