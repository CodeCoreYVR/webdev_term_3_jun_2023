class ProductCollectionSerializer < ActiveModel::Serializer
  # $ rails g serializer product_collection

  # This serializer is used to serialize a collection of products

  attributes :id, :title, :description, :price, :created_at, :updated_at
end
