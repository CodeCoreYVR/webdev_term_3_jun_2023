class Question < ApplicationRecord

    has_many :answers, dependent: :destroy
    belongs_to :user, optional: true

    # To create join table associations without Like model:
    # has_and_belongs_to_many(
    #     :likes, # this is the name/alias we want to give it
    #     class_name: "User", # this is the name of the model we are associating with
    #     join_table: "likes", # this is the name of join table
    #     association_foreign_key: 'user_id', # this is the name of the key that will act as the foreign key
    #     foreign_key: 'question_id' # this is the name of the key that will be used as the foreign key in the join tabile of this table
    # )

    # To create join table associations Like model through decomposing:
    has_many :likes, dependent: :destroy
    # The user liking the question:
    has_many :likers, through: :likes, source: :user

    # We will need to mention the source if we give a different name for user source (i.e 'likers')
    #has_many :users, through: :likes

    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings

    validates :title, presence: true #, uniqueness: {message: "needs to be unique!"}
    validates :body, length: {minimum: 5} 

    # custom validation
    # validate :no_monkey
    # validate :no_title_in_body

    # life cycle events
    before_save {
        # before saving it to db capitalize the title
        self.title = title.capitalize
    }

    before_validation(:set_default_view_count)

    # Scope: Scopes are class methods for Model
    # scope(:name_of_method, ->{lambda})
    scope(:recent_ten, ->{ order("created_at desc").limit(10) })
    # The above is equivalent to:
    # def self.recent_ten
    #     order("created_at desc").limit(10)
    # end

    def self.search(keyword)
        where('title ILIKE ? or body ILIKE ?', "%"+keyword+"%", "%"+keyword+"%")
    end

    private
    # custom validation method
    # def no_monkey
    #     if body && body.downcase.include?("monkey")
    #         self.errors.add(:body, "must not contain monkey")
    #     end
    # end

    # def no_title_in_body
    #     if body&.downcase.include?(title.downcase)
    #         self.errors.add(:body, "must not include title of question")
    #     end
    # end
    # end of custom validation method

    def set_default_view_count
        self.view_count ||=0
    end
end
