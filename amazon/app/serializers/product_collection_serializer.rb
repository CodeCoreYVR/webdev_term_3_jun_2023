class ProductCollectionSerializer < ActiveModel::Serializer
  # $ rails g serializer product_collection

  # This serializer is used to serialize a collection of products

  attributes :id, :user_id, :title, :description, :price, :tag_names, :created_at, :updated_at
end
