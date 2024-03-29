class Api::V1::UsersController < Api::ApplicationController
  before_action :require_login, only: [:current]

  def current
    render json: current_user
  end

  def create
    user = User.new user_params
    
    if user.save
      session[:user_id] = user.id
      render json: { id: user.id }
    else
      # render(
      #   json: { errors: user.errors },
      #   status: 422 # Unprocessable Entity
      # )
      render_error(user)
    end
  end


  private

  def user_params
    params.require(:user).permit(
      :first_name, 
      :last_name, 
      :email, 
      :password, 
      :password_confirmation
    )
  end
end