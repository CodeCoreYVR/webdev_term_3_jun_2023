class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  # The priority for rescue_from is in the reverse order of where the calls are made.
  # Meaning that more specific errors should be rescued later and general errors should be rescued first.

  # The StandardError class is an ancestor of all the errors that programmers could possibly
  # cause in their program. Rescuing from it will prevent all errors from crashing.

  rescue_from StandardError, with: :standard_error

  # There is a build-in Rails "rescue_from" method we can use to prevent class crashes.
  # We pass the error class that we want to rescue, and give it the named method
  # we want to rescue it with. 
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def not_found
    render(
      json: {
        status: 404,
        errors: [{
          type: "Not found"
        }]
      },
      status: :not_found #status:404
    )
  end

  def authenticate_user!
    render json: {message: "Please Sign in"}, status:401 unless user_signed_in?
  end

  protected 
  
  def standard_error(error)
    logger.error error.full_message
    render(
      status: 500,
      json: {
        status: 500,
        errors: [{
          type: error.class.to_s,
          message: error.message 
        }]
      }
    )
  end

  def record_invalid(error)
    invalid_record = error.record
    errors = invalid_record.errors.map do |field, message|
      {
        type: invalid_record.class.to_s,
        field: field,
        message: message,
      }
    end
    render(
      json: { status: 422, errors: errors },
      status: 422,
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

end
