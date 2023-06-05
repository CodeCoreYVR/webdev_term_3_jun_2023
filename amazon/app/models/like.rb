class Like < ApplicationRecord
  belongs_to :user
  belongs_to :review

  # Make sure that a user can only like a review once
  validates :review_id, uniqueness: { scope: :user_id, message: "Already liked this review!" }
end
