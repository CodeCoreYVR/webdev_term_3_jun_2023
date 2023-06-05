class AdminsController < ApplicationController
  before_action :require_login, :check_admin

  def panel
    @total_products = Product.count
    @total_reviews = Review.count
    @total_users = User.count
    @products = Product.select(:id, :title)
    @users = User.select(:id, :first_name, :last_name, :email)
  end

  private

  def check_admin
    unless current_user && current_user.admin?
      flash[:error] = "You are not authorized to access this page."
      redirect_to root_path
    end
  end  
end
