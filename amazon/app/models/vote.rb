class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :user_id, uniqueness: {
    scope: :review_id, 
    message: "has already been voted on"
  }

  validate :not_reviewer

  def not_reviewer
    if user_id == self.review.user_id
      errors.add(:user_id, "can't vote on own review")
    end
  end

  def self.up 
    where(vote_type: true)
  end 

  def self.down 
    where(vote_type: false)
  end 
end
