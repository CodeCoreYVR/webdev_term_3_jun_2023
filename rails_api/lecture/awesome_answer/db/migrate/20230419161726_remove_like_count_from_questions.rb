class RemoveLikeCountFromQuestions < ActiveRecord::Migration[7.0]
  # rails generate migration remove_like_count_from_questions like_count:integer 
  def change
    remove_column :questions, :like_count, :integer
  end
end
