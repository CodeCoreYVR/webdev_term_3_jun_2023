class Api::V1::ProductsController < ApplicationController
  # created with:
  # $ rails g controller api/v1/products

  # Disable the CSRF token
  protect_from_forgery with: :null_session

  before_action :find_product, only: [:show]

  def index
    products = Product.order created_at: :desc 
    # or # products = Product.order(created_at: :desc)
    # render json: products    
    render(json: products, each_serializer: ProductCollectionSerializer)    
  end

  def show
      render json: @product
  end

  private

  def find_product
     @product ||= Product.find params[:id]
  end
end
