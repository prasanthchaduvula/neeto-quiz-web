class UpdateForeignKeyForPaymentDetails < ActiveRecord::Migration[6.0]
  def change
    remove_reference :payment_details, :user 
    add_reference :payment_details, :organization, type: :uuid, foreign_key: { on_delete: :cascade }
  end
end
