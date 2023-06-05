class AddTitleIndexToQuestions < ActiveRecord::Migration[7.0]
  def change
    # add_index(:name_of_table,:name_of_column)
    add_index :questions, :title
  end
end
