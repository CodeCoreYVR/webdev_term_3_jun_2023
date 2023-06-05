class Tag < ApplicationRecord
    validates :name, presence: true, uniqueness: {message: "needs to be unique!", case_sensitive: false}

    has_many :taggings, dependent: :destroy
    has_many :questions, through: :taggings
end
