class LikesController < ApplicationController
  before_action :require_login, only: [:create, :destroy]
  before_action :find_product, only: [:create, :destroy]
  before_action :find_review, only: [:create, :destroy]

  def create
    if !(can? :like, @review)
      redirect_to product_path(@product), alert: "You can't like your own review!"
    else
      @like = current_user.likes.new(review_id: @review.id)

      if @like.save
        redirect_to product_path(@product), notice: "Liked the review!"
      else
        redirect_to product_path(@product), alert: @like.errors.full_messages.join(", ")
      end
    end
  end

  def destroy
    if !(can? :like, @review)
      redirect_to product_path(@prodoct), alert: "You can't unlike your own review!"
    else
      like = current_user.likes.find_by(review_id: params[:review_id])

      if like.destroy
        redirect_to product_path(@product), notice: "Unliked the review!"
      else
        redirect_to product_path(@product), alert: like.errors.full_messages.join(", ")
      end
    end
  end

  private

  def find_product
    @product = Product.find(params[:product_id])
  end

  def find_review 
    @review = Review.find(params[:review_id])
  end
end
