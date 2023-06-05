## ******************** To Run ********************
* $ bundle i
* $ npm i
  or
  * $ yarn install
  or
  * $ brew install yarn
* $ rails db:create
* $ rails db:migrate
* $ rails db:seed
* for mailer:
  * $ bin/delayed_job start
  * when you want to stop delayed_job
    * $ bin/delayed_job stop
      * you might not get an error, i did. ./tmp/pids/delayed_job.pid isn't being created for me, so i have to manually force kill the process.
        * $ ps aux | grep delayed_job
          * this lists all processes with delayed_job in the name and their pids
        * $ kill -9 <pid> <pid> <pid>
* $ rails s
  or
  * $ rails server
* Open browser and navigate to:
  * localhost:3000/
## ******************* To Create ******************
* $ rails new amazon -T -d postgresql --skip-git
* $ cd amazon
* $ bundle i
  or
  * $ bundle install
* $ code .gitignore
  * added files and directories to ignore when committing and pushing to github. These files and directories are easily generated after cloning by using the commands under the "To Run" section above.
* $ rails s
  * open browser and check if localhost:3000 displays rails welcome page
* $ rails g controller staticPages
* ./config/routes.rb
  * add route for GET home
* ./app/controllers/static_pages_controller.rb
  * add home method
* ./app/views/layouts/application.html.erb
  * add nav bar and link_to home
* $ code app/views/static_pages/home.html.erb
  * add welcome message
* ./config/routes.rb
  * add route for GET about
* ./app/controllers/static_pages_controller.rb
  * add about method
* ./app/views/layouts/application.html.erb
  * add link_to about
* $ code app/views/static_pages/about.html.erb
  * add about content
* ./app/views/layouts/application.html.erb
  * add link_to contact_us 
  <!-- this will throw an error as there is no route or view page for contact_us yet -->
* ./config/routes.rb
  * add route for GET contact_us
* ./app/controllers/static_pages_controller.rb
  * add contact_us method
* $ code app/views/static_pages/contact_us.html.erb
  * add contact_us content and form
* ./config/routes.rb
  * add route for POST contact_us
* ./app/controllers/static_pages_controller.rb
  * add logic in contact_us method so you can know in your view page if the form has been submitted or not
* ./app/views/static_pages/contact_us.html.erb
  * add if statement to display message instead if form has already been submitted
  * add data: { turbo: false } to form so turbo-rails won't cause a conflict when rendering the same page.
* Gemfile
  * add:
    * gem 'bootstrap', '~> 5.3.0.alpha3'
    * gem 'jquery-rails'
* bundle i
* ./app/assets/stylesheets/application.css
  * rename to application.scss
  * add:  
    * @import "bootstrap";
    * @import "custom"; 
* $ code app/assets/stylesheets/custom.css
  * add desired css
* $ mkdir app/assets/javascript
* $ code app/assets/javascript/application.js
  * add:
    * //= require jquery3
    * //= require popper
    * //= require bootstrap
* added bootstrap classes to:
  * ./app/views/static_pages/
      application.html.erb
      home.html.erb
      about.html.erb
      contact_us.html.erb
### Active Record
* $ rails generate model Product title:string description:text price:integer
* $ rails db:migrate
* $ rails console
  * > product = Product.create(title: "Product Title", description: "Product Description", price: 100)
  * > Product.find(product.id)
  * > product.update(title: "New Product Title")
  * > product.update(title: "New Product Title")
  * > product.destroy
  * > exit
* ./db/seeds
  * add:
    * Product.destroy_all
    * loop to create x number of products using faker for names
    * print to terminal number of products
* $ rails db:seed
  * <rails db:reset> does the following:
    * rails db:drop
    * rails db:create
    * rails db:migrate
    * rails db:seed
* $ rails console
  * > Product.count
  * > Product.all
  * > exit
* $ rails generate migration ChangePriceToFloatInProducts
* ./db/migrate/...date_numbers..._chang_price_to_float_in_products.rb
  * add:
    * change_column :products, :price, :float
* $ rails db:migrate
* ./app/models/product.rb
  * add validations to model
