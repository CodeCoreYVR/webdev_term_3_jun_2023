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
#### <p style="color:lightblue;">Rails HTTP API: API Product Index</p>
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

---
#  <p> </p>
## <u style="color:lightgreen;">Labs & Exercises:</u>

### [Lab] Amazon API: Product Index
([Back to Steps](#rails-http-api-api-product-index))
* Begin building a JSON Web API for Amazon.
  1. Firstly, create an api versioned controller of the regular ProductsController (i.e. Api::V1::ProductsController.)
  2. Add an index action and serve all products as JSON.

