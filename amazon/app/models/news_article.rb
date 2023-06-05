class NewsArticle < ApplicationRecord
  # Associations 
  validates :title, presence: true, uniqueness: true
  validates :description, presence: true
  validate :published_at_after_created_at

  belongs_to :user

  # Callbacks 
  before_save :titleize_title

  # Scopes
  scope :published, -> { where("published_at <= ?", Time.now) }

  # Instance Methods
  def publish
    self.update(published_at: Time.now)
  end

  private
  # Custom Validations

  # Method to titleize the title before saving
  def titleize_title
    self.title = self.title.titleize
  end

  # Method to validate that published_at is after created_at 
  def published_at_after_created_at
    # Return if published_at or created_at are nil or if published_at is after created_at
    return unless published_at.present? && created_at.present? && published_at < created_at

    errors.add(:published_at, "must be after the created_at date")
  end
end