* $ rails c
  or
  * $ rails console
  then
  * check if validations are working:
    * p = Product.create("description" => "shouldn\'t work because title isn't present", "price" => 2)
    * p = Product.create("title" => "shouldn\'t work because description isn't present", "price" => 2)
    * p = Product.create("title" => "Shouldn\'t work because description is less than 10 characters", "description" => "nine char" "price" => 2)
    * p = Product.create("title" => "should work fine", "description" => "should work fine", "price" => 2)
    * exit
* ./app/models/product.rb
  * add callback methods
  * call the methods before product saves
* rails c
  * check if callback methods are working correctly by creating products and see if the callback methods altered the content before validation.
  * exit
* ./app/models/product.rb
  * add Class method
* rails c
  * check if Class method works
    * $ Product.search('de')
### CRUD
* ./config/routes.rb
  * add GET route for new action
* $ rails g controller products
* ./app/controllers/products_controller.rb
  * add new method
  * create new instance of Product
* $ code ./app/views/products/new.html.erb
  * add form_to @product or product_new_path
  * add contents of form
* ./config/routes.rb
  * add POST route for create action
* ./app/controllers/products_controller.rb
  * add create method
  * add private product_params method
  * add rest of content
  * redirect_to products_path
* ./config/routes.rb
  * add GET route for index action
* ./app/controllers/products_controller.rb
  * add index method
  * create @products array
* $ code ./app/views/products/index.html.erb
  * loop through @products and and display
  * titles should be links to product_path
* ./config/routes.rb
  * add GET route for show action
* ./app/controllers/products_controller.rb
  * add show method
  * declare @product and find Product by params id
* $ code ./app/views/products/show.html.erb
  * display product title, description, and price
  * use number_by_currency to add $ and .00
* ./app/views/layouts/application.html.erb
  * add link for Products
  * add link for New
* ./config/routes.rb
  * add DELETE route for destroy action
* ./app/controllers/products_controller.rb
  * add destroy method
  * declare @product and find Product by params id
* ./app/views/products/show.html.erb
  * add button_to delete
  * include destroy_product_path and method: :delete
* ./config/routes.rb
  * add GET route for edit action
* ./app/controllers/products_controller.rb
  * add edit method
  * declare @product and find Product by params id
* ./app/views/products/show.html.erb
  * add link_to edit
  * include edit_product_path and/or @product
* $ code ./app/views/products/edit.html.erb
  * add content for edit form
  * send form to update_product_path and/or @product
* ./config/routes.rb
  * add PATCH route for update action
* ./app/controllers/products_controller/rb
  * add update method
  * declare @product and find Product by params id
  * if product updates redirect_to product_path
### One to Many
* $ rails generate model Review rating:integer body:text product:references
* ./config/routes.rb
  * switch from custom product routes to resources
  * add review resources within products for create action only
* ./app/models/product.rb
  * has_many :reviews, dependent: :destroy
* ./app/models/review.rb
  * belongs_to :product
  * add rating validations to only allow between 1-5
* $ rails g controller reviews
* ./app/controllers/reviews_controller.rb
  * add create method
  * declare @product and find Product by params :product_id
  * create a review_params private method to require review and permit only rating and body
  * declare @review and create a review with review_params
  * redirect_to product_path @product
* ./app/controllers/products_controller.rb
  * within show method declare @review and create new instance from Review
* ./app/views/products/show.html.erb
  * add review form to create new product review
  * use product_reviews_path(@product) or [@product, @review]
  * check if there are any @product.reviews
  * if so loop through them and display rating and body
* ./app/controllers/reviews_controller.rb
  * add if conditional for if review saves
  * if saves redirect_to @product or product_path @product
  * if not saves render products show page with error message
* ./app/controllers/reviews_controller.rb
  * add conditional. if @review.save then redirect_to @product
  * else render 'products/show'
  * for reviews to display in desc order add:
    * @reviews = @product.reviews.order(created_at: :desc)
* ./app/controllers/products_controller.rb
  * in show action add:
    * @reviews = @product.reviews.order(created_at: :desc) || []
  * since we're here, in index action add:
    * .order(created_at: :desc) to end of Product.all
* ./app/views/products/show.html.erb
  * change reviews conditional to be if @reviews exist || @reviews != []
  * in the review form we have to switch to using url instead of path helper and tell the form to use post method 
    * url: product_reviews_path(@product)
    * method: :post
