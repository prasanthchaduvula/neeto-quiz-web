# frozen_string_literal: true

class CreatePaymentDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :payment_details, id: :uuid do |t|
      t.string :razorpay_account_id, null: false, index: { unique: true }
      t.string :ifsc, limit: 11, null: false
      t.bigint :account_number, null: false
      t.integer :account_type, default: 0, null: false
      t.string :business_name, null: false
      t.string :email_id, null: false
      
      t.references :user, type: :uuid, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
