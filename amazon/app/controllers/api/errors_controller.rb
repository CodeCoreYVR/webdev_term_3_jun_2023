class Api::ErrorsController < ApplicationController
  def not_found
    render json: { error: "Not found", status: 404 }, status: 404
  end
end
