class AddLikeCountToQuestions < ActiveRecord::Migration[7.0]

  # rails generate migration add_like_count_to_questions like_count:integer
  def change
    add_column :questions, :like_count, :integer
  end
end
