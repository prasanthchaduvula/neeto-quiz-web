# frozen_string_literal: true

require 'razorpay'

class Order < ApplicationRecord
  enum status: {
    order_created: 0,
    payment_captured: 1,
    payment_failed: 2,
    transfer_initiated: 3,
    transfer_processed: 4,
    transfer_settled: 5
  }

  belongs_to :user
  belongs_to :course

  validates :razorpay_order_id, presence: true, uniqueness: true
  validates :amount, presence: true
  validates :merchant_name, presence: true
end
