class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders, id: :uuid do |t|
      t.string :razorpay_order_id, null: false, index: { unique: true }
      t.integer :status, default: 0, null: false
      t.integer :amount, null: false
      t.string :currency, default: "INR", null: false
      t.string :merchant_name, null: false

      t.references :course, type: :uuid, foreign_key: true
      t.references :user, type: :uuid, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
