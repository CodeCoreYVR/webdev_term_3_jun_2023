class Api::V1::SessionsController < Api::ApplicationController
  # created with:
  # $ rails g controller api/v1/sessions --no-helper --skip-template-engine

  before_action :find_user, only: [:create]

  def create
    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      render json:{ id: @user.id }
    else
      render json:{ status: 404 }, status: 404
    end
  end

  def destroy
    session[:user_id] = nil
    render(
      json: { status: 200 }, 
      status:200
    )
  end

  private

  def find_user
    @user = User.find_by(email: params[:email])
  end
end
