class ProductsController < ApplicationController
  # This will call the find_product method before the specified actions
  before_action :find_product, only: [:show, :edit, :update, :destroy]
  # This will call the find_user method before the specified actions
  before_action :find_user, only: [:create]
  # This will call the authenticate_user! method before the specified actions
  before_action :require_login, only: [:new, :create]


  def index
    # Get all the products from the database and order them by the created_at column in descending order
    @products = Product.all.order(created_at: :desc)
  end

  def show
    # # Get the product with the given id from the database
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product
    
    @review = Review.new
    # Get all the reviews for the product in descending order then sort by vote_total in descending order
    @reviews = @product.reviews.order(created_at: :desc).sort_by(&:vote_total).reverse || []
  end

  def new
    # Create a new product instance variable
    @product = Product.new
  end

  def create
    # Create a new product with the given params and assign it to the current user
    @product = @user.products.build(product_params)
    # If the product is successfully saved to the database
    if @product.save
      # Create a new tagging for each tag that was checked
      handle_tags(@product)

      ProductMailer.delay(run_at: 15.seconds.from_now).notify_product_owner(@product)
      # Redirect to the products index page
      redirect_to @product # This is equivalent to product_path(@product) or product_path @product
    else
      # Otherwise, render the new product form again
      render :new
    end
  end

  def destroy
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product
    
    # bellow if can? statment prevents a hacker from typing the destroy command in the url to see if passes.
    if !(can? :delete, @product)
      redirect_to @product, error: "Not authorized!"
      # redirect_to product_path(@product), error: "not authorized" -- also works
    end

    @product.destroy
    # Redirect to the products index page
    if !(can? :manage , :all)
      redirect_to products_path
    else
      redirect_to admin_panel_path
    end
  end

  def edit
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product
  end

  def update
    # # Find the product with the given id
    # @product = Product.find(params[:id]) # @product is already declaired by the before_action :find_product

    # bellow if can? statment prevents a hacker from typing the update command in the url to see if passes.
    if !(can? :update, @product)
      redirect_to @product, error: "Not authorized!"
      # redirect_to product_path(@product), error: "not authorized" -- also works
    end

    # Update the product with the given params
    if @product.update(product_params)
      # Create a new tagging for each tag that was entered and delete the taggings for each tag that was removed from text field
      handle_tags(@product)

      redirect_to @product
    else
      render 'edit'
    end
  end

  private
  
  def product_params
    # Returns a sanitized hash of the params with nothing extra
    params.require(:product).permit(:title, :description, :price, :tag_names)
  end

  # Method to find the product with the given id. This is used as a before_action to avoid repeating code.
  # This method is called before the show, edit, update and destroy actions
  def find_product
    @product = Product.find(params[:id])
  end

  # Method to find the user with the given id. This is used as a before_action to avoid repeating code.
  def find_user
    if current_user
      @user = User.find(current_user.id)
    end
  end

  # Method to create a new tagging for each tag that was entered and delete the taggings for each tag that was removed from text field
  def handle_tags(product)
    tag_names = params[:product][:tag_names].split(",").map(&:strip)
    tags = tag_names.map { |name| Tag.find_or_create_by(name: name.titleize) }
  
    @product.tags = tags
  end
  
end
