class PaymentController < ApplicationController
    before_action :authenticate_user!
    protect_from_forgery with: :null_session

    def create
       p "===============-------------------"
       p params
       p "===============--------------------"
        customer = Stripe::Customer.create(
          :description => " Customer for user id: #{current_user.id}",
          :source => params[:stripe_token] # obtained with Stripe.js
        )
        # Saving Stripe customer information
        p "--------------------------------------------"
        p customer
        p "--------------------------------------------"
        current_user.stripe_customer_id  = customer.id
        current_user.stripe_card_last4   = ""
        current_user.stripe_card_type    = ""
        current_user.save

        @donation = Donation.new
        @donation.amount = params[:amount]
        @donation.user = @current_user

        amount = @donation.amount * 100
        amount = amount.round
        charge = Stripe::Charge.create(
            :amount => amount,
            :currency => "cad",
            :customer => current_user.stripe_customer_id,
            :description => "Charge for Pledge: #{@donation.id}"
            )

        @donation.stripe_txn_id =  charge.id
        @donation.save
        render :thanks
    end
    
    def donate
    end

    def thanks
    end

    def authorize_user!
      flash[:danger] = "Permission denied"
      redirect_to root_path
    end
end