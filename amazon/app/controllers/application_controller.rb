class ApplicationController < ActionController::Base
  helper_method :current_user
  helper_method :user_liked_review  
  helper_method :user_favorited_product
  before_action :set_request_ip # defind below and strictly for development purposes

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def formatted_names(user)    
    user.first_name = user.first_name.titleize
    user.last_name = user.last_name.titleize
    user
  end

  def require_login
    unless current_user
      flash[:error] = "You must be logged in to create a product or review."
      redirect_to new_session_path
    end
  end
  
  def user_liked_review(review)
    current_user.likes.find_by(review_id: review.id)
  end

  def user_favorited_product(product)
    current_user.favorites.find_by(product_id: product.id)
  end

  protected

  def set_user_location
    if current_user
      location = request.location
      
      current_user.locations.create(
        ip: remote_ip, 
        longitude: location.longitude, 
        latitude: location.latitude,
        country: location.country.to_s,
        region: location.region.to_s,
        city: location.city.to_s
      )
    end
  end

  private

  def set_request_ip
    # Strictly just for development purposes
    if Rails.env.development?
      request.env['REMOTE_ADDR'] = '64.233.161.99'
    end
  end

  def remote_ip
    # Stritly just for development purposes
    if Rails.env.development?
      '64.233.161.99' # This is the stubbed IP.
    else
      request.remote_ip
    end
  end
end
