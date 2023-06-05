class UsersController < ApplicationController
  # This is a before_action, it will run the set_user method before any of the actions listed in the array
  before_action :set_user, only: [:edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    # formatted_name is a method defined in app/controllers/application_controller.rb
    @user = formatted_names(@user)

    if @user.save
      # This is how we set a session variable
      session[:user_id] = @user.id
      redirect_to home_path
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    # formatted_name is a method defined in app/controllers/application_controller.rb
    @user = formatted_names(@user)
    
    if @user.update(user_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def favorites
    @favorited_products = current_user.favorited_products.order(created_at: :desc)
  end
  

  private

  def user_params
    # This is a security feature, it will only allow the params listed below to be passed in
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
