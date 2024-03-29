class Product < ApplicationRecord
  # Associations
  has_many :reviews, dependent: :destroy

  has_many :favorites, dependent: :destroy
  # favoritors is an alias for all the users that have favorited a product
  has_many :favoritors, through: :favorites, source: :user
  
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  has_many :faqs, dependent: :destroy
  accepts_nested_attributes_for :faqs, reject_if: :all_blank, allow_destroy: true
  
  belongs_to :user

  # Virtual attributes
  attr_accessor :tag_names

  # Callbacks
  before_validation :set_default_price
  before_validation :round_price_to_two_decimal_places
  before_validation :capitalize_title
  
  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :price, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { minimum: 10 }

  validate :maximum_faqs

  # Accepts comma-separated tag names, ensures tags exist, and assigns them to the product. Handles potential duplicate creation.
  def tag_names=(names)
    # this next line wasn't working because it seems in model(even though it works in controller) you can't overwrite self.tags but you can use self.update
    # self.tags = names.split(",").map do |n|
    temp_tags = names.split(",").map do |n|
      name = n.strip.downcase
      tag = Tag.where("LOWER(name) = ?", name).first || Tag.create(name: name.titleize)
    end.compact
    self.update(tags: temp_tags)
  end

  # Getter method to return a comma separated list of tag names
  def tag_names
    self.tags.map(&:name).join(', ')
  end

  # Private methods
  private

  def maximum_faqs
    errors.add(:faqs, "Maximum 5 FAQs allowed") if faqs.size > 5
  end

  # Method to round the price attribute to 2 decimal places before saving it
  def round_price_to_two_decimal_places
    self.price = price.round(2)
  end

  # Method to set default price to 1 if it is not already set
  def set_default_price
    self.price ||= 1
  end

  # Method to capitalize the title before saving it
  def capitalize_title
    self.title = title.capitalize
  end

  # Class methods (self.method_name) are methods that can be called on the class itself
  def self.search(keyword)
    if keyword.present? # If keyword is not nil or empty
      # Search for products whose title or description contains the keyword (case insensitive) and order them by title
      where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", "%#{keyword.downcase}%", "%#{keyword.downcase}%")
        .order(Arel.sql("CASE WHEN LOWER(title) LIKE '#{keyword.downcase}%' THEN 0 ELSE 1 END"))
    else
      all
    end
  end
end
