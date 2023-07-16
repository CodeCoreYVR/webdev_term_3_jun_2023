class ProductSerializer < ActiveModel::Serializer
  # $ rails g serializer product

  # All of the following is a serializer used to serialize a single product

  attributes :id, :title, :description, :price, :tag_names, :created_at, :updated_at

  ## Seller is nested under products
  # If you create a seperate user serializer, you can use it like this:
  belongs_to :user, serializer: UserSerializer, key: :seller
  # If you don't create a seperate user serializer, you can use it like this:
  # belongs_to :user, key: :seller

  # class UserSerializer < ActiveModel::Serializer
  #   attributes :id, :first_name, :last_name, :email, :full_name
  # end

  ## Reviews are nested under products
  # If you create a seperate review serializer, you can use it like this:
  has_many :reviews, serializer: ReviewSerializer, key: :reviewers do
    object.reviews.order created_at: :desc
  end
  # If you don't create a seperate review serializer, you can use it like this:
  # has_many :reviews

  # class ReviewSerializer < ActiveModel::Serializer
  #   attributes :id, :body, :rating
  # end
end
