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
### <u style="color:coral;">Rails Basics:</u>
#### <p style="color:lightblue;">Rails Basics: Set up the Amazon Application</p>
* $ ``` rails new amazon -T -d postgresql --skip-git ```
* $ ``` cd amazon ```
* $ ``` bundle i ```
  * or
  * $ ``` bundle install ```
* $ ``` code .gitignore ```
  * Added files and directories to ignore when committing and pushing to github. These files and directories are easily generated after cloning by using the commands under the "To Run" section above.
* $ ``` rails s ```
  * Open browser and check if [```localhost:3000/```](https://localhost:3000) displays rails welcome page
#### <p style="color:lightblue;">Rails Basics: Build Home and About Pages</p>
* $ ``` rails g controller staticPages ```
* *./config/routes.rb*
  * Add: Route for **GET** home
* *./app/controllers/static_pages_controller.rb*
  * Add: **home** method
* *./app/views/layouts/application.html.erb*
  * Add: ```nav``` bar and ```link_to home_path```
* $ ``` code app/views/static_pages/home.html.erb ```
  * Add: welcome message
* *./config/routes.rb*
  * Add: Route for **GET** about
* *./app/controllers/static_pages_controller.rb*
  * Add: ```about``` method
* *./app/views/layouts/application.html.erb*
  * Add: ```link_to about_path```
* $ ```code app/views/static_pages/about.html.erb```
  * Add: ```about``` content
* *./app/views/layouts/application.html.erb*
  * Add: ```link_to contact_us_path```
  <!-- this will throw an error as there is no route or view page for contact_us yet -->
#### <p style="color:lightblue;">Rails Basics: Build a Contact Us Page</p>
* *./config/routes.rb*
  * Add: Route for **GET** ```contact_us```
* *./app/controllers/static_pages_controller.rb*
  * Add: ```contact_us``` method
* $ ``` code app/views/static_pages/contact_us.html.erb ```
  * Add: ```contact_us``` content and form
* *./config/routes.rb*
  * Add: Route for **POST** ```contact_us```
* *./app/controllers/static_pages_controller.rb*
  * Add: Logic in ```contact_us``` method so you can know in your view page if the form has been submitted or not
* *./app/views/static_pages/contact_us.html.erb*
  * Add: 
    *Ff statement to display message instead if form has already been submitted
    * ```, data: { turbo: false } ``` to form so turbo-rails won't cause a conflict when rendering the same page.
#### <p style="color:lightblue;">Rails Basics: Added Bootstrap</p>
* ```Gemfile```
  * add:
    ```
    gem 'bootstrap', '~> 5.3.0.alpha3'
    gem 'jquery-rails'
    ```
* $ ``` bundle i ```
* *./app/assets/stylesheets/application.css*
  * Rename to ```application.scss```
  * Add:  
    ```
    @import "bootstrap";
    @import "custom";
    ``` 
* $ ``` code app/assets/stylesheets/custom.css ```
  * Add: desired css
* $ ``` mkdir app/assets/javascript ```
* $ ```code app/assets/javascript/application.js```
  * Add:
    ```
    //= require jquery3
    //= require popper
    //= require bootstrap
    ```
* Added bootstrap classes to:
  * *./app/views/static_pages/
      {
        application.html.erb,
        home.html.erb,
        about.html.erb,
        contact_us.html.erb
      }*

### <u style="color:coral;">Active Record:</u>
#### <p style="color:lightblue;">Active Record: Product Model</p>
* $ ``` rails generate model Product title:string description:text price:integer ```
* $ ``` rails db:migrate ```
* $ ``` rails console ```
  ```
  > product = Product.create(title: "Product Title", description: "Product Description", price: 100)
  > Product.find(product.id)
  > product.update(title: "New Product Title")
  > product.update(title: "New Product Title")
  > product.destroy
  > exit
  ```
* *./db/seeds*
  * Add:
    * ``` Product.destroy_all ```
    * Loop to create **X** number of products using faker for names
    * Print to terminal number of products
* $ ``` rails db:seed ```
  * ``` rails db:reset ``` does the following:
    * $ ``` rails db:drop ```
    * $ ``` rails db:create ```
    * $ ``` rails db:migrate ```
    * $ ``` rails db:seed ```
* $ ``` rails console ```
  ```
  > Product.count
  > Product.all
  > exit
  ```
#### <p style="color:lightblue;">Active Record: Product Model Modification</p>
* $ ``` rails generate migration ChangePriceToFloatInProducts ```
* *./db/migrate/...date_numbers..._chang_price_to_float_in_products.rb*
  * Add:
    ``` 
    change_column :products, :price, :float 
    ```
* $ ``` rails db:migrate ```
#### <p style="color:lightblue;">Active Record: Product Model Validations</p>
* *./app/models/product.rb*
  * Add: validations to model
* $ ``` rails c ```
  * or
  * $ ``` rails console ```
  * Check if validations are working:
    ```
    > p = Product.create("description" => "shouldn't work because title isn't present", "price" => 2)
    > p = Product.create("title" => "shouldn't work because description isn't present", "price" => 2)
    > p = Product.create("title" => "Shouldn't work because description is less than 10 characters", "description" => "nine char" "price" => 2)
    > p = Product.create("title" => "should work fine", "description" => "should work fine", "price" => 2)
    exit
    ```
#### <p style="color:lightblue;">Active Record: Product Model Modification</p>
* *./app/models/product.rb*
  * Add: callback methods
  * Call the methods before product saves
* $ ``` rails c ```
  * Check if callback methods are working correctly by creating products and see if the callback methods altered the content before validation.
    ```
    > p = Product.create("description" => "shouldn't work because title isn't present", "price" => 2)
    > p = Product.create("title" => "shouldn't work because description isn't present", "price" => 2)
    > p = Product.create("title" => "Shouldn't work because description is less than 10 characters", "description" => "nine char" "price" => 2)
    > p = Product.create("title" => "should work fine", "description" => "should work fine", "price" => 2)
    exit
    ```
#### <p style="color:lightblue;">Active Record: Product Model Custom Methods</p>
* *./app/models/product.rb*
  * Add: Class method
* $ ``` rails c ```
  * Check if Class method works
    ```
    > Product.search('de')
    ```

### <u style="color:coral;">CRUD:</u>
#### <p style="color:lightblue;">CRUD: New and Create</p>
* *./config/routes.rb*
  * Add: **GET** route for ```new``` action
* $ ``` rails g controller products ```
* *./app/controllers/products_controller.rb*
  * Add: ```new``` method
  * Create new instance of Product
* $ ``` code ./app/views/products/new.html.erb ```
  * Add: 
    * ``` form_to @product ``` or ``` product_new_path ```
    * Contents of form
* *./config/routes.rb*
  * Add: **POST** route for ```create``` action
* *./app/controllers/products_controller.rb*
  * Add: 
    * Create method
    * Private product_params method
    * Rest of content
    * ``` redirect_to products_path ```
#### <p style="color:lightblue;">CRUD: Show and Index</p>
* *./config/routes.rb*
  * Add: **GET** route for ```index``` action
* *./app/controllers/products_controller.rb*
  * Add: ```index``` method
  * Create ``` @products ``` array
* $ ``` code ./app/views/products/index.html.erb ```
  * Loop through ``` @products ``` and and display
  * Titles should be links to ``` product_path ```
* *./config/routes.rb*
  * Add: **GET** route for ```show``` action
* *./app/controllers/products_controller.rb*
  * Add: ```show``` method
  * Declare ``` @product ``` and find Product by params id
* $ ``` code ./app/views/products/show.html.erb ```
  * Display product title, description, and price
  * Use ``` number_by_currency ``` to add $ and .00
* *./app/views/layouts/application.html.erb*
  * Add: 
    * Link for Products
    * Link for New
#### <p style="color:lightblue;">CRUD: Destroy</p>
* *./config/routes.rb*
  * Add: **DELETE** route for ```destroy``` action
* *./app/controllers/products_controller.rb*
  * Add: ```destroy``` method
  * Declare ```@product``` and find Product by params id
* *./app/views/products/show.html.erb*
  * Add: 
    * ```button_to``` delete
    * Include ```destroy_product_path``` and ```method: :delete```
#### <p style="color:lightblue;">CRUD: Edit and Update</p>
* *./config/routes.rb*
  * Add: **GET** route for ```edit``` action
* *./app/controllers/products_controller.rb*
  * Add: ```edit``` method
  * Declare ```@product``` and find Product by params id
* *./app/views/products/show.html.erb*
  * Add: ```link_to``` edit
  * Include ```edit_product_path``` and/or ```@product```
* $ ```code ./app/views/products/edit.html.erb```
  * Add: Content for edit form
  * Send form to ```update_product_path``` and/or ```@product```
* *./config/routes.rb*
  * Add: **PATCH** route for ```update``` action
* *./app/controllers/products_controller/rb*
  * Add: 
    * ```update``` method
      * Declare ```@product``` and find Product by params id
      * if product updates ```redirect_to product_path```

### <u style="color:coral;">One to Many:</u>
#### <p style="color:lightblue;">One to Many: Creating Reviews</p>
* $ ```rails generate model Review rating:integer body:text product:references```
* *./config/routes.rb*
  * Switch from custom product routes to resources
  * Add: review resources within products for create action only
* *./app/models/product.rb*
  * ```has_many :reviews, dependent: :destroy```
* *./app/models/review.rb*
  * ```belongs_to :product```
  * Add: Rating validations to only allow between 1-5
* $ ```rails g controller reviews```
* *./app/controllers/reviews_controller.rb*
  * Add: 
    * ```create``` method
    * Declare ```@product``` and find Product by params ```:product_id```
    * Create a ```review_params``` private method to require review and permit only rating and body
    * Declare ```@review``` and create a review with ```review_params```
    * ```redirect_to product_path @product```
* *./app/controllers/products_controller.rb*
  * Within ```show``` method declare ```@review``` and create new instance from ```Review```
* *./app/views/products/show.html.erb*
  * Add: review form to create new product review
  * Use ```product_reviews_path(@product)``` or ```[@product, @review]```
  * Check if there are any ```@product.reviews```
  * If so loop through them and display rating and body
#### <p style="color:lightblue;">One to Many: Reviews Controller Create</p>
* *./app/controllers/reviews_controller.rb*
  * Add: if conditional for if review saves
  * **if** saves 
    * ```redirect_to @product``` or ```product_path @product```
  * **else** 
    * render products show page with error message
* *./app/controllers/reviews_controller.rb*
  * Add conditional: 
    * **if** ```@review.save``` 
      * **then** ```redirect_to @product```
    * **else** ```render 'products/show'```
  * for reviews to display in desc order add:
    * ```@reviews = @product.reviews.order(created_at: :desc)```
* *./app/controllers/products_controller.rb*
  * In ```show``` action add:
    * ```@reviews = @product.reviews.order(created_at: :desc) || []```
  * Since we're here, in ```index``` action add:
    * ```.order(created_at: :desc)``` to end of ```Product.all```
* *./app/views/products/show.html.erb*
  * Change reviews conditional to be ```if @reviews exist || @reviews != []```
  * In the review form we have to switch to using url instead of path helper and tell the form to use post method 
    * ```url: product_reviews_path(@product)```
    * ```method: :post```
#### <p style="color:lightblue;">One to Many: Reviews Controller Destroy</p>
* *./config/routes.rb*
  * Add: ```:destroy``` to reviews ```only:``` array
* *./app/controllers/reviews_controller.rb*
  * Add: 
    * ```destroy``` action method
    * Make define ```@product``` in the ```destroy``` action or as a custom ```before_action```
    * Declare ```@review``` and find review by params :id
    * Destroy ```@review```
    * ```redirect_to product_path(@product)```
* *./app/views/products/show.html.erb*
  * Add: 
    * ```link_to``` to each review
    * ```product_review_path(@product, review)```
    * ```method: :delete```
* ```link_to``` uses javascript to submit requests using **DELETE** method. this is handled by rails UJS library. 
  newer versions of rails require you to explicitly include the UJS code.
  * If newer rails:
    * *./app/assets/javascripts/application.js*
      * Add: 
        ```
        //= require rails-ujs
        ```
    * *./app/views/layouts/application.html.erb*
      * Add to head:
        ```
        <%= csrf_meta_tags %>
        <%= javascript_include_tag 'application' %>
        ```

### <u style="color:coral;">Authentication:</u>
#### <p style="color:lightblue;">Authentication: User Model</p>
* $ ```rails generate migration CreateUsers first_name:string last_name:string email:string password_digest:string```
* $ ```rails generate migration AddUserToReviews user:references```
* $ ```rails generate migration AddUserToProducts user:references```
* $ ```rails db:migrate```
* $ ```rails generate model User first_name:string last_name:string email:string password_digest:string```
* *./app/models/user.rb*
  * Add: ```has_many``` for products and reviews
* *./app/models/product.rb*
  * Add: ```belongs_to user```
* *./app/models/review.rb*
  * Add: ```belongs_to user```
* Make sure tables are connected correctly 
  * $ ```rails c```
    ```
    > user = User.create(first_name: "John", last_name: 'Doe', email: "johndoe@example.com", password_digest: "password")
    > product = user.products.create(title: "Product Name", description: "Product description", price: 5.009)
    > review = Review.create(user: user, product: product, rating: 4, body: "Great product!")
    > exit
    ```
#### <p style="color:lightblue;">Authentication: Create Seeds for User and Review</p>
* *Gemfile*
  * Uncomment out ```bcrypt```
* $ ```bundle i```
* *./db/seeds.rb*
  * Add:
    * ```User.destroy_all``` & ```Review.destroy_all```
    * Loop to create **X** number of users and reviews using faker for names
    * Print to terminal number of users and reviews 
* *./db/seeds.rb*
  * Encrypt password before saving
* *config/routes.rb*
  * Add: Resources for user new only
* $ ```rails g controller user```
* *./app/controllers/users_controller.rb*
  * Add: 
    * ```new``` action method
    * Create new instance of ```User```
* $ ```code ./app/views/users/new.html.erb```
  * Add: Contents for lab
  * form should use ```users_path```
* *config/routes.rb*
  * Add: ```:create``` to user's resources
* *./app/controllers/users_controller.rb*
  * Add: 
    * ```create``` action method
    * declare ```@user``` and create a user with ```user_params```
  * **if** ```@user.save``` 
    * Add: user to session and redirect
  * **else** 
    * ```render :new``` action method
* *./config/routes.rb*
  * Add: ```:edit``` to user's resources
* *./app/controllers/users_controller.rb*
  * Add: ```edit``` action method
  * Create custom method for finding ```@user``` by params and calling it ```set_user```
* $ ```code ./app/views/users/edit.html.erb```
  * Add: 
    * Contents for editing user
    * form should use ```user_path(@user)```
* *./config/routes.rb*
  * Add: ```:update``` to user's resources
* *./app/controllers/users_controller.rb*
  * Add: 
    * ```update``` action method
    * ```:update``` to ```before_action``` set_user call
#### <p style="color:lightblue;">Authentication: Sessions Controller</p>
* *config/routes.rb*
  * Add: resources for sessions with only ```:new```
* $ ```rails generate controller Sessions new create```
* *./app/controllers/sessions_controller.rb*
  * Add: ```new``` action method
* $ ```code ./app/views/sessions/new.html.erb```
  * Create form and use ```sessions_path```
* *./config/routes.rb*
  * Add: ```:create``` action to sessions resources
* *./app/controllers/sessions_controller.rb*
  * Add: 
    * ```create``` action method
    * Declare user and find by params ```:email```
    * **if** ```use```r and ```user.authenticate``` with params ```:password``` 
      * Add user to session and redirect
    * **else** 
      * ```render :new``` action method
* *./app/models/user.rb*
  * Add: 
    * ```has_secure_password```
    * ```full_name``` method (this is for later)
* *./config/routes.rb*
  * Add: ```:destroy``` action to sessions resources
* *./app/controllers/sessions_controller.rb*
  * Add: 
    * ```destroy``` action method
    * Set session to ```nil``` then redirect
#### <p style="color:lightblue;">Authentication: Complete Authentication</p>
* *./app/views/layouts/application.html.erb*
  * Add:
    * Buttons or links to navbar for sign in, out, edit, and welcome message
    * edit - ```edit_user_path(current_user)```
    * logout - ```session_path(current_user)```
    * signup - ```new_user_path```
    * login - ```new_session_path```
* *./app/controllers/application_controller.rb*
  * Add: ```require_login``` method to check if the user is signed in
* *./app/controllers/products_controller.rb*
  * Add:
    * ```before_action``` for require_login and have it only for ```:new``` and ```:create``` action methods
    * Create custom method to ```find_user``` and call in a ```before_action``` for only ```:create``` action method
    * In ```create``` action change product creation to ```@user.product.build()```
* *./app/controllers/reviews_controller.rb*
  * Add:
    * ```before_action``` for ```require_login``` and have it only for ```:create``` action method
* *./app/views/products/show.html.erb*
  * Add:
    * ```@product.user.full_name``` to product section
    * ```review.user.full_name``` to review section

### <u style="color:coral;">Authorization & Asset Pipeline:</u>
#### <p style="color:lightblue;">Authorization & Asset Pipeline: Add Authorization</p>
* *Gemfile*
  * Add: ```gem 'cancancan'```
* $ ```bundle i```
* $ ```rails g cancan:ability```
* *./app/models/ability.rb*
  * Create guest user if one doesn't already exist
    * ```user ||= User.new```
  * Add: can check for ```:update``` and ```:delete``` for both Product and Review to confirm only owner can access
* *./app/views/products/show.html.erb*
  * ```can?``` check for product edit link
  * ```can?``` check for product delete link
  * ```can?``` check for review delete link
* *./app/controllers/products_controller.rb*
  * Add:
    * ```can? :update``` check to update action method
    * ```can? :destroy``` check to destroy action method
* *./app/controllers/products_controller.rb*
  * Add: ```can? :destroy``` check to destroy action method
$ ```rails g migration AddHiddenToReviews hidden:boolean```
$ ```rails db:migrate```
* *./app/models/ability.rb*
  * Add: can check for ```hide``` and ```unhide``` review to see if ```review.product.user = user```
* *./app/controllers/reviews_controller.rb*
  * Add: 
    * ```hide``` and ```unhide``` action methods to reviews controller
    * ```can? :hide```, ```can? :unhide``` checks before data manipulation
* *./config/routes.rb*
  * Add: ```member do put 'hide'; put 'unhide' end``` to routes
* *./app/views/products/show.html.erb*
  * Add 
    * if ```review.hidden``` and cancan checks to ```products/show.html.erb```
    * ```hidden-review``` css class to tag around the hidden review
* *app/assets/stylesheets/custom.scss*
  * Add: properties to grey out ```hidden-review```
#### <p style="color:lightblue;">Authorization & Asset Pipeline: Add Admin Panel</p>
* $ ```rails g migration AddAdminToUsers admin:boolean```
* $ ```rails db:migrate```
* *./app/models/user.rb*
  * Add: ```admin``` method to return ```true``` or ```false```
* *.config/routes.rb*
  * Add: Route or admins ```panel``` action method
* $ ```rails g controller admins```
* *./app/controllers/admins_controller.rb*
  * Add:
    * ```panel``` method helper
    * Define and create objects for users count,products count, reviews count, products array, and users array.
    * Private ```check_admin``` method to check for ```current_user``` && ```current_user.admin?```
    * ```before_action``` for ```require_login``` and ```check_admin```
* $ ```code app/views/admins/panel.html.erb```
* *./app/views/admins/panel.html.erb*
  * Add:
    * Link to ```product.title``` ```product_path(@product)```
    * Link for ```user.id``` ```edit_user_path(user)```
* *./app/models/ability.rb*
  * Add: manage all for if ```admin```
* *./app/controllers/products_controller.rb*
  * Add: In ```destroy``` action method, cancan check for ```:admin``` if so redirect to ```admin_panel_path```

### <u style="color:coral;">Introduction to Testing:</u>
#### <p style="color:lightblue;">Introduction to Testing: Test Drive a NewsArticle Model</p>
* ```Gemfile```
  * Add to: ```:development, :test``` group
    ```
    'rspec-rails'
    'factory_bot_rails'
    ```
* $ ```bundle install```
* $ ```rails generate rspec:install```
* $ ```rails generate model NewsArticle title:string description:text published_at:datetime view_count:integer```
* $ ```rails db:migrate```
* *./spec/factories/news_articles.rb*
  * Create a factory for ```news_articles```
* $ ```code ./spec/models/news_article_spec.rb```
  * Add tests for: 
    * Presence of title 
    * description
* *./app/models/news_article.rb*
  * Add validations for: 
    * Presence of title 
    * description
* $ ```rspec spec/models/news_article_spec.rb```
  * Make sure tests pass
* *./spec/models/news_article_spec.rb*
  * Add tests for: 
    * uniqueness of title 
    * Custom validation for ```published_at```
* $ ```rspec spec/models/news_article_spec.rb```
  * Make sure all tests pass
* *./app/models/news_article.rb*
  * Add: ```before_save``` callback to ```titleize``` title
* $ ```rspec spec/models/news_article_spec.rb```
  * Make sure all tests pass
* *./spec/models/news_article_spec.rb*
  * Add: test for ```publish``` method
* *./app/models/news_article.rb*
  * Add: ```publish``` method
* $ ```rspec spec/models/news_article_spec.rb```
  * Make sure all tests pass
* *./spec/models/news_article_spec.rb*
  * Add: test for published scope
* *./app/models/news_article.rb*
  * Add: published scope
* $ ```rspec spec/models/news_article_spec.rb```
  * Make sure tests pass

### <u style="color:coral;">Testing Controller & Factories:</u>
#### <p style="color:lightblue;">Testing Controller & Factories: Test Drive New and Create</p>
* ```Gemfile```
  * Add: ```'rails-controller-testing'``` gem to ```Gemfile```
  * For some unknown reason I could net get some of the important rspec methods to work without this gem, even though the documentation says those methods should work with rspec alone.
* $ ```bundle i```
* $ ```rails generate controller NewsArticles --no-helper --no-assets --no-controller-specs```
* *./spec/requests/news_articles_spec.rb*
  * Write tests for:
    * renders new template
    * Assigns a new instance of ```NewsArticle``` to ```@news_article```
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * Test should fail and say there's no route matching
* *./config/routes.rb*
  * Add: Route for only ```news_article :new``` ```action method```
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * Test should fail and say there's no ```new``` action method in ```news_articles_controller.rb```
* *./app/controllers/news_articles_controller.rb*
  * Add:
  * ```new``` action method
  * ```create``` new instance of ```NewsArticle```
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * First test fails: There's no template for ```new.html.erb```
  * Cecond test passes
* $ ```code ./app/views/news_articles/new.html.erb```
  * Add: form for creating new ```news_article``` and send it to ```new_news_article_path``` through ```@news_article```
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * Both tests should match
* *./spec/requests/news_articles_spec.rb*
  * Write tests for:
    * Create a new ```NewsArticle```
    * Does not create a new ```NewsArticle```
    * Renders the ```new``` template
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * All three should fail and say no route for ```:create```
* ```./config/routes.rb```
  * Add: ```:create``` to only section of ```news_articles``` routes
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * All three should fail and say no ```create``` action method in ```news_articles_controller.rb```
* *./app/controller/news_articles_controller.rb*
  * Add:
    * ```create``` action method
    * Conditional logic to handle valid and invalid attributes
    * Private method for ```news_articles_params```
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * All three should fail and say something related to incorrect form fields
* *./app/views/news_products_controller.rb*
  * Include all necessary form fields and correct form action
* $ ```spec ./spec/requests/news_articles_spec.rb```
  * All three should pass
#### <p style="color:lightblue;">Testing Controller and Factories: Test Drive Destroy, Show and Index</p>
* *./spec/requests/news_articles_spec.rb*
  * Add tests:
    * Renders show template
    * Renders index template
    * Successfully deletes a ```NewsArticle```
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail and say there's no route matching
* *./config/routes.rb*
  * Add: Routes for ```:show```, ```:index```, and ```:destroy``` action methods
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail and say there's no action method in ```news_articles_controller.rb``` for ```:show```, ```:index```, and ```:destroy```
* *./app/controllers/news_articles_controller.rb*
  * Add: ```:show```, ```:index```, and ```:destroy``` action methods 
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail, and say there's no template for ```show.html.erb``` and ```index.html.erb```
* $ ```code ./app/views/news_articles/show.html.erb```
  * Add: Content for labs
* $ ```code ./app/views/news_articles/index.html.erb```
  * Add: Content for labs
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * All tests should pass
#### <p style="color:lightblue;">Testing Controller and Factories: Test Drive Edit and Update</p>
* *./spec/requests/news_articles_spec.rb*
  * Add tests for:
    * Renders ```edit``` template
    * Successfully updates a ```NewsArticle``` with valid attributes
    * Does not update a ```NewsArticle``` with invalid attributes
    * Tenders the edit template when the update has invalid attributes
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail and say there's no route matching
* *./config/routes.rb*
  * Add: Routes for ```:edit``` and ```:update```
  * Or: Change ```news_articles``` routes to just ```resources :news_articles```
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail and say there's no action method in ```news_articles_controller.rb``` for ```:edit``` and ```:update```
* *./app/controllers/news_articles_controller.rb*
  * Add: ```:edit``` and ```:update``` action methods
* ```$ rspec ./spec/requests/news_articles_spec.rb```
  * The tests should fail and say there's no template for ```edit.html.erb```
* $ ```code ./app/views/news_articles/edit.html.erb```
  * Add: Content for lab
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * The tests should now pass
* *./app/views/news_articles/show.html.erb*
  * Add: edit link

### <u style="color:coral;">Testing Authentication:</u>
#### <p style="color:lightblue;">Testing Authentication: Test Drive New and Create with Users</p>
* *./spec/requests/news_articles_spec.rb*
  * Add test for:
    * Use factories to define and create a ```:user```
    * #new
      * **if** user is 'not' signed in
        * Redirects user to sign up page
      * **if** user 'is' signed in
        * Allow controller to receive ```:current_user``` and to return user
    * #create
      * **if** user is 'not' signed in
        * Redirects user to sign up page
      * **if** user 'is' signed in
        * Allow controller to receive ```:current_user``` and to return ```user```
        * Associates the news article with the signed in user
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * Should throw errors saying something about user being nil or not existing
* $ ```code ./spec/factories/users.rb```
  * Add: Content for creating a factory bot for user
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * Should throw errors saying user has no associations with ```news_articles```
* $ ```rails generate migration AddUserIdToNewsArticles user:references```
* $ ```rails db:drop```
* $ ```rails db:create```
* $ ```rails db:migrate```
* $ ```rails db:seed```
* *./spec/factories/news_articles.rb*
  * Add: user column
* *./app/models/user.rb*
  * Add: ```has_many :news_articles```
* *./app/models/news_article.rb*
  * Add: ```belongs_to :user```
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * User signed in tests should fail saying something about ```news_article.user_id = nil```
  * User 'not' signed in tests should throw errors saying not redirected to the correct page if user not signed in
* *./app/controllers/news_articles_controller.rb*
  * Connect ```current_user``` to ```news_article``` or the other way around
  * Change if not signed in, change redirect to login page
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * All tests should pass
* *./db/seeds.rb*
  * Add: ```news_articles``` to ```users```
* $ ```rails db:reset```
#### <p style="color:lightblue;">Testing Authentication: Test Drive Edit and Update with Users</p>
* *./spec/requests/news_articles_spec.rb*
  * Create ```other_user```
  * Add tests for:
    * #edit
      * **if** user is 'not' signed in
        * Redirects user to sign up page
      * **if** user 'is' signed in
        * Allow the controller to receive ```:current_user``` and to return the ```user```
        * **if** user is signed in but not owner of ```news_article```
          * redirect to ```root_path``` & alert with flash
        * **if** user is signed in and owner of ```news_article```
          * Renders ```:edit``` template and creates an instance variable of ```news_article```
    * #update
      * **if** user is 'not' signed in
        * redirects user to sign up page
      * **if** user 'is' signed in
        * Allow the controller to receive ```:current_user``` and to return the ```user```
        * **if** user is signed in but not owner of ```news_article```
          * redirect to ```root_path``` & alert with flash
        * **if** user is signed in and owner of ```news_article``` with valid params
          * Updates ```news_article``` and redirects to show page
        * **if** user is signed in and owner of ```news_article``` with invalid params
          * Does not update ```news_article``` and renders edit template
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * Tests will fail due to improper setup or missing associations
* *./app/models/ability.rb*
  * Add: cancan for ```:edit```, ```:update``` ```NewsArticles```
* *./app/controllers/news_articles_controller.rb*
  * Add: 
    * ```:edit```, ```:update``` to ```require_login```
    * cancan checks for ```edit``` and ```update``` action methods
      * edit:
        * **if** **not** ```can?``` 
          * flash and ```redirect_to root_path```
        * **else** 
          * ```can?``` ```render :edit```
      * update:
        * **if** **not** ```can?``` 
          * flash and ```redirect_to root_path```
        * **else** ```can?```
          * **if** update 
            * ```redirect_to @news_article``` show
          * **else** 
            * message, and ```render :edit``` and
* $ ```rspec ./spec/requests/news_articles_spec.rb```
  * Tests should all pass
#### <p style="color:lightblue;">Testing Authentication: User Authentication Tests</p>
* $ ```rails generate rspec:controller users```
* *./spec/requests/news_articles_spec.rb*
  * Previously trying to generate a ```news_articles``` controller the command by default created a /requests/ not /controllers/ so need to change all tests to work with http requests. this is unrelated to this lab.
* *./spec/models/user_spec.rb*
  * Add tests for:
    * #first_name
      * Should be present
    * #last_name
      * Should Review Likes be present
    * #email
      * Should be unique
    * #full_name
      * Should return ```first_name``` and ```last_name``` concatenated & titleized
* $ ```rspec ./spec/models/user_spec.rb```
  * All tests should fail as the validations and method are not yet implemented
* *./app/models/user.rb*
  * Implement the validations
* $ ```rspec ./spec/models/user_spec.rb```
  * All tests should now pass
* *./spec/requests/users_spec.rb*
  * add tests for:
    * #new
      * Should render the new template
      * Should set an instance variable of ```User``` type
    * #create
      * With valid parameters:
        * Should create a user in the DB
        * Should redirect to home page
        * Should sign the user in
      * With invalid parameters:
        * Should render the new template
        * Should not create a user in the database
* $ ```rspec ./spec/requests/users_spec.rb```
  * All tests should fail as the controller actions are not yet implemented
* *./app/controllers/users_controller.rb*
  * Make sure if user saves, it redirects to ```home_path```
* $ ```rspec ./spec/requests/users_spec.rb```
  * All tests should now pass

### <u style="color:coral;">Many to Many:</u>
#### <p style="color:lightblue;">Many to Many: Review Likes</p>
* *./config/routes.rb*
  * Nest the likes resource within ```reviews: resources :likes, only: [:create, :destroy]```
* $ ```rails g controller Likes```
* $ ```rails g migration CreateLikes user:references review:references```
* $ ```rails db:migrate```
* *./app/models/like.rb*
  * Add associations:
    ```
    belongs_to :user
    belongs_to :review
    ```
* *./app/models/user.rb*
  * Add associations:
    ```
    has_many :likes, dependent: :destroy
    has_many :liked_reviews, through: :likes, source: :review
    ```
* *./app/models/review.rb*
  * Add associations:
    ```
    has_many :likes, dependent: :destroy
    has_many :likers, through: :likes, source: :user
    ```
* *./app/models/ability.rb*
  * Add like auth for if user isn't owner of review
* *./app/controllers/likes_controller.rb*
  * Add:
    * ```find_product``` custom method
    * ```find_review``` custom method
    * ```before_actions``` for: 
      * ```:require_login```
      * ```:find_product```
      * ```:find_review```
    * ```create``` action method:
      * Create a new like associated with ```current_user```
      * Save the like and handle the response
      * cancan auth for likes
    * ```destroy``` action method:
      * Find the like associated with ```current_user```
      * Destroy the like and handle the response
      * cancan auth for likes
* *./app/views/products/show.html.erb*
  * Use ```review.likers.count``` to display the count of likes
  * Add: Conditional rendering of **"like"** or **"unlike"** link based on if current user has liked the review
* *./app/assets/stylesheets/custom.scss*
  * Add: ```.no-underline``` class to remove underline from links
* *./app/controllers/application_controller.rb*
  * Add: ```user_liked_review``` helper method to check if the current user has liked a review
#### <p style="color:lightblue;">Many to Many: Favorites</p>
* $ ```rails g model Favorite product:references user:references```
* *./db/migrations/......_create_favorites.rb*
  * Add: ```add_index :favorites, [:user_id, :product_id], unique: true```
* $ ```rails db:migrate```
* *./app/models/favorite.rb*
  * Add: ```belongs_to``` ```:user``` and ```:product```
* *./app/models/user.rb*
  * Add: ```has_many``` favorites and favorited_products
* *./app/models/product.rb*
  * Add: ```has_many``` favorites and favoritors
* *./config/routes.rb*
  * Add: ```resources :favorites, only: [:create, :destroy]``` within product's resources
* *./app/models/ability.rb*
  * Add: Favorite auth for if user isn't owner of product
* $ ```rails g controller Favorite```
* *./app/controllers/favorites_controller.rb*
  * Add:
    * ```find_product``` custom method
    * ```before_action``` for: 
      * ```:require_login```
      * ```:find_product```
    * ```create``` action method:
      * Create a new favorite associated with ```current_user```
      * Save the favorite and handle the response
      * cancan auth for favorites
    * ```destroy``` action method:
      * Find the favorite associated with ```current_user```
      * Destroy the favorite and handle the response
      * cancan auth for favorite
* *./app/views/products/show.html.erb*
  * Add: Conditional rendering of **"favorite"** or **"unfavorite"** link based on if current user has favorited the product
* *./app/controllers/application_controller.rb*
  * Add: user_```favorited_product``` helper method to check if the current user has favorited a product
* *./config/routes.rb*
  * Add: **GET** favorites to user resources
* *./app/controllers/users_controller.rb*
  * Add: 
    * ```favorites``` action method
    * Make and array out of ```favorited_products```
* $ ```code ./app/views/users/favorited.html.erb```
  * Add: loop through ```favorited_products``` and list each product with a link to product show page
* *./app/views/layouts/application.html.erb*
  * Add link to ```navbar``` for ```favorites_user_path(current_user)```

### <u style="color:coral;">More on Many to Many:</u>
#### <p style="color:lightblue;">More on Many to Many Add Tags to Products</p>
* $ ```rails g model Tag name:string:uniq && rails g model Tagging product:references tag:references```
* *./db/migrate/..._create_taggings.rb*
  * Add: ```add_index :taggings, [:product_id, :tag_id], unique: true```
* $ ```rails db:migrate```
* *./app/models/tag.rb*
  * Add:
    ``` 
    has_many :taggings, dependent: :destroy
    has_many :products, through: :taggings
    validates :name, uniqueness: true
    ```
* *./app/models/tagging.rb*
  * Add:
    ``` 
    belongs_to :product
    belongs_to :tag
    validates :tag_id, uniqueness: { scope: :product_id }
    ```
* *./app/models/product.rb*
  * Add: 
    ```
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings
    ```
* *./app/views/products/new.html.erb and edit.html.erb*
  * Add: ```text_field``` to add ```tags```
* *./app/controllers/products_controller.rb*
  * Add: 
    * ```handle_tags``` method
    * ```handle_tags``` in ```create``` and ```update``` actions
* *./app/models/product.rb*
  * Add: ```tag_names``` getter and setter methods
* *./app/models/tag.rb*
  * Add: 
    * ```before_save :titleize_name``` callback
    * Private method ```titleize_name```
* *./db/seeds.rb*
  * Add: 
    * Destroy existing tags before seeding
    * Create tags for each product in the database
    * Clear Faker unique word list after each product to ensure uniqueness
#### <p style="color:lightblue;">More on Many to Many: List Products by Tag</p>
* $ ```rails g controller Tags```
* *./app/controllers/tags_controller.rb*
  * Add:
    * ```index``` action method to list all tags
    * ```show``` action method to show a specific tag and its associated products
* *./config/routes.rb*
  * Add: ```resources :tags, only: [:index, :show]```
* $ ```mkdir app/views/tags```
  * Create a new directory for the views associated with the ```TagsController```.
* $ ```code ./app/views/tags/index.html.erb```
  * Add: Loop through each tag and display its name with a link to its show page.
* $ ```code ./app/views/tags/show.html.erb```
  * Add: Display the tag's name and loop through each of its associated products, displaying the product's name with a link to its show page.
* *./app/views/products/show.html.erb*
  * Modify: Change the display of tags to use link_to so each tag links to its show page.
#### <p style="color:lightblue;">More on Many to Many: Voting on reviews</p>
* $ ```rails g model Vote review:references user:references vote_type:boolean```
  * The ```vote_type``` is a boolean where true might represent an **upvote** and false a **downvote**.
* *./db/migrations/......_create_votes.rb*
  * Add: ```add_index :votes, [:user_id, :review_id], unique: true```
* $ ```rails db:migrate```
* *./app/models/vote.rb*
  * Add: ```belongs_to :user and belongs_to :review```
* *./app/models/user.rb*
  * Add: ```has_many :votes, dependant: :destroy```
* *./app/models/review.rb*
  * Add: ```has_many :votes, dependant: :destroy```
* *./config/routes.rb*
  * Add: ```resources :votes, only: [:create, :update, :destroy]``` within review's resources
* *./app/models/ability.rb*
  * Add: cancan rules for ```create```, ```update```. and ```destroy```
* $ ```rails g controller Votes```
* *./app/controllers/votes_controller.rb*
  * Add:
    * ```create``` action method:
      * Create a new vote associated with ```current_user``` and the specified review
      * Save the vote and handle the response
      * cancan auth for votes
    * ```update``` action method:
      * Find the vote associated with ```current_user``` and the specified review
      * Update the vote type and handle the response
      * cancan auth for vote
    * ```destroy``` action method:
      * Find the vote associated with ```current_user``` and the specified review
      * Destroy the vote and handle the response
      * cancan auth for vote
* *./app/views/reviews/_review.html.erb*
  * Add: Conditional rendering of **"upvote"** or **"downvote"** link based on if current user has voted on the review, and whether it was an **upvote** or **downvote**
* *./app/views/reviews/index.html.erb*
  * Add: Display the total number of **upvotes* and *downvotes** for each review
* *./app/controllers/reviews_controller.rb*
  * Add: Sorting of reviews by the most voted ones in the ```index``` action.

### <u style="color:coral;">Background Jobs & Mailers:</u>
#### <p style="color:lightblue;">Background Jobs & Mailers: Add Mailing</p>
* ```Gemfile```
  * Add:
    ```
    gem 'delayed_job_active_record'
    gem 'delayed_job_web'
    gem 'letter_opener', group: :development
    ```
* $ ```bundle i```
* $ ```rails generate delayed_job:active_record to create the necessary migration files for DelayedJob.```
* $ ```rails db:migrate to apply the migration.```
* *./config/application.rb*
  * Add: ```config.active_job.queue_adapter = :delayed_job```
* *./config/environments/development.rb*
  * Add:
    ```
    config.action_mailer.delivery_method = :letter_opener
    config.action_mailer.perform_deliveries = true
    config.action_mailer.perform_caching = true
    ```
* *./config/initializers/setup_mail.rb*
  * Create this file and add your SMTP settings for ```ActionMailer```.
* *./app/mailers/product_mailer.rb & app/mailers/review_mailer.rb*
  * create these mailer classes and define the methods for sending emails related to products and reviews respectively.
* *./app/views/product_mailer/* & *app/views/review_mailer/*
  * Create views for the mailer methods in the above step.
* *./app/controllers/products_controller.rb* & *./app/controllers/reviews_controller.rb*
  * Update the ```create``` actions to send emails after a product/review is created. Use the delay method provided by Delayed Job to send the emails in the background.
* *./bin/delayed_job*
  * Create this file and add the required lines to start the Delayed Job worker.
* *./config/routes.rb*
  * Add: A route to access the Delayed Job web dashboard.
* open two terminals
  * $ ```bin/delayed_job start```
  * $ ```rails s```
* Open browser to [```localhost:3000/products/new```](http://localhost:3000/products/new)
  * Create a new product and check the log to see if the email was sent.
* Open browser to [```localhost:3000/products/1/reviews/new```](http://localhost:3000/products/1/reviews/new)
  * Create a new review and check the log to see if the email was sent.

---
#  <p> </p>
## <u style="color:lightgreen;">Labs & Exercises:</u>

### [Lab] Set up the Amazon Application

Set up a Rails application for `Amazon`. We will use this application to practice many of the Rails concepts in the upcoming weeks.

So make sure to do the following:
  1. Start the Rails Amazon application without tests and using Postgresql
  2. Run your application and make sure to get the welcome page from Rails


### [Lab] Build a home and about pages

Build 'home' and 'about' pages for your Amazon application that just display simple text. Build 'nav bar' to link to both pages. Include a link to the 'contact us' page in the 'nav bar'.


### [Lab] Build a contact us page

Build a 'contact us' page for your Amazon application that has a name, email and text area fields. When the user submits, it should just show a "Thank you  for contacting us!" message.


### [Lab] Product model

  Step 1
Generate a Product model for your Amazon application. Make sure it has the following attributes: title, description and price.
  - Title must be of type String
  - Description must be of type Text
  - Price must be of type Integer
Run the migration.
  Step 2
Open up the Rails console then create a product, then find it then update its title and then delete it.
  Step 3
Change your db/seeds.rb file to generate a 1000 products with Faker then run the seeds.


### [Lab] Product model modification

Generate a migration to change the type of the price field from Integer to Float. Then run the migration.


### [Exercise] Product model custom methods

Add a custom methods called search to the product model to search for a product with its title or description if it contains a specific word. For instance you should be able to do:
Product.search("car")

Which should return all the products that have the word car in it's title or description (case insensitive).

[Challenge]: Show the products that contain the searched word in their title before the ones that contain the searched word only in the description. For instance, if a product contains the word car in its title, it should before a product that only contains the word car only in the description.


### [Lab] Amazon: New and Create

This lab assumes that you have an Amazon application with a Product model that has the following attributes: title, description and price. Depending on the exercises you've followed, your application may have m
    Assignment
    Settings
    Advanced grading
    More
ore. Feel free to incorporate the extra attributes in the following labs:

Implement the following actions for your Amazon application:
1. New Action
  url: /products/new: Shows a form to create a product that should have the attributes above.
2. Create Action
  url: /products: Handles creating a product based on the form submitted in the new page.


### [Lab] Amazon: Show and Index

Implement the following actions for your Amazon application:
1. Show Action
    url: /products/:id: Displays detail product information for a product having an id of :id.
2. Index Action
    url: /products: Displays the titles of all products in the database as links to their respective show pages.
3. Update the create action to redirect to the created product's show page upon successful creation.

Bonus:
1. Display the price formatted as a currency (with two decimal points and a dollar sign beforehand).


### [Lab] Amazon: Destroy

Implement the following action for your Amazon application:
1. Destroy Action
    url: /products/:id: Handle deleting a product having an id of :id then redirect to the Product index page upon successful deletion.


### [Lab] Amazon: Edit and Update

Implement the following actions for your Amazon application:
1. Edit Action
    url: /products/:id/edit: Shows a form pre-populated with data from a product having an id of :id.
2. Update Action
    url: /products/:id: Handles updating a product then redirects to its show page on a successful update.
3. Add a link in your Products show pages to their edit page.


### [Lab] Amazon: Creating reviews

Add reviews for products in your Amazon application as follows:
  1. Product has many reviews
  2. The form to create reviews should be on the product page much like a comment section in a post of a blog.
  3. The reviews associated to products should be shown on the respective product show.
  4. Every review has rating and body (for now just have the user enter a number for the value of rating, later you will learn how to display interactive stars with javascript)
  5. Validate that body is optional but the rating is required and must be a number between 1 and 5 inclusive.

Test your association in Rails console to make sure that it works.


### [Lab] Amazon: Reviews Controller Create

Start to build the reviews controller and implement the create action as follows:
  1. Reviews can be created from the product show page
  2. If the review is created successfully, redirect back to the product show page
  3. If the review is not created successfully, then show the product show page again with errors


### [Lab] Amazon: Reviews controller destroy

1. Implement the ability to delete reviews for products by having a delete link by each review.
3. After deleting a review the user should be redirected back to the product show page.


### [Lab] Amazon: User Model

Create a user model for your Amazon application as follows:
  1. User has the following attributes: first_name, last_name, email, password_digest (all required)
  2. User has_many products
  3. User has_many reviews


### [Lab] Amazon: Sessions Controller

Create a sessions controller for your Amazon application as follows:

  1. The controller must have a new action that displays a form with an email & password`
  2. The controller must have a create action that signs in the user by setting session[:user_id] to the appropriately and redirects to the home page


### [Lab] Amazon: Complete authentication

Complete the User Authentication system for your Amazon application as follows:
  1. At the top, display the current user name and a logout link if they are signed in or display a sign up and a sign in link if they are not
  2. Enforce that the user must be signed in to create products or reviews
  3. Make sure to associate the created products and reviews to the user
  4. Display user names beside their reviews and their products


### [Lab] Add Authorization to the Amazon application

Add authorization to the amazon application as follows:
  1. Only the product owner can edit / delete a product
  2. Only the review owner can edit / delete a review

Stretch
Hide a review:
  1.  Allow the product owner to hide a review by setting a hidden field as true. Only display non-hidden reviews on the public show page. If the product owner is logged in then show the hidden review(s) greyed out and allow them to unhide it if they want.


### [Lab] Add Admin panel

Add an admin user to the Amazon application and add an admin panel accessible only by admin users with url /admin/panel that shows a page with:
  1. Number of proudcts
  2. Number of reviews
  3. Number of users

Stretch
  1. Display a list of products with their id and title in a table. The title should link to the post show.
  2. Display a list of users with their id, first_name, last_name and email.


### [Lab] Amazon: Test Drive a NewsArticle Model

Add new model, NewsArticle, to your Amazon application following the TDD process. The NewsArticle will have a title, a description, a published_at date, and a view_count.

Requirements

Validations
  1. title must be present
  2. title is unique
  3. description must be present
  4. published_at must be after created_at date (you will need to write a custom validation to implement this)

Others
  1. title gets titleized after getting saved to the database
  2. publish method that publishes a NewsArticle by setting published_at to the current date.

Stretch
  1. published scope (class method) that returns only published NewsArticle. Only articles whose published_at date comes after the current date.


### [Lab] Amazon: Test Drive New and Create

1. Start building actions for the NewsArticlesController using TDD.
2. Test drive new and create actions for the controller.


### [Lab] Amazon: Test Drive Destroy, Show and Index

Continue building actions for the NewsArticlesController using TDD.
Test drive the destroy, show and index actions. Assume that they are standard as done in class.

[Stretch]: 
Refactor your controller as follows:
  1. Have a find_news_article before_action to find the news_article for the edit / show / update / destroy actions
  2. Refactor news_article_params into a method


### [Lab] Amazon: Test Drive Edit and Update

1. Continue building actions for the NewsArticlesController using TDD.
2. Test drive the edit and update actions.


### [Lab] Amazon: Test Drive New and Create with Users

Add the following tests for NewsArticleController new and create actions:

new
  1. If a user is not signed in, redirect the user to the sign up page.
  2. If a user is signed in, all current tests should be able to pass.

create
  1. If a user is not signed in, redirect the user to the sign up page.
  2. If a user is signed in, ...
    a. all current tests should be able to pass.
    b. associates the news article with the signed in user

You will need to implement several features (e.g. user authentication, user model, user associates, etc) to make these tests pass.


### [Lab] Amazon: Test Drive Edit and Update with Users

Add the following tests for NewsArticleController edit and update actions:
edit:
  1. If a user is not signed in, redirect the user to the sign up or sign in page.
  2. If a user is signed in but is not an owner of the news article being edited, ...
    a. redirect the user to the root_page
    b. alerts the user with a flash
  3. If a user is signed in and is the owner of the news article being edited, ...
    a. all current tests should be able to pass (if there are any)
    b. renders the edit template
    c. assigns an instance variable to the campaign being edited

update:
  1. If a user is not signed in, redirect the user to the sign up page.
  2. If a user is signed in but is not an owner of the news article being updated, ...
    a. redirect the user to the root_page
    b. alerts the user with a flash
  3. If a user is signed in, is the owner of the news article being updated and parameters are valid, ...
    a. saves changes to the news article
    b. redirects to the campaign show page
  4. If a user is signed in, is the owner of the news article being updated and parameters are invalid, ...
    a. renders the edit template


### [Lab] Amazon: User Authentication Tests

Write tests for the following:
User Model:
  1. first_name must be present
  2. last_name must be present
  3. email must be unique
  4. full_name method must return first_name and last_name concatenated & titleized

Users Controller:
  1. new action
    a. renders the new template
    b. sets an instance variable of User type
  2. create action:
    a. with valid parameters: created a user in the DB, redirects to home page and signs the user in
    b. with invalid parameters: renders the new template and doesn't create a user in the database


### [Lab] Amazon: Review Likes

Implement the ability to like and un-like reviews.
  1. Add a count for the likes on each review next to the review's "like" link.
  2. A user should not be able to like his reviews.
  3. A user should only be able to like reviews if they're logged in.


### [Lab] Amazon: Favourites

Implement the ability for users to favourite and un-favourite products on the Amazon application.
  1. Only allow logged in users to use this feature.

Stretch
  1. Use different icons for the un-favourite and favourite link.
  2. Have a page for logged in users to list all the products they favourited.


### [Lab] Amazon Add Tags to Products

Add ability to tag products (one or more tags per product). Build this from scratch and don't use a gem.


### [Lab] Amazon List Products by Tag

Add the ability to explore products by tags:
  1. Add a Tag Controller with an index and use it to show a list of tags.
  2. Each tag in the index should link to a show page for that tag that also displays all associated products.
  3. Tags in the the Product show should link to the Tag's show page


### [Lab] Voting on reviews

Add the possibility for users to vote up or down on reviews as follows:

  1. Signed in users can vote up or down on any review they did not write
  2. Users can edit / remove their voting after
  3. Owners of products can vote on reviews of their products

[Stretch] 
  1. Sort the listed reviews by the most voted ones


### [Lab] Amazon: Add mailing

Setup mailing with your Rails Amazon app.
  1. Add a mailer that emails the user that created a product with the title, body, price, and link to the product

[Stretch] 
  1. Add a mailer that sends the product creator reviews when they're added. The mail should contain the review body, author and link to the review page.
