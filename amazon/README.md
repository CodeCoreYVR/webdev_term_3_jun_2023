# <u style="color:blue;">README</u>

## <u style="color:lightgreen;">Commands To Run App From Clone</u>
* $ ``` bundle i ```
* $ ``` npm i ```
  * or
  * $ ``` yarn install ```
  * or
  * $ ``` brew install yarn ```
* $ ``` rails db:create ```
* $ ``` rails db:migrate ```
* $ ``` rails db:seed ```
* For mailer:
  * $ ``` bin/delayed_job start ```
  * When you want to stop ```delayed_job```
    * $ ``` bin/delayed_job stop ```
      * You might not get an error, I did. *./tmp/pids/delayed_job.pid* isn't being created for me, so I have to manually force kill the process.
        * $ ``` ps aux | grep delayed_job ```
          * This lists all processes with ```delayed_job``` in the name and their pids
        * $ ``` kill -9 <pid> <pid> <pid> ```
* $ ``` rails s ```
  * or
  * $ ``` rails server ```
* Open browser and navigate to:
  * [```localhost:3000/```](http://localhost:3000/)
---

## <u style="color:lightgreen;">Steps/Commands Used to Create App From Scratch</u>
### <u style="color:coral;">Rails HTTP API 1 & 2:</u>
### Rails HTTP API: API - Product Index
([Back to Lab](#lab-amazon-api-product-index))
* $ ``` rails g controller api/v1/products ```
* $ ``` code ./app/controllers/api/v1/products_controller.rb ```
  * Add index action
* $ ``` code ./config/routes.rb ```
  * Add:
    * route for index action only
    * format: json to the route as default
* Make sure you have some products in the database and check the route in the browser:
  * [```localhost:3000/api/v1/products```](http://localhost:3000/api/v1/products)
  * You should see all products in JSON format
### Rails HTTP API: Amazon API - Product Show & The Serializer
([Back to Lab](#lab-amazon-api-product-show--the-serializer))
* Gemfile
  * Add: ``` gem 'active_model_serializers', '~> 0.10.2' ```
* $ ``` bundle i ```
* $ ``` rails g serializer productCollection ```
* ./app/serializers/product_collection_serializer.rb
  * Add: Product attributes
* Make sure you have some products in the database and check the route in the browser:
  * [```localhost:3000/api/v1/products```](http://localhost:3000/api/v1/products)
  * You should see all products in JSON format
* $ ``` rails g serializer product ```
* ./app/serializers/product_serializer.rb
  * Add: Product attributes
* ./app/api/v1/products_controller.rb
  * Add: 
    * ``` , each_serializer: ProductCollectionSerializer ``` to the end of the render json: line
    * Create a private method called find_product and use it as a before_action for show
    * Create a show action and render the @product as JSON
* Make sure you have some products in the database and check the route in the browser:
  * [```localhost:3000/api/v1/products/1```](http://localhost:3000/api/v1/products1)
  * You should see all products in JSON format
* $ ``` rails g serializer review ```
* ./app/serializers/review_serializer.rb
  * Add: Review attributes
* $ ``` rails g serializer user ```
* ./app/serializers/user_serializer.rb
  * Add: User attributes
* ./app/serializers/product_serializer.rb
  * Add: 
    * Make sure user belongs to product and add user serializer with seller alias
    * Make sure reviews belong to product and add review serializer
* Make sure you have some products in the database and check the route in the browser:
  * [```localhost:3000/api/v1/products/1```](http://localhost:3000/api/v1/products1)
  * You should see all products in JSON format
### Rails HTTP API: API - Sessions Controller
([Back to Lab](#lab-amazon-api-sessions-controller))
* $ ``` rails g controller Api::Application --no-assets --no-helper --skip-template-engine  ```
* ./app/controllers/api/application_controller.rb
  * Add: 
    * ``` skip_before_action :verify_authenticity_token ```
* $ ``` rails g controller api/v1/sessions --no-helper --skip-template-engine --no-assets ```
* ./app/controllers/api/v1/sessions_controller.rb
  * Add: 
    * ``` skip_before_action :verify_authenticity_token ```
    * ``` before_action :find_user, only: [:create] ```
    * ``` def create ```
    * ``` def destroy ```
* ./config/routes.rb
  * Add: 
    * ``` resources :sessions, only: [:create, :destroy] ```
* Typically you would use a POST request to create a session, here are two ways to test without a testing tool like postman.
  * In terminal:
    * $ ``` rails s ```
    * Open new terminal
    * To create a session, use a POST request.
      * $ ``` curl -X POST -H "Content-Type: application/json" -d '{"email":"<email>", "password":"<password>"}' http://localhost:3000/api/v1/session ```
      * You should see the user's id in the response in current terminal shell, and in the server terminal shell you should see user id and email.
    * To destroy the session, use a DELETE request.
      * $ ``` curl -X DELETE -H "Content-Type: application/json" -d '{"email":"<email>", "password":"<password>"}' http://localhost:3000/api/v1/session ```
        * You should see the user's id and email in the response within the server terminal shell.
  * In browser:
    * Open console
      * Type:
        ```javascript
        // To sign in and create a session
        fetch('http://localhost:3000/api/v1/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: '<email>',
            password: '<password>'
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
        ```
        * You should see user id
      * Type:
        ```javascript
        // To sign out and destroy a session
        fetch('http://localhost:3000/api/v1/session', {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
        ```
        * You should see a 200 response.
  * In Postman:
    * Create:
    * POST request to ```http://localhost:3000/api/v1/session```
      * Add a body with raw JSON
        ```json
        {
          "email": "<email>",
          "password": "<password>"
        }
        ```
      * You should see user id
      * Save the request in a collection called amazon-api
    * GET request to ```http://localhost:3000/api/v1/products```
      * You should see all products in JSON format
      * Save the request within the amazon-api collection
    * GET request to ```http://localhost:3000/api/v1/products/1```
      * You should see product with id 1 in JSON format
      * Save the request within the amazon-api collection
    * DELETE request to ```http://localhost:3000/api/v1/session```
      * You should see a 200 response which means session was deleted successfully
      * Save the request within the amazon-api collection
### Rails HTTP API: API - Product Create & Authentication
([Back to Lab](#lab-amazon-api-product-create--authentication))
* ./app/controllers/api/v1/application_controller.rb
  * Add under private: ``` def require_login ```
* ./app/controllers/api/v1/products_controller.rb
  * Add: 
    * ``` before_action :require_login, only: [:create] ```
    * ``` def product_params ```
    * ``` def create ```  
* ./config/routes.rb
  * Add create action: ``` resources :products, only: [:index, :show, :create] ```
* Postman:
  * POST request to ```http://localhost:3000/api/v1/products```
    * Add a body with raw JSON
      ```json
      {
        "product": {
          "title": "New Product",
          "description": "New Product Description",
          "price": 100,
          "tag_names": ["tag1", "tag2", "tag3"]
        }
      }
      ```
    * You should see the new product id in JSON format
    * Save the request within the amazon-api collection
  * Send session delete request to log out
  * Send product create request again
    * You should see a 401 response which means you are not authorized to create a product
### Rails HTTP API: API - Destroy & Update
([Back to Lab](#lab-amazon-api-destroy--update))
* ./app/controllers/api/v1/products_controller.rb
  * Add: 
    * ``` before_action :require_login, only: [:create, :update] ```
    * ``` def update ```
* ./config/routes.rb
  * Add update action: ``` resources :products, only: [:index, :show, :create, :update] ```
* Postman:
  * PATCH request to ```http://localhost:3000/api/v1/products/26```
    * Add a body with raw JSON
      ```json
      {
        "product": {
          "title": "New Product ~ Updated ~",
          "description": "New Product Description",
          "price": 100,
          "tag_names": ["tag1", "tag2", "tag4"]
        }
      }
      ```
    * You should see the updated product in JSON format
    * Save the request within the amazon-api collection
* ./app/controllers/api/v1/products_controller.rb
  * Add: 
    * ``` before_action :require_login, only: [:create, :update, :destroy] ```
    * ``` def destroy ```
* ./config/routes.rb
  * Add destroy action: ``` resources :products ```
* Postman:
  * DELETE request to ```http://localhost:3000/api/v1/products/26```
    * You should see a 200 response which means the product was deleted successfully
    * Save the request within the amazon-api collection
* ./app/models/ability.rb
  * Add:
    * ``` alias_action :create, :update, :destroy, :read, to: :crud ```    
  * Change:
    * ``` can [:update, :delete], [Product, Review], user_id: user.id ```
    * To:
      * ``` can :crud, [Product, Review], user_id: user.id ```
* ./app/controllers/api/v1/products_controller.rb
  * Add: 
    * ``` def authorize ``` to render 403 status code unless can? :cred check passes
    * ``` before_action :authorize, only: [:update, :destroy] ``` 
* Postman:
  * Send session delete request to log out
  * DELETE request to ```http://localhost:3000/api/v1/products/26```
    * You should see a 403 response which means you are not authorized to delete the product
    * Save the request within the amazon-api collection
  * PATCH request to ```http://localhost:3000/api/v1/products/26```
    * You should see a 403 response which means you are not authorized to update the product
    * Save the request within the amazon-api collection
* ./app/controllers/products_controller.rb
  * Change can check to :crud in:
    * ``` def update ```
    * ``` def destroy ```
* ./app/controllers/reviews_controller.rb
  * Change can check to :crud in:
    * ``` def destroy ```
* ./app/views/products/show.html.erb
  * Change can check to :crud in all instances of:
    * ``` <% if can? :update, @product %> ```
    * ``` <% if can? :delete, @product %> ```
    * ``` <% if can? :delete, @review %> ```
* [localhost:3000/session/new](http://localhost:3000/session/new)
  * Sign in
* [localhost:3000/products/new](http://localhost:3000/products/new)
  * Create a product
* [localhost:3000/products/27](http://localhost:3000/products/27)
  * You should see the product and reviews edit and delete buttons/links
* Sign out 
* [localhost:3000/session/new](http://localhost:3000/session/new)
  * Sign in as a different user
* [localhost:3000/products/27](http://localhost:3000/products/27)
  * You should not see the product and reviews edit and delete buttons/links


---
#  <p> </p>
## <u style="color:lightgreen;">Labs & Exercises:</u>

### [Lab] Amazon API: Product Index
([Back to Steps](#rails-http-api-api---product-index))
* Begin building a JSON Web API for Amazon.
  1. Firstly, create an api versioned controller of the regular ProductsController (i.e. Api::V1::ProductsController.)
  2. Add an index action and serve all products as JSON.


### [Lab] Amazon API: Product Show & The Serializer
([Back to Steps](#rails-http-api-amazon-api---product-show--the-serializer))
* Continue building on the Amazon's Web API.

* Add support for the Product Show. Use Active Model Serializer to customize its JSON response. The response should have the following:
  * Every Product column except for user_id
  * The user association aliased to seller which only contain the following columns:
    * id
    * first_name
    * last_name
    * email
    * full_name
  * All associated reviews where each review only contains the following columns:
    * id
    * body
    * rating


### [Lab] Amazon API: Sessions Controller
([Back to Steps](#rails-http-api-api---sessions-controller))
* Create a Api::V1::SessionsController which will set the user_id in the session..
  * Add a create action.
  * Route sessions#create to a route that begins with /api/v1/ like the Api::V1::ProductsController
  * Create an Api::ApplicationController then (this part is necessary to receive POST requests in api controllers):
    * Skip verifying the authenticity token
    * Have Api::V1::ProductsController inherit from Api::ApplicationController
  * In the create action, do the following:
    * Find a user by their email from the params (i.e. params[:email].)
    * Verify the user's password (i.e. params[:password].)
    * If verified, set the user_id in the session.
    * If not verified, respond with a :not_found or 404 status code.


### [Lab] Amazon API: Product Create & Authentication
([Back to Steps](#rails-http-api-api---product-create--authentication))
* Add support for creating Products in the Api::V1::ProductsController. Creating products requires a current_user. Require authorization to access JSON routes. You will need to create a version of authenticated_user! in the Api::ApplicationController for all Api controllers.


### [Lab] Amazon API: Destroy & Update
([Back to Steps](#rails-http-api-api---destroy--update))
* Add support for destroying and updating Products through the Api::V1::ApplicationController.
