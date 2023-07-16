class Api::V1::ReviewsController < Api::ApplicationController
  before_action :require_login, only: [:create, :destroy]
  before_action :find_product, only: [:create, :update, :destroy]
  before_action :find_review, only: [:update, :destroy]
  before_action :authorize!, only: [:update, :destroy]

  def create
    review = @product.reviews.new review_params
    review.user = current_user
    
    if review.save
      render json: review 
    else
      render json: { errors: review.errors }, status: 422 # Unprocessable Entity
    end
  end

  def update
    if @review.update review_params
      render json: @review
    else
      render json: { errors: @review.errors }, status: 422 # Unprocessable Entity)
    end
  end

  def destroy
    if @review.destroy
      render json: { status: 200 }, status: 200 # status 200 is ok aka success
    else
      render json: { status: 422, errors: @review&.errors }, status: 422 # status 422 is unprocessable entity
    end
  end

  private

  def find_product
    @product ||= Product.find params[:product_id]
  end

  def find_review
    @review ||= @product.reviews.find params[:id]
  end

  def review_params
    params.require(:review).permit(:rating, :body)
  end

  def authorize!
    render(json: { status: 401 }, status: 401) unless can? :crud, @review
  end
end
