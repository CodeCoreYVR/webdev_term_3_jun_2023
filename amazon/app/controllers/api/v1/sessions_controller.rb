class Api::V1::SessionsController < Api::ApplicationController
  # created with:
  # $ rails g controller api/v1/sessions --no-helper --skip-template-engine

  before_action :find_user, only: [:create]

  # postman requests for testing:
  # create new collection(plus sign)
  #  - name collection amazing_amazon
  # view actions(three dots on new collection) 
  #  -  add request

  # sessions create
  #  - localhost:3000/api/v1/session
  #  - method: post
  #  - header: 
  #    - key: Content-Type, value: application/json
  #  - body:
  #     {
  #       "email": "js@winterfell.gov", 
  #       "password": "supersecret"
  #     }
  #  - you will need cookie value from response to authenticate for other requests
  #    - cookie > name & value copy
  #    - click on amazing_amazon collection
  #      - past cookie name in key section
  #      - past cookie value in key section
  #      - type is: API Key

  # sessions delete
  #  - localhost:3000/api/v1/session
  #  - method: delete
  #  - header: 
  #    - key: Content-Type, value: application/json

  def create
    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      session[:expires_at] = Time.current + 10.minutes
      render json:{ id: @user.id, status: 'Logged in' }
    else
      p "@user: ", @user
      error_message = @user ? 'Failed to authenticate. Check your password.' : 'User not found. Check your email.'
      render json:{ status: 404, error: error_message }, status: 404
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
