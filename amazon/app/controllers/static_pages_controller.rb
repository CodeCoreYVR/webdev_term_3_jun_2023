class StaticPagesController < ApplicationController
  def home
    # render 'home' # This is optional, Rails will render the view by default based on the action name
  end

  def about
    # render 'about' # This is optional, Rails will render the view by default based on the action name
  end

  def contact_us
    if params[:name].present?
      @message = "Thank you for for contactiong us!"
    end
    render 'contact_us' # This is optional, Rails will render the view by default based on the action name
  end
end
