# frozen_string_literal: true

require "razorpay"
require "json"

module Razorpay
  class TransferService
    attr_accessor :order
    attr_reader :payment_id

    def initialize(order = {}, payment_id = "")
      @order = order
      @payment_id = payment_id
    end

    def transfer_funds_to_merchant
      create_transfer
      update_order_status
    end

    private

      def update_order_status
        order.transfer_initiated!
      end

      def create_transfer
        Razorpay::PaymentsService.new(payload, payment_id).create_transfers
      end

      def payload
        {
          "transfers": [
            {
              "account": merchant_razorpay_account_id,
              "amount": amount,
              "currency": "INR",
              "notes": {
                "name":  student_name,
                "razorpay_order_id": razorpay_order_id,
              },
              "linked_account_notes": [
                "razorpay_order_id"
              ],
              "on_hold": false
            }
          ]
        }
      end

      def merchant_razorpay_account_id
        order.course&.user&.payment_details&.razorpay_account_id
      end

      def amount
        order.amount.to_i * 100
      end

      def student_name
        order.user.name
      end

      def razorpay_order_id
        order.razorpay_order_id
      end
  end
end