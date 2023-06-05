class ReviewMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.review_mailer.notify_product_owner.subject
  #
  def notify_product_owner(review)
    @review = review
    @review_owner = @review&.user
    @product = @review&.product
    @product_owner = @product&.user
    mail to: @product_owner&.email, subject: "Someone reviewed one of your products!"
  end
end
