class AddTxnIdToDonations < ActiveRecord::Migration[7.0]
  def change
    add_column :donations, :stripe_txn_id, :string
  end
end