* ./config/routes.rb
  * add , :destroy to reviews only: array
* ./app/controllers/reviews_controller.rb
  * add destroy action method
    * make define @product in the destroy action or as a custom before_action
    * declare @review and find review by params :id
    * destroy @review
    * redirect_to product_path(@product)
* ./app/views/products/show.html.erb
  * add link_to to each review
    * product_review_path(@product, review)
    * method: :delete
* link_to uses javascript to submit requests using DELETE method. this is handled by rails UJS library. 
  newer versions of rails require you to explicitly include the UJS code.
  * if newer rails:
    * ./app/assets/javascripts/application.js
      * add: //= require rails-ujs
    * ./app/views/layouts/application.html.erb
      * add to head:
        * <%= csrf_meta_tags %>
        * <%= javascript_include_tag 'application' %>
### Authentication
* $ rails generate migration CreateUsers first_name:string last_name:string email:string password_digest:string
* $ rails generate migration AddUserToReviews user:references
* $ rails generate migration AddUserToProducts user:references
* $ rails db:migrate
* $ rails generate model User first_name:string last_name:string email:string password_digest:string
* ./app/models/user.rb
  * add has_many for products and reviews
* ./app/models/product.rb
  * add belongs_to user
* ./app/models/review.rb
  * add belongs_to user
* make sure tables are connected correctly, $ rails c
  * > user = User.create(first_name: "John", last_name: 'Doe', email: "johndoe@example.com", password_digest: "password")
  * > product = user.products.create(title: "Product Name", description: "Product description", price: 5.009)
  * > review = Review.create(user: user, product: product, rating: 4, body: "Great product!")
  * > exit
* Gemfile
  * uncomment out bcrypt
* $ bundle i
* ./db/seeds.rb
  * add:
    * User.destroy_all & Review.destroy_all
    * loop to create x number of users and reviews using faker for names
    * print to terminal number of users and reviews 
* ./db/seeds.rb
  * encrypt password before saving
* config/routes.rb
  * add resources for user new only
* $ rails g controller user
* ./app/controllers/users_controller.rb
  * add new action method
  * create new instance of User
* $ code ./app/views/users/new.html.erb
  * add contents for lab
  * form should use users_path
* config/routes.rb
  * add :create to user's resources
* ./app/controllers/users_controller.rb
  * add create action method
  * declare @user and create a user with user_params
  * if @user.save add user to session and redirect
  * else render :new action method
* ./config/routes.rb
  * add :edit to user's resources
* ./app/controllers/users_controller.rb
  * add edit action method
  * create custom method for finding @user by params and calling it set_user
* $ code ./app/views/users/edit.html.erb
  * add contents for editing user
  * form should use user_path(@user)
* ./config/routes.rb
  * add :update to user's resources
* ./app/controllers/users_controller.rb
  * add update action method
  * add :update to before_action set_user call
* config/routes.rb
  * add resources for sessions with only :new
* rails generate controller Sessions new create
* ./app/controllers/sessions_controller.rb
  * add new action method
* $ code ./app/views/sessions/new.html.erb
  * create form and use sessions_path
* ./config/routes.rb
  * add :create action to sessions resources
* ./app/controllers/sessions_controller.rb
  * add create action method
  * declare user and find by params :email
  * if user and user.authenticate with params :password then add user to session and redirect
  * else render :new action method
* ./app/models/user.rb
  * add: 
    * has_secure_password
    * full_name method (this is for later)
* ./config/routes.rb
  * add :destroy action to sessions resources
* ./app/controllers/sessions_controller.rb
  * add destroy action method
  * set session to nil then redirect
* ./app/views/layouts/application.html.erb
  * add buttons or links to navbar for sign in, out, edit, and welcome message
  * edit - edit_user_path(current_user)
  * logout - session_path(current_user)
  * signup - new_user_path
  * login - new_session_path
* ./app/controllers/application_controller.rb
  * add require_login method to check if the user is signed in
* ./app/controllers/products_controller.rb
  * add:
    * before_action for require_login and have it only for :new and :create action methods
    * create custom method to find_user and call in a before_action for only :create action method
    * in create action change product creation to @user.product.build()
