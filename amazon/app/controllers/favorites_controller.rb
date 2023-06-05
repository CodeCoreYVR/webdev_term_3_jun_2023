class FavoritesController < ApplicationController
  before_action :require_login, only: [:create, :destroy]
  before_action :find_product, only: [:create, :destroy]
  
  def create
    if !(can? :favorite, @product)
      redirect_to product_path(@product), alert: "You can't favorite your own product!"
    else
      @favorite = current_user.favorites.new(product_id: params[:product_id])

      if @favorite.save
        redirect_to product_path(@product), notice: 'Product favorited!'
      else
        redirect_to product_path(@product), alert: favorite.errors.full_messages.join('. ')
      end
    end
  end

  def destroy
    if !(can? :favorite, @product)
      redirect_to product_path(@product), alert: "You can't unfavorite your own product!"
    else
      favorite = current_user.favorites.find_by(product_id: params[:product_id])

      if favorite.destroy
        redirect_to product_path(@product), notice: 'Product unfavorited!'
      else
        redirect_to product_path(@product), alert: favorite.errors.full_messages.join(", ")
      end
    end
  end

  private

  def find_product
    @product = Product.find(params[:product_id])
  end
end
