class Api::ApplicationController < ApplicationController
  # created with:
  # $ rails g controller Api::Application --no-assets --no-helper --skip-template-engine

  # skip_before_action :verify_authenticity_token

  def current_user
    if session[:expires_at] && session[:expires_at] >= Time.current
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end
  
end