* ./app/controllers/reviews_controller.rb
  * add:
    * before_action for require_login and have it only for :create action method
* ./app/views/products/show.html.erb
  * add:
    * @product.user.full_name to product section
    * review.user.full_name to review section
### Authorization, Asset Pipeline & Heroku
* Gemfile
  * add: cancancan gem
* $ bundle i
* $ rails g cancan:ability
* ./app/models/ability.rb
  * create guest user if one doesn't already exist
    * user ||= User.new
  * add can check for :update and :delete for both Product and Review to confirm only owner can access
* ./app/views/products/show.html.erb
  * can? check for product edit link
  * can? check for product delete link
  * can? check for review delete link
* ./app/controllers/products_controller.rb
  * add:
    * can? :update check to update action method
    * can? :destroy check to destroy action method
* ./app/controllers/products_controller.rb
  * add: can? :destroy check to destroy action method
$ rails g migration AddHiddenToReviews hidden:boolean
$ rails db:migrate
* ./app/models/ability.rb
  * add can check for hide and unhide review to see if review.product.user = user
* ./app/controllers/reviews_controller.rb
  * add: 
    * hide and unhide action methods to reviews controller
    * can? :hide, can? :unhide checks before data manipulation
* ./config/routes.rb
  * add: member do put 'hide'; put 'unhide' to routes
* ./app/views/products/show.html.erb
  * add if review.hidden and cancan checks to products/show.html.erb
  * add hidden-review css class to tag around the hidden review
* app/assets/stylesheets/custom.scss
  * add properties to grey out hidden-review
* $ rails g migration AddAdminToUsers admin:boolean
* $ rails db:migrate
* ./app/models/user.rb
  * add: admin method to return true or false
* .config/routes.rb
  * add route or admins panel action method
* $ rails g controller admins
* ./app/controllers/admins_controller.rb
  * add:
    * panel method helper
    * define and create objects for users count,products count, reviews count, products array, and users array.
    * private check_admin method to check for current_user && current_user.admin?
    * add before_action for require_login and check_admin
* $ code app/views/admins/panel.html.erb
* ./app/views/admins/panel.html.erb
  * add content for views page
    * add link to product.title product_path(@product)
    * add link for user.id edit_user_path(user)
* ./app/models/ability.rb
  * add manage all for if admin
* ./app/controllers/products_controller.rb
  * add: in destroy action method, cancan check for :admin if so redirect to admin_panel_path
### Amazon: Test Drive a NewsArticle Model
* Gemfile
  * Add to :development, :test group
    * 'rspec-rails' 
    * 'factory_bot_rails'
* $ bundle install
* $ rails generate rspec:install
* $ rails generate model NewsArticle title:string description:text published_at:datetime view_count:integer
* $ rails db:migrate
* ./spec/factories/news_articles.rb
  * Create a factory for news_articles
* $ code ./spec/models/news_article_spec.rb
  * Add tests for: 
    * presence of title 
    * description
* ./app/models/news_article.rb
  * Add validations for: 
    * presence of title 
    * description
* $ rspec spec/models/news_article_spec.rb
  * Make sure tests pass
* ./spec/models/news_article_spec.rb
  * Add tests for: 
    * uniqueness of title 
    * custom validation for published_at
* $ rspec spec/models/news_article_spec.rb
  * Make sure all tests pass
* ./app/models/news_article.rb
  * Add: before_save callback to titleize title
* $ rspec spec/models/news_article_spec.rb
  * Make sure all tests pass
* ./spec/models/news_article_spec.rb
  * Add: test for publish method
* ./app/models/news_article.rb
  * Add: publish method
* $ rspec spec/models/news_article_spec.rb
  * Make sure all tests pass
* ./spec/models/news_article_spec.rb
  * Add: test for published scope
* ./app/models/news_article.rb
  * Add: published scope
* $ rspec spec/models/news_article_spec.rb
  * Make sure tests pass
### Testing Controller & Factories
##### Test Drive New and Create
* Gemfile
  * add: rails-controller-testing gem to gemfile
  * for some unknown reason i could net get some of the important rspec methods to work without this gem, even though the documentation says those methods should work with rspec alone.
* $ bundle i
* $ rails generate controller NewsArticles --no-helper --no-assets --no-controller-specs
* ./spec/requests/news_articles_spec.rb
  * write tests for:
    * renders new template
    * assigns a new instance of NewsArticle to @news_article
