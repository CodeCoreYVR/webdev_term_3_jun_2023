class Faq < ApplicationRecord
  belongs_to :product
  validates_presence_of :question, :answer, presence: true
end
