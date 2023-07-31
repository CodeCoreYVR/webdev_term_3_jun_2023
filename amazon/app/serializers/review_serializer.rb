class ReviewSerializer < ActiveModel::Serializer
  # Created with:
  # $ rails g serializer review 

  def full_name
    object.user&.full_name
  end

  attributes :id, :user_id, :body, :rating, :full_name, :created_at, :updated_at
end
