class Api::V1::SessionsController < Api::ApplicationController

    def create
        @user = User.find_by_email params[:email]
        if @user && @user.authenticate(params[:password])
          session[:user_id] = @user.id
          render json: {id: @user.id, name: @user.full_name}
        else
          render json: {message: "Invalid credentials", status: 401}, status: 401
        end
      end

    def destroy
        session[:user_id] = nil
        render json: { message: "Logged out" }
    end
end
