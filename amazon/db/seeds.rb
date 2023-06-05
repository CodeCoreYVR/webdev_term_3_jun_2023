# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Clear the database of any existing records before re-seeding
User.destroy_all
Product.destroy_all
Review.destroy_all
NewsArticle.destroy_all
Tag.destroy_all
Favorite.destroy_all
Like.destroy_all
Vote.destroy_all

# Create an admin user
User.create(
  first_name: "Admin",
  last_name: "User",
  email: "admin@user.ca",
  password: 'password',
  admin: true
)

# create 5 users with the Faker gem
5.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(domain: "example"),
    password: 'password',
    admin: false
  )
end

# create 5 products for each user (25 total), first user(admin) is skipped
User.all.drop(1).each do |user|
  5.times do
    product = user.products.create(
      title: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      price: Faker::Commerce.price(range: 50..500, as_string: false)
    )
  end
end

# create 5 tags for each product, however, existing tags won't be duplicated so the total number of tags will most likely be less than 125
Product.all.each do |product|
  5.times do
    tag_name = Faker::Lorem.unique.word

    if product.tag_names.empty?
      product.tag_names = tag_name
    else
      product.tag_names = "#{product.tag_names}, #{tag_name}"
    end
  end
  Faker::Lorem.unique.clear
end

# non_admin_users is an array of all users except the first user (admin)
non_admin_users = User.where(admin: false)
# create 5 reviews for each product (125 total)
Product.all.each do |product| 
  5.times do
    product.reviews.create(
      rating: Faker::Number.between(from: 1, to: 5),
      body: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      hidden: false,
      user_id: non_admin_users.sample.id
    )
  end
end

# create 10 news articles
User.all.drop(1).each do |user|
  5.times do
    news_article = user.news_articles.create(
      title: Faker::Lorem.sentence(word_count: 5),
      description: Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false),
      published_at: Faker::Time.between(from: 30.days.ago, to: Time.now)
    )
  end
end

# Have each review liked by a random number of users except for the first user (admin) and the user who created the review
Review.find_each do |review|
  User.order("RANDOM()").limit(rand(User.count + 1)).each do |user|
    review.likes.create(user: user) if user.id != 1 && user.id != review.user_id
  end
end

# Have each product favorited by a random number of users except for the first user (admin) and the user who created the product
Product.find_each do |product|
  User.order("RANDOM()").limit(rand(User.count + 1)).each do |user|
    product.favorites.create(user: user) if user.id != 1 && user.id != product.user_id
  end
end

# Have each review voted on by a random number of users with a random vote type except for the first user (admin) and the user who created the review
Review.find_each do |review|
  User.order("RANDOM()").limit(rand(User.count + 1)).each do |user|
     review.votes.create(user: user, vote_type: [true, false].sample) if user.id != 1 && user.id != review.user_id
  end
end

# Print the number of users created
puts Cowsay.say("Created #{User.count} users", "kitty")
# Print the number of products created
puts Cowsay.say("Created #{Product.count} products", "cow")
# Print the number of reviews created
puts Cowsay.say("Created #{Review.count} reviews", "elephant")
# Print the number of news articles created
puts Cowsay.say("Created #{NewsArticle.count} news articles", "moose")
# Print the number of tags created
puts Cowsay.say("Created #{Tag.count} tags", "stegosaurus")
# Print the number of favorites created
puts Cowsay.say("Created #{Favorite.count} favorites", "dragon")
# Print the number of likes created
puts Cowsay.say("Created #{Like.count} likes", "ghostbusters")
# Print the number of votes created
puts Cowsay.say("Created #{Vote.count} votes", "beavis")



