class JobPost < ApplicationRecord
    validates :title, presence: true, uniqueness: true
    validates :describe, presence: true, length: {minimum: 100}
    validates :min_salary, numericality:{greater_than_or_equal_to: 30_000}
    validates :location, presence: true
end
