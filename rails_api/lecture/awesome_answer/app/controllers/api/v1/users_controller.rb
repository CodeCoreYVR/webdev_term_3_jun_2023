class Api::V1::UsersController < Api::ApplicationController
    def current
      p "----------------"
      p current_user
      p "------------------"
      render json: current_user
    end
      def create
        @user = User.new user_params
        if @user.save
          session[:user_id] = @user.id
          render json: {id: @user.id, email: @user.email, name: @user.full_name}
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def current
        p "----------------"
        p current_user
        p "------------------"
        render json: current_user
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
