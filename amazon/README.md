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
### <u style="color:coral;">Rails HTTP API</u>
#### <p style="color:lightblue;">Rails HTTP API: API - Product Index</p>
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
#### <p style="color:lightblue;">Rails HTTP API: Amazon API - Product Show & The Serializer</p>
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


---
#  <p> </p>
## <u style="color:lightgreen;">Labs & Exercises:</u>

### [Lab] Amazon API: Product Index
([Back to Steps](#rails-http-api-api-product-index))
* Begin building a JSON Web API for Amazon.
  1. Firstly, create an api versioned controller of the regular ProductsController (i.e. Api::V1::ProductsController.)
  2. Add an index action and serve all products as JSON.

### [Lab] Amazon API: Product Show & The Serializer
([Back to Steps](#rails-http-api-amazon-api---product-show--the-serializer))
Continue building on the Amazon's Web API.

Add support for the Product Show. Use Active Model Serializer to customize its JSON response. The response should have the following:
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


