class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def authenticate_user!
    render json: {message: "Please Sign in"}, status:401 unless user_signed_in?
  end
end
