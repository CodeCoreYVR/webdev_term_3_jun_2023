# frozen_string_literal: true

class Ability
  include CanCan::Ability

  # It takes the current_user as argument that has been written in the Application base class controller.
  def initialize(user)
    # Define abilities for the user here. For example:
    
    user = user || User.new

    #1st arg: authorization type/name, Model Name, condition.
    can :edit, Question, user_id:user.id
    can :delete, Question, user_id:user.id
    can :delete, Answer, user_id:user.id

    
    # return unless user.is_admin
    # :manage means user can perform any opertion like read/edit/update/delete/create,
    # :all means it can act on any resource or class
    # can :manage, :all
    if user.is_admin
      can :manage, :all
    else
      can :manage, :read
    end

    can :like, Question do |question|
      user.persisted? && question.user != user
      # checks if the user is in the database
      # does not allow the question'owner ti like their own question
    end
    # the above method will allow us to:
    # can? :like @question -> this will excutethe above rule

    can :destroy, Like do |like|
      like.user == user
    end

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
  end
end
