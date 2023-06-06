class ReviewSerializer < ActiveModel::Serializer
  # Created with:
  # $ rails g serializer review 

  attributes :id, :body, :rating
end
