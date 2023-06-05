class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email])

    # If the user exists AND the password entered is correct.
    if user && user.authenticate(params[:password])
      # Save the user id inside the session. This is how we keep the user
      session[:user_id] = user.id
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
end
