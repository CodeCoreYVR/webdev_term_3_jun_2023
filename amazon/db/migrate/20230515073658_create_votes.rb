class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :review, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :vote_type

      t.timestamps
    end
    add_index :votes, [:user_id, :review_id], unique: true
  end
end
