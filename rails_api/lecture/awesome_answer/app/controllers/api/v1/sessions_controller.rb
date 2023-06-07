class Api::V1::SessionsController < Api::ApplicationController

    def create
        @user = User.find_by_email params[:email]
        if @user && @user.authenticate(params[:password])
          session[:user_id] = @user.id
          render json: {id: @user.id}
        else
          render json: @user.errors, status: 401
        end
      end

    def destroy
        session[:user_id] = nil
    end
end
