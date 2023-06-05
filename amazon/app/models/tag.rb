class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :products, through: :taggings

  validates :name, uniqueness: true

  before_save :titleize_name

  private

  def titleize_name
    self.name = self.name.titleize
  end
end
