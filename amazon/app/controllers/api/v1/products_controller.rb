class Api::V1::ProductsController < ApplicationController
  # created with:
  # $ rails g controller api/v1/products

  # Disable the CSRF token
  protect_from_forgery with: :null_session

  def index
    products = Product.order created_at: :desc 
    # or # products = Product.order(created_at: :desc)
    render json: products    
    # or # render(json: products)
  end
end
