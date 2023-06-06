# This file is a Rails test file for the NewsArticlesController
require 'rails_helper'

# RSpec is the testing framework being used here
RSpec.describe NewsArticle, type: :model do
  # Associations
  describe 'validations' do
    # build a news article with a factory
    subject { build(:news_article) }

    # test validations

    # validates :title, presence: true, uniqueness: true
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    # Invalid without a title
    it 'is not valid without a title' do
      subject.title = nil
      expect(subject).to_not be_valid
    end

    # Invalid without a unique title
    it 'is not valid with a duplicate title' do
      create(:news_article, title: 'Sample Title')
      subject.title = 'Sample Title'
      expect(subject).to_not be_valid
    end

    # Invalid without a description
    it 'is not valid without a description' do
      subject.description = nil
      expect(subject).to_not be_valid
    end

    # Invalid if published_at is before created_at
    it 'is not valid if published_at is before created_at' do
      subject = create(:news_article)
      subject.published_at = subject.created_at - 1.day
      expect(subject).to_not be_valid
    end
  end

  # valid if title is titleized before saving
  describe '#titleize_title' do
    it 'titleizes the title before saving' do
      news_article = create(:news_article, title: 'example news article')
      expect(news_article.title).to eq('Example News Article')
    end
  end

  # Instance Methods

  # valid if published_at is set to the current date
  describe '#publish' do
    it 'publishes the news article by setting published_at to the current date' do
      news_article = create(:news_article, published_at: nil)
      news_article.publish
      expect(news_article.published_at).to be_within(1.second).of(Time.now)
    end
  end

  # Scopes

  # valid if only published news articles are returned
  describe '.published' do
    it 'returns only published news articles' do
      news_article1 = create(:news_article, published_at: Time.now)
      news_article2 = create(:news_article, published_at: nil)
      expect(NewsArticle.published).to contain_exactly(news_article1)
    end
  end
end
