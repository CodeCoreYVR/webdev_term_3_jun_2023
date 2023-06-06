class Review < ApplicationRecord
  has_many :likes, dependent: :destroy
  # likers is an alias for all the users that have liked a review
  has_many :likers, through: :likes, source: :user
  has_many :votes, dependent: :destroy
  
  belongs_to :product
  belongs_to :user

  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

  def vote_total 
    votes.up.count - votes.down.count 
  end 
end
