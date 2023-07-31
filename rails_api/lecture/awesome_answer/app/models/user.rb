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
    validates :email, 
        presence: true, 
        uniqueness: {message: "needs to be unique!", case_sensitive: false},
        format:   /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
        unless: :from_omniauth?
    
    validates :first_name, presence: true
    validates :last_name, presence: true

    serialize :twitter_raw_data
    #gecoding
    geocoded_by :address
    # we are stating here that we are converting the address to geocode
    # when a user saves an address, it will autometically convert it to longitude and latitude corodinates as well
    after_validation :geocode

    #change coordinate to address
    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode

    def full_name
        first_name + " " + last_name
    end

    def self.find_from_omniauth(omniauth_data)
        User.where(provider: omniauth_data["provider"],
                   uid:      omniauth_data["uid"]).first
      end
      
    def self.create_from_omniauth(omniauth_data)
        full_name = omniauth_data["info"]["name"].split
        User.create(uid:                      omniauth_data["uid"],
                provider:                 omniauth_data["provider"],
                first_name:               full_name[0],
                last_name:                "-",
                email:                    omniauth_data["uid"] + "@" + omniauth_data["provider"] + "." + "user",
                oauth_token:              omniauth_data["credentials"]["token"],
                oauth_secret:             omniauth_data["credentials"]["secret"],
                oauth_raw_data:           omniauth_data,
                password:                 SecureRandom.hex(16)
                )
    end

    def from_omniauth?
        uid.present? && provider.present?
    end
end
