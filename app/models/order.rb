# frozen_string_literal: true

require 'razorpay'

class Order < ApplicationRecord
  default_scope { order(created_at: :desc) }

  enum status: {
    order_created: 0,
    payment_initiated: 1,
    payment_captured: 2,
    payment_failed: 3,
    transfer_initiated: 4,
    transfer_processed: 5,
    transfer_settled: 6
  }

  belongs_to :user
  belongs_to :course

  validates :razorpay_order_id, presence: true, uniqueness: true
  validates :amount, presence: true
  validates :merchant_name, presence: true

  scope :paid, -> { where.not status: "order_created" }
end