* $ spec ./spec/requests/news_articles_spec.rb
  * test should fail and say there's no route matching
* ./config/routes.rb
  * add route for only news_article :new action method
* $ spec ./spec/requests/news_articles_spec.rb
  * test should fail and say there's no new action method in news_articles_controller.rb
* ./app/controllers/news_articles_controller.rb
  * add:
  * new action method
  * create new instance of NewsArticle
* $ spec ./spec/requests/news_articles_spec.rb
  * first test fails: there's no template for new.html.erb
  * second test passes
* $ code ./app/views/news_articles/new.html.erb
  * add: form for creating new news_article and send it to new_news_article_path through @news_article
* $ spec ./spec/requests/news_articles_spec.rb
  * both tests should match
* ./spec/requests/news_articles_spec.rb
  * write tests for:
    * Create a new NewsArticle
    * does not create a new NewsArticle
    * renders the new template
* $ spec ./spec/requests/news_articles_spec.rb
  * all three should fail and say no route for :create
* ./config/routes.rb
  * add :create to only section of news_articles routes
* $ spec ./spec/requests/news_articles_spec.rb
  * all three should fail and say no create action method in news_articles_controller.rb
* ./app/controller/news_articles_controller.rb
  * add:
    * create action method
    * add conditional logic to handle valid and invalid attributes
    * private method for news_articles_params
* $ spec ./spec/requests/news_articles_spec.rb
  * all three should fail and say something related to incorrect form fields
* ./app/views/news_products_controller.rb
  * include all necessary form fields and correct form action
* $ spec ./spec/requests/news_articles_spec.rb
  * all three should pass
##### Test Drive Destroy, Show and Index
* ./spec/requests/news_articles_spec.rb
  * add tests:
    * renders show template
    * renders index template
    * successfully deletes a NewsArticle
* $ rspec ./spec/requests/news_articles_spec.rb
  * The tests should fail and say there's no route matching
* ./config/routes.rb
  * add: routes for :show, :index, and :destroy action methods
* $ rspec ./spec/requests/news_articles_spec.rb
  * The tests should fail and say there's no action method in news_articles_controller.rb for :show, :index, and :destroy
* /app/controllers/news_articles_controller.rb
  * add: :show, :index, and :destroy action methods 
* $ rspec ./spec/requests/news_articles_spec.rb
  * the tests should fail, and say there's no template for show.html.erb and index.html.erb
* $ code ./app/views/news_articles/show.html.erb
  * add: content for labs
* $ code ./app/views/news_articles/index.html.erb
  * add: content for labs
* $ rspec ./spec/requests/news_articles_spec.rb
  * all tests should pass
##### Test Drive Edit and Update
* ./spec/requests/news_articles_spec.rb
  * add tests for:
    * renders edit template
    * successfully updates a NewsArticle with valid attributes
    * does not update a NewsArticle with invalid attributes
    * renders the edit template when the update has invalid attributes
* $ rspec ./spec/requests/news_articles_spec.rb
  * the tests should fail and say there's no route matching
* ./config/routes.rb
  * add: routes for :edit and :update
  * or: change news_articles routes to just resources :news_articles
* $ rspec ./spec/requests/news_articles_spec.rb
  * the tests should fail and say there's no action method in news_articles_controller.rb for :edit and :update
* ./app/controllers/news_articles_controller.rb
  * add :edit and :update action methods
* $ rspec ./spec/requests/news_articles_spec.rb
  * the tests should fail and say there's no template for edit.html.erb
* $ code ./app/views/news_articles/edit.html.erb
  * add: content for lab
* $ rspec ./spec/requests/news_articles_spec.rb
  * the tests should now pass
* ./app/views/news_articles/show.html.erb
  * add: edit link
### Testing Authentication
##### Test Drive New and Create with Users
* ./spec/requests/news_articles_spec.rb
  * add test for:
    * use factories to define and create a :user
    * #new
      * if user is 'not' signed in
        * redirects user to sign up page
      * if user 'is' signed in
        * allow controller to receive :current_user and to return user
    * #create
      * if user is 'not' signed in
        * redirects user to sign up page
      * if user 'is' signed in
        * allow controller to receive :current_user and to return user
        * associates the news article with the signed in user
