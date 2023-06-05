class Tagging < ApplicationRecord
  belongs_to :product
  belongs_to :tag

  # Makes sure that a specific tag can only be applied to a product once
  validates :tag_id, uniqueness: { scope: :product_id }
end
