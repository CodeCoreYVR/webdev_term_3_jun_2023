class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  # The priority for rescue_from is like: General error first, then specific or child error
  # It's like overwriting the previous error

  # The StandardError is the ancestor of all error classes that are coming from our application
  # It will resue our progrom from crashing
  
  rescue_from StandardError, with: :standard_error

  # rescue_from <NameOfTheExceptionClass>, with: :<NameOfTheMethodForException>
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # Raised for ActiveRecord.create! and ActiveRecord.save!
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def not_found
    render(
      json: {
        status: 404,
        errors:[{
          type: "Not found"
        }]
      },
      status: 404
    )
  end

  def authenticate_user!
    render json: {message: "Please Sign in"}, status:401 unless user_signed_in?
  end

  protected 

  def standard_error(error)
    logger.error error.full_message
    render(
      json: {
        type: error.class.to_s,
        message: error.message # Or, we can say "Something went wrong" as an abstraction
      },
      status: 500
    )
  end

  def record_not_found(error)
    render(
      json: {
        status: 404,
        errors: [{
          type: error.class.to_s,
          message: error.message
        }]
      },
      status: 404
    )
  end

  def record_invalid(error)
    render(
      json: {
        status: 422,
        type: error.class.to_s,
        message: error.message
      },
      status: 422
    )
  end

end
