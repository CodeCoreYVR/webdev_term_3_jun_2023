class Api::V1::UsersController < Api::ApplicationController
    def create
        @user = User.new user_params
        if @user.save
          session[:user_id] = @user.id
          render json: @user
        else
            render json: @user.errors, status: :unprocessable_entity
        end
      end
    
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
