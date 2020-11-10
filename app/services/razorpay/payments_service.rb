# frozen_string_literal: true

require "razorpay"
require "json"

module Razorpay
  class PaymentsService
    attr_accessor :transfers_payload, :payment_id

    def initialize(transfers_payload = {}, payment_id = "")
      @transfers_payload = transfers_payload
      @payment_id = payment_id
      setup_razorpay
      set_razorpay_headers
    end

    def create_transfers
      request.post(url, transfers_payload.to_json)
    end


    private

      def request
        Razorpay::Request.new('payments')
      end

      def url
        "#{payment_id}/transfers"
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
  end
end