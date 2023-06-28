# <u style="color:blue;">README</u>

## <u style="color:lightgreen;">Commands To Run App From Clone</u>

- On amazon rails app:
  - $ `rails s`
    - or
    - $ `rails server`
- On Amazon_SPA app:
  - Open Amazon_SPA/index.html
  - Click on "Start Live Server" in bottom right corner of VSCode
    - or
    - $ `open index.html`
- Open browser and navigate to:
  - [`localhost:5500/`](http://localhost:5500/)

# <p> </p>

---

## <u style="color:lightgreen;">Steps/Commands Used to Create App From Scratch</u>

### <u style="color:coral;">JS Single Page Application 1, 2, 3:</u>

### JS SPA: Amazon SPA - Enable CORS Support

([Back to Labs](#lab-amazon-spa-enable-cors-support))

- Create a separate app
- $ `mkdir Amazon_SPA`
- $ `cd Amazon_SPA`
- $ `code index.html`
- $ `mkdir stylesheets`
- $ `mkdir javascripts`
- $ `code stylesheets/style.css`
- $ `code javascripts/main.js`
- _./index.html_
  - ```html
    <!DOCTYPE html>
    <html lang="en">
    	<head>
    		<meta charset="UTF-8" />
    		<title>Amazon SPA</title>
    		<link rel="stylesheet" href="stylesheets/style.css" />
    	</head>
    	<body>
    		<h1>Amazon SPA</h1>
    		<script src="javascripts/main.js"></script>
    	</body>
    </html>
    ```
- _./javascripts/main.js_
  - ```javascript
    console.log("Hello World!");
    ```
- Make sure javascripts/main.js is loaded in index.html:
  - In rails app:
    - $ `rails s`
  - In Amazon_SPA app:
    - $ `open index.html`
  - In browser:
    - Open console
    - Should see "Hello World!"
- _./javascripts/main.js_
  - ```javascript
    fetch("http://localhost:3000/api/v1/products")
    	.then((response) => response.json())
    	.then(console.log);
    ```
- In browser:
  - refresh page
  - Open console
  - You should see a CORS error
- In rails app:

  - _.Gemfile_
    ```ruby
    gem 'rack-cors'
    ```
  - $ `bundle i`
  - $ `code config/initializers/cors.rb`
  - _./config/initializers/cors.rb_

    ```ruby
    Rails.application.config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'localhost:5500', '127.0.0.1:5500' # replace with the domain of your SPA

        resource(
          '/api/*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
        )
      end
    end
    ```

  - $ `rails s`

- In browser:
  - refresh page
  - Open console
  - You should see an array of products

### JS SPA: Amazon SPA Product Show

([Back to Labs](#lab-amazon-spa-product-show))

- _./index.html_

  - Add bootstrap, css, js, and html for product-index

  ```html
    // existing code...
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./stylesheets/styles.css">

    <title>Amazon SPA</title>
  </head>
  <body>
    <div class="grid-container">
      <div class="container mt-2">
        <div class="content-container">
          <div class="container mt-5">
            <div id="product-index" class="card border-light mx-auto"></div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <script src="./javascripts/main.js"></script>
    // existing code...
  ```

- _./javascripts/main.js_
  - Add:
    - AJAX helper for product index
    - DOM helper for creating elements
    - Event listener for loading of page
    - Create function for adding products to DOM and all it's tags
- Test if product-index is displaying in browser
  - Open rails amazon app in second window or in a new terminal
    - $ `rails s`
  - Open Amazon_SPA app in browser
  - Products should be displayed
- _./index.html_
  - Add:
    ```html
    // existing code...
    <div class="container mt-5">
    	<div id="product-index" class="card border-light mx-auto"></div>
    	// Add below lines
    	<div id="product-show"></div>
    	<div class="text-center">
    		<button id="back-button" class="btn btn-secondary">Back</button>
    	</div>
    	// End of added lines
    </div>
    /// ...existing code
    ```
- _./javascripts/main.js_
  - Add:
    - Event listener for product index '<a>' tags being clicked
    - Function for displaying product show
    - Event listener for back button
    - Function for displaying reviews
    - Have product-index display on page load and product-show block(hidden), swap at end of productShow function
- Test if product-show is displaying in browser, back button works, and only product-show or product-index shows at any one time.
  - Open rails amazon app in second window or in a new terminal
    - $ `rails s`
  - Open Amazon_SPA app in browser
  - Products should be displayed
  - Click on a product
  - Product show should be displayed
  - Click on back button
  - Product index should be displayed

### JS SPA: Amazon SPA Navigation Bar

([Back to Labs](#lab-amazon-spa-navigation-bar))

- ./javascripts/main.js
  - Add toggleDisplayNone function to toggle display none on and off which is more versatile as we scale up the app.
    - This will set all pages to display none and then set the page we want to display to display block.
- Check if everything is still working in the browser
- ./index.html
  - Add navigation bar
    - data-page attribute to each nav link
    - Make sure each page has a unique id
- ./javascripts/main.js
  - Add:
    - Event listener for nav links
      - Prevent default
      - If target.dataset.page exists then call toggleDisplayNone function
- Check if everything is still working in the browser

### JS SPA: Amazon SPA Product New & Create

([Back to Labs](#lab-amazon-spa-product-new--create))

- ./index.html
  - Add:
    - Make sure each page has a unique id
    - data-page attribute to 'product-new' nav link
- ./app/controllers/api/application_controller.rb
  - Comment out:
    - skip_before_action :verify_authenticity_token
- ./config/initializers/cors.rb
  - ```ruby
    # existing code...
    resource(
          '/api/*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true, # Add this line
        )
    # existing code...
    ```
- ./config/environments/development.rb
  - ```ruby
    # existing code...
    # Allow forgery protection to be turned off in development
    config.action_controller.allow_forgery_protection = false
    config.action_controller.default_protect_from_forgery = false
    # existing code...
    ```
- ./app/controllers/api/v1/sessions_controller.rb
  - Add: status: 'Logged in' to json response if save successful
- ./app/controllers/api/v1/products_controller.rb
  - Change if safe successful render from rendering just product.id to rendering the entire product
- ./javascripts/main.js
  - Add:
    - Session helper for creating new session
      - I'm signing in automatically on page load as creating login/sessions were not mentioned in the lab.
      - Make sure to add `credentials: 'include'` to fetch request otherwise cookies will not be sent in the request.
    - Call Session.create on page load // again, this is not normal, however the lab did not mention creating a login/session but we need to be logged in to create a product.
    - Event listener for product-new nav link
      - Prevent default
      - If target.dataset.page exists then call toggleDisplayNone function
    - Product create helper
      - `credentials: 'include'` to fetch request otherwise cookies will not be sent in the request.
    - Function for creating new product
      - Prevent default
      - Get form data
      - Create new product
      - If successful then call renderProduct function else toggleDisplayNone function to display product-new page again
- Check if everything is still working in the browser

### JS SPA: Amazon SPA Product Edit

([Back to Labs](#lab-amazon-spa-product-edit))

- ./index.html
  - Add:
    - Add a div with a unique id for product-edit
    - data-page attribute to 'product-edit' nav link
- ./javascripts/main.js
  - Add:
    - Product edit helper
      - `credentials: 'include'` to fetch request otherwise cookies will not be sent in the request.
    - Function for editing product
      - Prevent default
      - Get form data
      - Edit product
      - Event listener for product-edit button
        - Prevent default
        - If successful then call renderProduct function else toggleDisplayNone function to display product-edit page again
- Check if everything is still working in the browser
### JS SPA: Amazon SPA Product Delete
([Back to Labs](#lab-amazon-spa-product-delete))
* ./javascripts/main.js
  - Add:
    - Product destroy helper
      - `credentials: 'include'` to fetch request otherwise cookies will not be sent in the request.
    - Delete button to show page
      - Change event listener for edit button to work for edit and delete
        - Prevent default
        - Call Product.destroy
        - If successful then call renderProduct function else toggleDisplayNone function to display product-show page again


# <p> </p>

---

## <u style="color:lightgreen;">Labs</u>

### [Lab] Amazon SPA: Enable CORS Support

([Back to Steps/Commands](#js-spa-amazon-spa---enable-cors-support))

- Create a new directory for "Amazon SPA". In it, create an index.html and accompanying JavaScript and CSS files. Fill it with some starter HTML. Then, open it in Chrome. From the tab where index.html is open, try making an HTTP request to your Amazon Web API with the fetch function.

- What happens? Take care to read the error.

- Fix it by adding CORS support to your Amazon project. Restrict CORS to your Amazon's API URLs.

### [Lab] Amazon SPA: Product Show

([Back to Steps/Commands](#js-spa-amazon-spa-product-show))

- Write a function using fetch to get individual products by their id from the Amazon Web API.

- When a product from the index is clicked, use the function above to get that products detailed data and display it on the page using JavaScript. Make sure no page reload occurs. If you choose to use <node>.innerHTML to display the content, what are the risks of using that method?

[ Stretch ]

- Also, display all reviews for that product.

### [Lab] Amazon SPA: Navigation Bar

([Back to Steps/Commands](#js-spa-amazon-spa-navigation-bar))

- Create a navigation bar at the top of your SPA.

- Use it to swap between the question index page, question show page and the soon to be created question new page.

- Only one of the pages should be listed pages above should be displayed at any one time.

### [Lab] Amazon SPA: Product New & Create

([Back to Steps/Commands](#js-spa-amazon-spa-product-new--create))

- Create a function using fetch to create new products with Amazon's Web API. Test it out in the console.

- Add a Product New "page" with a form for creating new products. When the form is submitted, use the function above to create a new product with the form's data. Once the product is successfully created, show its Product show page. Make sure to refresh the Product Index.  Assignment
    Settings
    Advanced grading
    More

([Back to Steps/Commands](#js-spa-amazon-spa-product-edit))

- Create a function using fetch to edit products with Amazon's Web API. Test it out in the console.

### [Lab] Amazon SPA: Product Delete
([Back to Steps/Commands](#js-spa-amazon-spa-product-delete))
  
* Create a function using fetch to delete products with Amazon's Web API. Test it out in the console.



