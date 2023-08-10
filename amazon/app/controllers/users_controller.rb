class UsersController < ApplicationController
  # This is a rescue_from, it will run the code in the block if a CanCan::AccessDenied exception is raised
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to home_path, :alert => exception.message # This will redirect the user to the home page with the exception message
  end

  # This is a before_action, it will run the find_user method before any of the actions listed in the array
  before_action :find_user, only: [:edit, :update, :show]
  before_action :require_login, only: [:show, :edit, :update, :favorites]



  def show
    @locations = @user.locations.order(created_at: :desc)
    authorize! :read, @user  # This will raise a CanCan::AccessDenied exception if the current user is not allowed to read the @user object
  end

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
      set_user_location # defined in app/controllers/application_controller.rb
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

  def find_user
    @user = User.find(params[:id])
  end
end
