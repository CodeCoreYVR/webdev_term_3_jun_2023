# OAuth with Twitter for Rails with OmniAuth

It convenient for users to give them the ability to authenticate with a third party service such as Twitter or Facebook. It's fairly straight forward to integrate with Rails using the `omniauth` gem as most of such service implement OAuth. We assume here that we're have Rails authentication from scratch using `has_secure_password` feature with `ActiveRecord`.

## Integrating the Gem

We start by adding the gem to our `Gemfile`:

```ruby
# ...
gem 'omniauth-twitter'
# ...
```

You must have a Twitter application in order to enable OAuth with Twitter. You can create one at [https://apps.twitter.com/](https://apps.twitter.com/) then click `Create New App`. Give your app a name and a description. In the `website` section, put `http://lvh.me:3000/` and put `http://lvh.me:3000/auth/twitter/callback` for the `Callback URL`. `lvh.me` is a special doamin that resolves to localhost using `lvh.me` is a simple workaround for Twitter's restriction on using localhost as the domain. Take a note of the `Consumer Key (API Key)` and `Consumer Secret (API Secret)`.

Put them in your `config/initializers/app_keys.rb` as in:

```yml
ENV['TWITTER_API_KEY']      = 'REPLACEWITHAPIKEY'
ENV['TWITTER_API_SECRET']   = 'REPALCEWITHAPISECRET'
```

Make sure that your `app_keys.rb` is not part of your git repository by adding the following line to you `.gitignore` file:

```
/config/initializers/app_keys.rb
```

Then create a file `config/initializers/omniauth.rb` with Twitter config:

```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['TWITTER_API_KEY'], ENV['TWITTER_API_SECRET'] 
end
```

## Setting Up the Routes

We will need two routes, one to redirect us to the Twitter authentication page and the other one to receive the callback from Twitter when the user has authenticated our app. Let's add the following to our `routes.rb`:

```ruby
get "/auth/twitter", as: :sign_in_with_twitter
get "/auth/:provider/callbacks" => "callbacks#index"
```

For that we will need to create a controller file `app/controllers/callbacks_controller.rb` that looks like:

```ruby
class CallbacksController < ApplicationController
  def index
  end
end
```

Note that in the second url we have the variable part `:provider` to allow us to use the same controller and action for differant authentication systems such as Facebook and Google.

## Setting up the link in the views

You can set up a link in your views such as `/app/views/layouts/application.html.erb` file to send the user to authenticate with Twitter:

```erb
<%= link_to "Sign in with Twitter", sign_in_with_twitter_path %>
```

This will automatically send the user to the Twitter authentication page.

## Modifying the Model

We will need to add two fields to support authenticating with Twitter and these are `uid` and `provider`. This way we're not tied to Twitter specifically. We can do that by generating a migration for this:

```shell
rails g migration add_omniauth_fields_to_users uid provider oauth_token oauth_secret oauth_raw_data
```

We can improve our migration by adding a composite index because we will be doing many queries selecting a user by the combination of its `uid` and `provider`:

```ruby
class AddOmniauthFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :uid, :string
    add_column :users, :provider, :string
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_secret, :string
    add_column :users, :oauth_raw_data, :string
    add_index :users, [:uid, :provider]
  end
end

````

We will need to modify the model because some authentication systems such as Twitter don't share email so we need to make the email only required if the user is not signing up with OmniAuth, so we can modify the email validation to look like:

```ruby
validates :email, 
          presence: true,
          format:   /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
          format:   /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
          unless:   :from_omniauth?
# ...
private

def from_omniauth?
  uid.present? && provider.present?
end
```

If you want to connect to the Twitter api then it's a good idea to store the Twitter Consumer Token and Twitter Consumer Secret (will name respectively `oauth_token` and `oauth_secret`) so you can do things like tweeting on the user's behalf. You may also want to store the raw response from Twitter in case you need other pieces of data in the future. So let's generate a migration:

```shell
rails g migration add_twitter_fields_to_users oauth_token oauth_secret oauth_raw_data
```

then run `rails db:migrate`. You may also want to add the following line to your `/app/models/user.rb`:

```ruby
serialize :twitter_raw_data
```

This will help you easier retrieve the raw data back as a Hash which will make it easire to access and manipulate.

## Handling the Callback
### Setting Up the Model to Handle the Callback

After the user authenticates our app on Twitter they will be redirected back to our app using the `callback url` we set up when we created the app on Twitter. We can get the data given back from Twitter using `request.env['omniauth.auth']` in the controller. This will be a Hash that will contain the user's `uid` and other information such as their image profile and bio. We can start by adding some methods to our `/app/models/user.rb` model that will make our life easier:

```ruby
def self.find_from_omniauth(omniauth_data)
  User.where(provider: omniauth_data["provider"],
             uid:      omniauth_data["uid"]).first
end

def self.create_from_omniauth(omniauth_data)
  full_name = omniauth_data["info"]["name"].split
  User.create(uid:                      omniauth_data["uid"],
              provider:                 omniauth_data["provider"],
              first_name:               full_name[0],
              last_name:                full_name[1],
              oauth_token:              omniauth_data["credentials"]["token"],
              oauth_secret:             omniauth_data["credentials"]["secret"],
              oauth_raw_data:           omniauth_data,
              password:                 SecureRandom.hex(16)
              )
end
```

The `find_from_omniauth` method will fetch the user from our database using their `uid` and `provider` if they exist and will give us back `nil` if the user has not signed up with 
before. In the latter case we can create the user account from the data we get from OmniAuth using the `create_from_omniauth` method.

### Setting Up the Controller to Handle the Callback

We can now use the methods we've added in the model to handle the call back in the controller:

```ruby
def index
  omniauth_data =   request.env['omniauth.auth']
  user          =   User.find_from_omniauth(omniauth_data)
  user          ||= User.create_from_omniauth(omniauth_data)
  sign_in(user) # this is defined in the application_controller.rb to set the sessions[:user_id]
  redirect_to root_path, notice: "Thank you signing in!"
end
```