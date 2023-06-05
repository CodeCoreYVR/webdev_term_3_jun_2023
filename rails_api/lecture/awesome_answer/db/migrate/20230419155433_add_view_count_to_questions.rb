class AddViewCountToQuestions < ActiveRecord::Migration[7.0]
  def change
    # add_column(:table_name, :column_name, :data_type)
    add_column :questions, :view_count, :integer
  end
end
