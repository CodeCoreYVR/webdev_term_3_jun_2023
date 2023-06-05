class User < ApplicationRecord
    has_secure_password
    
    has_many :questions
    has_many :answers

    # To create join table associations without Like model:
    # has_and_belongs_to_many(
    #     :liked_questions, # this is the name/alias we want to give it
    #     class_name: "Question", # this is the name of the model we are associating with
    #     join_table: "likes", # this is the name of join table
    #     association_foreign_key: 'question_id', # this is the name of the key that will act as the foreign key
    #     foreign_key: 'user_id' # this is the name of the key that will be used as the foreign key in the join tabile of this table
    # )

    # To create join table associations Like model through decomposing:
    has_many :likes, dependent: :destroy
    # The user liking the question:
    has_many :liked_questions, through: :likes, source: :question

    # case_sensitive: false indicates that 'TEST@TEST.COM' or, 'test@test.com' or, 'Test@test.com' won't be considered as unique.
    validates :email, presence: true, uniqueness: {message: "needs to be unique!", case_sensitive: false}
    validates :first_name, presence: true
    validates :last_name, presence: true

    def full_name
        first_name + " " + last_name
    end
end
