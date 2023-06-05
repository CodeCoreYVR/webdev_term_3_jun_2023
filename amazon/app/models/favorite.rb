class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :product_id, uniqueness: { scope: :user_id, message: "Already favorited this product!" }
end
