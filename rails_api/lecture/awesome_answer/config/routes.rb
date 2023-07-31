Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Warning: change the default localhost url so that it matches with ones mentioned in the twitter devloper app
  # http://example2.localhost:3000/
  get "/auth/twitter", as: :sign_in_with_twitter
  get "/auth/:provider/callback" => "callbacks#index"

  get "/donate" => "payment#donate", as: :payment
  post "/donate" => "payment#create", as: :payment_create

  # Defines the root path route ("/")
  root "welcome#index"

  get('/welcome', {to: 'welcome#index'})
  get('/goodbye', {to: 'welcome#goodbye', as: :tata})
  get('/form_example', {to: 'welcome#form_example'})
  # get('/question/:id') # dynamic id's will replace type number or param in url

  # Question routes
  # get "/questions/new" => "questions#new", as: :new_question # new_question_path
  # post "/questions" => "questions#create", as: :questions #questions_path (_path is postfix)
  # get "/questions/:id" => "questions#show", as: :question #question_path (_path is postfix)
  # get "/questions" => "questions#index"
  # get "/questions/:id/edit" => "questions#edit", as: :edit_question
  # patch "/questions/:id" => "questions#update"
  # delete "/questions/:id" => "questions#destroy", as: :delete_question

  resources :questions do 
    resources :answers, only: [:create, :destroy]
    resources :likes, shallow: true, only: [:create, :destroy]
    # original route /question/:question_id/likes/:like_id
    # route with shallow: true -> likes/:like_id
    get :liked, on: :collection
    # the above route creates a path like: GET "/questions/liked" similar to the question index,
    # but it will only show the questions liked by the current user
  end

  # get 'sessions/new'
  # get 'sessions/create' # sessions
  # get 'sessions/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resource :sessions # it will implement all routes for the methods/actions in the sessions controller
  
  resources :users, only: [:new, :create, :show]

  resources :tags, only: [:new, :create, :show, :index]

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :questions, only: [:create, :index, :show, :update, :destroy] do
        resources :answers, only: [:create, :destroy]
      end
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create] do
        get :current, on: :collection
      end
    end
    # match "*unmatched_page" => * is a wildcard for unmatched routes
    # to: controllerName#MethodName
    # via: :all => via: [:get, post... and all the methods];
    match "*unmatched_page", to: "application#not_found", via: :all
  end
end