* rspec ./spec/requests/news_articles_spec.rb
  * should throw errors saying something about user being nil or not existing
* $ code ./spec/factories/users.rb
  * add: content for creating a factory bot for user
* rspec ./spec/requests/news_articles_spec.rb
  * should throw errors saying user has no associations with news_articles
* $ rails generate migration AddUserIdToNewsArticles user:references
* $ rails db:drop
* $ rails db:create
* $ rails db:migrate
* $ rails db:seed
* ./spec/factories/news_articles.rb
  * add: user column
* ./app/models/user.rb
  * add: has_many :news_articles
* ./app/models/news_article.rb
  * add: belongs_to :user
* rspec ./spec/requests/news_articles_spec.rb
  * user signed in tests should fail saying something about news_article.user_id = nil
  * user 'not' signed in tests should throw errors saying not redirected to the correct page if user not signed in
* ./app/controllers/news_articles_controller.rb
  * connect current_user to news_article or the other way around
  * change if not signed in, change redirect to login page
* rspec ./spec/requests/news_articles_spec.rb
  * all tests should pass
* ./db/seeds.rb
  * add: news_articles to users
* $ rails db:reset
##### Test Drive Edit and Update with Users
* ./spec/requests/news_articles_spec.rb
  * create other_user
  * Add tests for:
    * #edit
      * if user is 'not' signed in
        * redirects user to sign up page
      * if user 'is' signed in
        * allow the controller to receive :current_user and to return the user
        * if user is signed in but not owner of news_article
          * redirect to root_path & alert with flash
        * if user is signed in and owner of news_article
          * renders :edit template and creates an instance variable of news_article
    * #update
      * if user is 'not' signed in
        * redirects user to sign up page
      * if user 'is' signed in
        * allow the controller to receive :current_user and to return the user
        * if user is signed in but not owner of news_article
          * redirect to root_path & alert with flash
        * if user is signed in and owner of news_article with valid params
          * updates news_article and redirects to show page
        * if user is signed in and owner of news_article with invalid params
          * does not update news_article and renders edit template
* $ rspec ./spec/requests/news_articles_spec.rb
  * tests will fail due to improper setup or missing associations
* ./app/models/ability.rb
  * add: cancan for :edit, :update NewsArticles
* ./app/controllers/news_articles_controller.rb
  * add: 
    * :edit, :update to require_login
    * cancan checks for edit and update action methods
      * edit:
        * if not can? flash and redirect_to root_path
        * else can? render :edit
      * update:
        * if not can? flash and redirect_to root_path
        * else can?
          * if update, redirect_to @news_article show
          * else message, and render :edit and
* $ rspec ./spec/requests/news_articles_spec.rb
  * tests should all pass
##### User Authentication Tests
* $ rails generate rspec:controller users
* ./spec/requests/news_articles_spec.rb
  * previously trying to generate a news_articles controller the command by default created a /requests/ not /controllers/ so need to change all tests to work with http requests. this is unrelated to this lab.
* ./spec/models/user_spec.rb
  * add tests for:
    * #first_name
      * should be present
    * #last_name
      * shouldReview Likes be present
    * #email
      * should be unique
    * #full_name
      * should return first_name and last_name concatenated & titleized
* $ rspec ./spec/models/user_spec.rb
  * all tests should fail as the validations and method are not yet implemented
* ./app/models/user.rb
  * implement the validations
* $ rspec ./spec/models/user_spec.rb
  * all tests should now pass
* ./spec/requests/users_spec.rb
  * add tests for:
    * #new
      * should render the new template
      * should set an instance variable of User type
    * #create
      * with valid parameters:
        * should create a user in the DB
        * should redirect to home page
        * should sign the user in
      * with invalid parameters:
        * should render the new template
        * should not create a user in the database
* $ rspec ./spec/requests/users_spec.rb
  * all tests should fail as the controller actions are not yet implemented
* ./app/controllers/users_controller.rb
  * make sure if user saves, it redirects to home_path
* $ rspec ./spec/requests/users_spec.rb
  * all tests should now pass
