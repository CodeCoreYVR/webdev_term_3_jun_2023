class Api::ApplicationController < ApplicationController
  # created with:
  # $ rails g controller Api::Application --no-assets --no-helper --skip-template-engine

  # skip_before_action :verify_authenticity_token

  private

  def require_login
    unless current_user.present?
      render(
        json: { status: 401 },
        status: 401
      )
    end
  end
end
