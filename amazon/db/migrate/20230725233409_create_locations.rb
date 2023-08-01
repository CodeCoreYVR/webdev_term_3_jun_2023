class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :ip
      t.float :latitude
      t.float :longitude
      t.string :country
      t.string :region
      t.string :city
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
