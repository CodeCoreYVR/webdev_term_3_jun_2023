# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the user here. For example:
    #
    #   return unless user.present?
    #   can :read, :all
    #   return unless user.admin?
    #   can :manage, :all
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, published: true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md
    
    user ||= User.new # guest user (not logged in)
    
    if user.admin?
      # This allows the admin to do anything
      can :manage, :all
    else
      # the below line defines an alias for the action of create, update, destroy, and read 
      # as :crud, however, it is not needed because :manage does the same thing and is built in
      # alias_action :create, :update, :destroy, :read, to: :crud

      # This addes the ability to update and delete products and reviews to the user who created them all in one line
      can [:update, :delete], [Product, Review], user_id: user.id
      # bellow two lines are the same as the above line
      # can [:update, :delete], Product, user_id: user.id
      # can [:update, :delete], Review, user_id: user.id
      
      can :like, Review do |review|
        user.present? && review.user != user
      end

      can :favorite, Product do |product|
        user.present? && product.user != user
      end

      can [:edit, :update, :delete], NewsArticle, user_id: user.id

      can [:create, :update, :destroy], Vote, user_id: user.id

      # This allows the owner of the product to hide and unhide reviews on their product
      can [:hide, :unhide], Review do |review|
        review.product.user == user
      end
    end

  end
end
