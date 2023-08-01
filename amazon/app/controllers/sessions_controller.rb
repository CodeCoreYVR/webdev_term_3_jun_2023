class SessionsController < ApplicationController

  before_action :find_user, only: [:create]

  def new
  end

  def create
    user = User.find_by(email: session_params[:email])
    # If the user exists AND the password entered is correct.
    if user && user.authenticate(session_params[:password])
      # Save the user id inside the session. This is how we keep the user
      session[:user_id] = user.id
      set_user_location # defined in app/controllers/application_controller.rb
      redirect_to home_path
    else
      # If user's login doesn't work, send them back to the login form.
      flash.now[:error] = "Invalid email or password"
      render :new
    end
  end

  def destroy
    # This is how we log out the user and destroy the session
    session[:user_id] = nil
    redirect_to products_path
  end


  private

  def find_user
    @user = User.find_by(email: session_params[:email])
  end  

  def session_params
    p "params: ", params
    params.require(:session).permit(:email, :password)
  end
end