### Many to Many
##### Review Likes
* ./config/routes.rb
  * Nest the likes resource within reviews: resources :likes, only: [:create, :destroy]
* $ rails g controller Likes
* $ rails g migration CreateLikes user:references review:references
* $ rails db:migrate
* ./app/models/like.rb
  * Add associations:
    * belongs_to :user
    * belongs_to :review
* ./app/models/user.rb
  * Add associations:
    * has_many :likes, dependent: :destroy
    * has_many :liked_reviews, through: :likes, source: :review
* ./app/models/review.rb
  * Add associations:
    * has_many :likes, dependent: :destroy
    * has_many :likers, through: :likes, source: :user
* ./app/models/ability.rb
  * Add like auth for if user isn't owner of review
* ./app/controllers/likes_controller.rb
  * Add:
    * find_product custom method
    * find_review custom method
    * before_actions for: 
      * :require_login
      * :find_product
      * :find_review
    * create action method:
      * Create a new like associated with current_user
      * Save the like and handle the response
      * cancan auth for likes
    * destroy action method:
      * Find the like associated with current_user
      * Destroy the like and handle the response
      * cancan auth for likes
* ./app/views/products/show.html.erb
  * Use review.likers.count to display the count of likes
  * Add: conditional rendering of "like" or "unlike" link based on if current user has liked the review
* ./app/assets/stylesheets/custom.scss
  * Add: .no-underline class to remove underline from links
* ./app/controllers/application_controller.rb
  * Add: user_liked_review helper method to check if the current user has liked a review
##### Favourites
* $ rails g model Favorite product:references user:references
* ./db/migrations/......_create_favorites.rb
  * add: add_index :favorites, [:user_id, :product_id], unique: true
* $ rails db:migrate
* ./app/models/favorite.rb
  * add: belongs_to :user and :product
* ./app/models/user.rb
  * add: has_many favorites and favorited_products
* ./app/models/product.rb
  * add: has_many favorites and favoritors
* ./config/routes.rb
  * add: resources :favorites, only: [:create, :destroy] within product's resources
* ./app/models/ability.rb
  * add: favorite auth for if user isn't owner of product
* $ rails g controller Favorite
* ./app/controllers/favorites_controller.rb
  * add:
    * find_product custom method
    * before_actions for: 
      * :require_login
      * :find_product
    * create action method:
      * Create a new favorite associated with current_user
      * Save the favorite and handle the response
      * cancan auth for favorites
    * destroy action method:
      * Find the favorite associated with current_user
      * Destroy the favorite and handle the response
      * cancan auth for favorite
* ./app/views/products/show.html.erb
  * Add: conditional rendering of "favorite" or "unfavorite" link based on if current user has favorited the product
* ./app/controllers/application_controller.rb
  * Add: user_favorited_product helper method to check if the current user has favorited a product
* ./config/routes.rb
  * add: GET favorites to user resources
* ./app/controllers/users_controller.rb
  * add: 
    * favorites action method
    * make and array out of favorited_products
* $ code ./app/views/users/favorited.html.erb
  * add: loop through favorited_products and list each product with a link to product show page
* ./app/views/layouts/application.html.erb
  * add link to navbar for favorites_user_path(current_user)
### More on Many to Many
##### Add Tags to Products
* $ rails g model Tag name:string:uniq && rails g model Tagging product:references tag:references
* ./db/migrate/..._create_taggings.rb
  * add: add_index :taggings, [:product_id, :tag_id], unique: true
* $ rails db:migrate
* ./app/models/tag.rb
  * add: 
    * has_many :taggings, dependent: :destroy
    * has_many :products, through: :taggings
    * validates :name, uniqueness: true
* ./app/models/tagging.rb
  * add: 
    * belongs_to :product
    * belongs_to :tag
    * validates :tag_id, uniqueness: { scope: :product_id }
* ./app/models/product.rb
  * add: 
    * has_many :taggings, dependent: :destroy
    * has_many :tags, through: :taggings
* ./app/views/products/new.html.erb and edit.html.erb
  * add: text_field to add tags
* ./app/controllers/products_controller.rb
  * add: 
    * handle_tags method
    * handle_tags in create and update actions
* ./app/models/product.rb
  * add: tag_names getter and setter methods
* ./app/models/tag.rb
  * add: 
    * before_save :titleize_name callback
    * private method titleize_name
