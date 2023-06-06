class UserSerializer < ActiveModel::Serializer
  # Created with:
  # $ rails g serializer user 

  attributes :id, :first_name, :last_name, :email, :full_name
end
