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
* ./index.html
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
* ./javascripts/main.js
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
* ./javascripts/main.js
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
  * .Gemfile
    ```ruby
    gem 'rack-cors'
    ```
  * $ ``` bundle i ```
  * $ ``` code config/initializers/cors.rb ```
  * ./config/initializers/cors.rb
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



#  <p> </p>
---
## <u style="color:lightgreen;">Labs</u>

### [Lab] Amazon SPA: Enable CORS Support
([Back to Steps/Commands](#js-spa-amazon-spa---enable-cors-support))

* Create a new directory for "Amazon SPA". In it, create an index.html and accompanying JavaScript and CSS files. Fill it with some starter HTML. Then, open it in Chrome. From the tab where index.html is open, try making an HTTP request to your Amazon Web API with the fetch function.

* What happens? Take care to read the error.

* Fix it by adding CORS support to your Amazon project. Restrict CORS to your Amazon's API URLs.
