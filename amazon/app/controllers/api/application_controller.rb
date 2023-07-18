class Api::ApplicationController < ApplicationController
  # created with:
  # $ rails g controller Api::Application --no-assets --no-helper --skip-template-engine

  # skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid


  def current_user
    if session[:expires_at] && session[:expires_at] >= Time.current
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end
  
  def record_invalid(error)
    invalid_record = error.record
    errors = invalid_record.errors.map do |errorObject|
      {
        type: error.class.to_s,
        record_type: invalid_record.class.to_s,
        field: errorObject.attribute,
        message: errorObject.message,
      }
    end
    render(
      json: { status: 422, errors: errors },
      status: 422,
    )
  end
end
