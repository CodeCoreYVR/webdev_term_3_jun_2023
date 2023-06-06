# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "FirstName#{n}" }
    sequence(:last_name) { |n| "LastName#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
    admin { false }
  end
end
