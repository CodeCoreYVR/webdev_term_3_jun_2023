class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :view_count, :created_at, :updated_at, :like_count

  def like_count
    object.likes.count
  end

  belongs_to :user, key: :author
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :full_name
  end

  has_many :answers
  class AnswerSerializer < ActiveModel::Serializer
    attributes :id, :body, :created_at, :updated_at, :author_name
    def author_name
      object.user&.full_name
    end
  end

  has_many :tags
  class TagSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

end
