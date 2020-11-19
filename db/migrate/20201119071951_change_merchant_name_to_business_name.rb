# frozen_string_literal: true

class ChangeMerchantNameToBusinessName < ActiveRecord::Migration[6.0]
  def up
    rename_column :orders, :merchant_name, :business_name

    Order.transaction do
      Order.all.each do |order|
        order.update!(business_name: order.course&.user&.payment_details&.business_name)
      end
    end
  end

  def down
    rename_column :orders, :business_name, :merchant_name
  end
end
