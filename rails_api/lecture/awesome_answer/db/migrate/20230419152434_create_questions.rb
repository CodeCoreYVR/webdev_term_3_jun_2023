class CreateQuestions < ActiveRecord::Migration[7.0]
  
  # change method here implements both the up and down for db migration.
  # rails generate model question title:string body:text
  def change
    create_table :questions do |t|
      # id is autometically created which is auto incremental
      t.string :title
      t.text :body

    #   t.datetime "created_at", null: false
    # t.datetime "updated_at", null: false
      t.timestamps
    end
  end
end
