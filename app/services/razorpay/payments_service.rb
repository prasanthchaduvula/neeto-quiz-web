# frozen_string_literal: true

require "razorpay"
require "json"

module Razorpay
  class PaymentsService
    attr_accessor :account_id, :amount, :currency, :notes

    def initialize(razorpay_account_id, amount, currency, notes = {})
      @account_id = razorpay_account_id
      @amount = amount
      @currency = currency
      @notes = notes

      setup_razorpay
      set_razorpay_headers
    end

    def create_transfers
      request.post("/#{account_id}/transfers", transfers_payload.to_json)
    end


    private

      def request
        Razorpay::Request.new('payments')
      end

      def setup_razorpay
        Razorpay.setup('rzp_test_mmqLGnTt8AkXIJ', 'zDt0nX3LM8WyxXH5uMNOdlJk')
      end

      def set_razorpay_headers
        Razorpay.headers=custom_header
      end

      def custom_header
        { "Content-type": "application/json" }
      end

      def transfers_payload
        {
          "transfers": [
            {
              "account": account_id,
              "amount": amount,
              "currency": currency,
              "notes": notes,
              "on_hold": false
            }
          ]
        }
      end
  end
end