* ./db/seeds.rb
  * add: 
    * destroy existing tags before seeding
    * create tags for each product in the database
    * clear Faker unique word list after each product to ensure uniqueness
##### List Products by Tag
* $ rails g controller Tags
* ./app/controllers/tags_controller.rb
  * add:
    * index action method to list all tags
    * show action method to show a specific tag and its associated products
* ./config/routes.rb
  * add: resources :tags, only: [:index, :show]
* $ mkdir app/views/tags
  * create a new directory for the views associated with the TagsController.
* $ code ./app/views/tags/index.html.erb
  * add: Loop through each tag and display its name with a link to its show page.
* $ code ./app/views/tags/show.html.erb
  * add: Display the tag's name and loop through each of its associated products, displaying the product's name with a link to its show page.
* ./app/views/products/show.html.erb
  * modify: Change the display of tags to use link_to so each tag links to its show page.
##### Voting on reviews
* $ rails g model Vote review:references user:references vote_type:boolean
  * the vote_type is a boolean where true might represent an upvote and false a downvote.
* ./db/migrations/......_create_votes.rb
  * add: add_index :votes, [:user_id, :review_id], unique: true
* $ rails db:migrate
* ./app/models/vote.rb
  * add: belongs_to :user and belongs_to :review
* ./app/models/user.rb
  * add: has_many :votes, dependant: :destroy
* ./app/models/review.rb
  * add: has_many :votes, dependant: :destroy
* ./config/routes.rb
  * add: resources :votes, only: [:create, :update, :destroy] within review's resources
* ./app/models/ability.rb
  * add: cancan rules for create, update destroy
* $ rails g controller Votes
* ./app/controllers/votes_controller.rb
  * add:
    * create action method:
      * create a new vote associated with current_user and the specified review
      * save the vote and handle the response
      * cancan auth for votes
    * update action method:
      * find the vote associated with current_user and the specified review
      * update the vote type and handle the response
      * cancan auth for vote
    * destroy action method:
      * find the vote associated with current_user and the specified review
      * destroy the vote and handle the response
      * cancan auth for vote
* ./app/views/reviews/_review.html.erb
  * add: conditional rendering of "upvote" or "downvote" link based on if current user has voted on the review, and whether it was an upvote or downvote
* ./app/views/reviews/index.html.erb
  * add: Display the total number of upvotes and downvotes for each review
* ./app/controllers/reviews_controller.rb
  * add: sorting of reviews by the most voted ones in the index action.
## Background Jobs & Mailers
##### Add Mailing
* Gemfile
  * add:
    * gem 'delayed_job_active_record'
    * gem 'delayed_job_web'
    * gem 'letter_opener', group: :development
* $ bundle i
* $ rails generate delayed_job:active_record to create the necessary migration files for DelayedJob.
* $ rails db:migrate to apply the migration.
* ./config/application.rb
  * add: config.active_job.queue_adapter = :delayed_job
* ./config/environments/development.rb
  * add:
    * config.action_mailer.delivery_method = :letter_opener
    * config.action_mailer.perform_deliveries = true
    * config.action_mailer.perform_caching = true
* ./config/initializers/setup_mail.rb
  * create this file and add your SMTP settings for ActionMailer.
* ./app/mailers/product_mailer.rb & app/mailers/review_mailer.rb
  * create these mailer classes and define the methods for sending emails related to products and reviews respectively.
* ./app/views/product_mailer/ & app/views/review_mailer/
  * create views for the mailer methods in the above step.
* ./app/controllers/products_controller.rb & app/controllers/reviews_controller.rb
  * update the create actions to send emails after a product/review is created. Use the delay method provided by Delayed Job to send the emails in the background.
* ./bin/delayed_job
  * create this file and add the required lines to start the Delayed Job worker.
* ./config/routes.rb
  * add: a route to access the Delayed Job web dashboard.
* open two terminals
  * $ bin/delayed_job start
  * $ rails s
* open browser to localhost:3000/products/new
  * create a new product and check the log to see if the email was sent.
* open browser to localhost:3000/products/1/reviews/new
  * create a new review and check the log to see if the email was sent.
## ********************** End *********************

## ********************* Labs *********************

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

