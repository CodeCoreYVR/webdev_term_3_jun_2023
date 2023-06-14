# <u style="color:blue;">README</u>

## <u style="color:lightgreen;">Commands To Run App From Clone</u>
* On amazon rails app:
  * $ ``` rails s ```
    * or
    * $ ``` rails server ```
* On Amazon_SPA app:
  * Open Amazon_SPA/index.html
  * Click on "Start Live Server" in bottom right corner of VSCode
    * or
    * $ ``` open index.html ```
* Open browser and navigate to:
  * [```localhost:5500/```](http://localhost:5500/)

#  <p> </p>
---
## <u style="color:lightgreen;">Steps/Commands Used to Create App From Scratch</u>
### <u style="color:coral;">JS Single Page Application 1, 2, 3:</u>
### JS SPA: Amazon SPA - Enable CORS Support
([Back to Labs](#lab-amazon-spa-enable-cors-support))
* Create a separate app
* $ ``` mkdir Amazon_SPA ```
* $ ``` cd Amazon_SPA ```
* $ ``` code index.html ```
* $ ``` mkdir stylesheets ```
* $ ``` mkdir javascripts ```
* $ ``` code stylesheets/style.css ```
* $ ``` code javascripts/main.js ```
* *./index.html*
  * ``` html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Amazon SPA</title>
      <link rel="stylesheet" href="stylesheets/style.css">
    </head>
    <body>
      <h1>Amazon SPA</h1>
      <script src="javascripts/main.js"></script>
    </body>
    </html>
    ```
* *./javascripts/main.js*
  * ```javascript
    console.log("Hello World!")
    ```
* Make sure javascripts/main.js is loaded in index.html:
  * In rails app:
    * $ ``` rails s ```
  * In Amazon_SPA app:
    * $ ``` open index.html ```
  * In browser:
    * Open console
    * Should see "Hello World!"
* *./javascripts/main.js*
  * ```javascript
    fetch("http://localhost:3000/api/v1/products")
      .then(response => response.json())
      .then(console.log)
    ```
* In browser:
  * refresh page
  * Open console
  * You should see a CORS error
* In rails app:
  * *.Gemfile*
    ```ruby
    gem 'rack-cors'
    ```
  * $ ``` bundle i ```
  * $ ``` code config/initializers/cors.rb ```
  * *./config/initializers/cors.rb*
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
  * $ ``` rails s ```
* In browser:
  * refresh page
  * Open console
  * You should see an array of products

### JS SPA: Amazon SPA Product Show
([Back to Labs](#lab-amazon-spa-product-show))
* *./index.html*
  * Add bootstrap, css, js, and html for product-index
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
* *./javascripts/main.js*
  * Add: 
    * AJAX helper for product index
    * DOM helper for creating elements
    * Event listener for loading of page
    * Create function for adding products to DOM and all it's tags
* Test if product-index is displaying in browser
  * Open rails amazon app in second window or in a new terminal
    * $ ``` rails s ```
  * Open Amazon_SPA app in browser
  * Products should be displayed
* *./index.html*
  * Add:
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
* *./javascripts/main.js*
  * Add:
    * Event listener for product index '<a>' tags being clicked
    * Function for displaying product show
    * Event listener for back button
    * Function for displaying reviews
    * Have product-index display on page load and product-show block(hidden), swap at end of productShow function
* Test if product-show is displaying in browser, back button works, and only product-show or product-index shows at any one time.
  * Open rails amazon app in second window or in a new terminal
    * $ ``` rails s ```
  * Open Amazon_SPA app in browser
  * Products should be displayed
  * Click on a product
  * Product show should be displayed
  * Click on back button
  * Product index should be displayed


#  <p> </p>
---
## <u style="color:lightgreen;">Labs</u>

### [Lab] Amazon SPA: Enable CORS Support
([Back to Steps/Commands](#js-spa-amazon-spa---enable-cors-support))

* Create a new directory for "Amazon SPA". In it, create an index.html and accompanying JavaScript and CSS files. Fill it with some starter HTML. Then, open it in Chrome. From the tab where index.html is open, try making an HTTP request to your Amazon Web API with the fetch function.

* What happens? Take care to read the error.

* Fix it by adding CORS support to your Amazon project. Restrict CORS to your Amazon's API URLs.


### [Lab] Amazon SPA: Product Show
([Back to Steps/Commands](#js-spa-amazon-spa-product-show))
* Write a function using fetch to get individual products by their id from the Amazon Web API.

* When a product from the index is clicked, use the function above to get that products detailed data and display it on the page using JavaScript. Make sure no page reload occurs. If you choose to use <node>.innerHTML to display the content, what are the risks of using that method?

[ Stretch ]
* Also, display all reviews for that product.
