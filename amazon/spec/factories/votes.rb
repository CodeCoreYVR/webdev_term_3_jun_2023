FactoryBot.define do
  factory :vote do
    review { nil }
    user { nil }
    vote_type { false }
  end
end
