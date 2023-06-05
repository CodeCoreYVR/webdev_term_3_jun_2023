# factories/news_articles.rb
FactoryBot.define do
  factory :news_article do
    sequence(:title) { |n| "Sample Title #{n}" }
    description { "Sample Description" }
    published_at { nil }
    user
  end
end
