class ReviewsController < ApplicationController
  # This will call the find_product method before the specified actions
  before_action :find_product, only: [:create, :destroy]
  # This will call the find_user method before the specified actions
  before_action :require_login, only: [:create]
  before_action :find_review, only: [:hide, :unhide]

  def create
    # # Find the product with the given id
    # @product = Product.find(params[:product_id]) # @product is already declaired by the before_action :find_product
    
    # Create a new review with the given params
    @review = @product.reviews.create(review_params)
    # Set the user_id to the current user's id
    @review.user = current_user
    # Get all the reviews for the product in descending order
    @reviews = @product.reviews.order(created_at: :desc)


    # If the review is successfully saved to the database
    if @review.save
      ReviewMailer.delay(run_at: 15.seconds.from_now).notify_product_owner(@review)

      redirect_to @product, notice: "Review created successfully"
    else
      # Otherwise, render the product show page again with the error messages
      flash[:alert] = "Review not created"
      # render 'products/show' causes rails to think that the form is being submitted to product_review_path instead of product_reviews_path
      # This is because the form_for helper method will automatically submit the form to the path of the object if it is a new record
      # To fix this, we need to explicitly tell the form_for helper method to submit the form to the product_reviews_path
      # and we need to tell the form to use the POST method instead of the default GET method
      render 'products/show'
    end
  end

  def destroy
    # # Find the product with the given id
    # @product = Product.find(params[:product_id]) # @product is already declaired by the before_action :find_product

    @review = @product.reviews.find(params[:id])
    
    if !(can? :delete, @review)
      redirect_to @product, error: "Not authorized!"
    end

    # If the review is successfully deleted from the database
    if @review.destroy
      # Redirect to the product show page with a notice message
      redirect_to @product, notice: "Review deleted successfully"
    else
      # Otherwise, redirect to the product show page with an alert message
      redirect_to @product, alert: "Review not deleted"
    end
  end
  
  def hide
    # bellow if can? statment prevents a hacker from typing the update command in the url to see if passes.
    if !(can? :hide, @review)
      redirect_to @review.product, error: "Not authorized!"
    end
    @review.update(hidden: true)
    redirect_to @review.product
  end

  def unhide
    # bellow if can? statment prevents a hacker from typing the update command in the url to see if passes.
    if !(can? :unhide, @review)
      redirect_to @review.product, error: "Not authorized!"
    end
    @review.update(hidden: false)
    redirect_to @review.product
  end
  
  private
  
  # Method to get the review params from the form and only permit the rating and body attributes
  def review_params
    params.require(:review).permit(:rating, :body)
  end

  # Method to find the product with the given id. This is used as a before_action to avoid repeating code.
  # This method is called before the show, edit, update and destroy actions
  def find_product
    @product = Product.find(params[:product_id])
  end

  def find_review
    @review = Review.find(params[:id])
  end
end
