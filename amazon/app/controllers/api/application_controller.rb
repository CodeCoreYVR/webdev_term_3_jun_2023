class Api::ApplicationController < ApplicationController
  # created with:
  # $ rails g controller Api::Application --no-assets --no-helper --skip-template-engine

  # skip_before_action :verify_authenticity_token
  rescue_from StandardError, with: :handle_standard_error


  def current_user
    if session[:expires_at] && session[:expires_at] >= Time.current
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end


  protected

  def render_error(object)
    errors = object.errors.messages.map do |field, messages|
      messages.map do |message|
        {
          type: 'ActiveRecord::RecordInvalid',
          record_type: object.class.to_s,
          field: field.to_s,
          message: message
        }
      end
    end.flatten

    render json: { status: 422, errors: errors }, status: :unprocessable_entity
  end
  
  private

  def handle_standard_error(error)
    status_code = error.is_a?(ActiveRecord::RecordInvalid) ? 422 : 500

    render json: { 
      status: status_code, 
      error: { 
        type: error.class.to_s,
        message: error.message,
        timestamp: Time.now,
        environment: Rails.env
      } 
    }, status: status_code
  end  
end
