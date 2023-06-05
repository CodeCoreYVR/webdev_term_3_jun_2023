class VotesController < ApplicationController
  before_action :require_login
  before_action :find_vote, only: [:update, :destroy]
  before_action :find_product, only: [:create, :update, :destroy]
  before_action :find_review, only: [:create, :update, :destroy]
  # load_and_authorize_resource

  def create
    # @vote = @review.votes.build(vote_params)
    # @vote.user = current_user
    @vote = @review.votes.find_or_initialize_by(user: current_user)
    # @vote.vote_type = vote_params[:vote_type]
    # @vote = Vote.new user: current_user, review: @review, vote_type: params[:vote_type]
    @vote.vote_type = params[:vote_type]

    if !(can? :create, @vote)
      # request.referrer is the previous page the user was on
      redirect_to @product, error: "Not authorized!"
    else
      @vote.user = current_user

      if @vote.save
        redirect_to request.referrer, notice: "Vote created successfully"
      else
        redirect_to @product, error: "Vote not created"
      end
    end
  end

  def update
    if !(can? :update, @vote)
      redirect_to @product, error: "Not authorized!"
    else
      @vote.vote_type = params[:vote_type]
      if @vote.update(vote_params)
        redirect_to request.referrer, notice: "Vote updated successfully"
      else
        redirect_to @product, error: "Vote not updated"
      end
    end
  end

  def destroy
    if !(can? :destroy, @vote)
      redirect_to @product, error: "Not authorized!"
    else
      @vote.destroy
      redirect_to request.referrer, notice: "Vote deleted successfully"
    end
  end

  private

  def vote_params
    params.permit(:vote_type, :review_id)
  end
  
  def find_vote
    @vote = Vote.find(params[:id])
  end

  def find_product
    @product = Product.find(params[:product_id])
  end

  def find_review
    @review = Review.find(params[:review_id])
  end
end

