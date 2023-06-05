class User < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :news_articles, dependent: :destroy

  has_many :likes, dependent: :destroy
  # liked_reviews is an alias for all the reviews that a user has liked
  has_many :liked_reviews, through: :likes, source: :review

  has_many :favorites, dependent: :destroy
  # favorited_products is an alias for all the products that a user has favorited
  has_many :favorited_products, through: :favorites, source: :product

  has_many :votes, dependent: :destroy

  has_secure_password

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Allow for case insensitive uniqueness of email
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  # Allow for minimum length of 8 characters for password and only validate if password is not nil
  validates :password, length: { minimum: 8 }, if: -> { new_record? || !password.nil? }

  # Callbacks
  before_save :formatted_names

  # Instance Methods
  def formatted_names
    self.first_name = first_name.titleize
    self.last_name = last_name.titleize
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin?
    self.admin
  end
end
