# frozen_string_literal: true

require "razorpay"
require "json"

module Razorpay
  class AccountsService
    attr_accessor :account_details, :account_id

    def initialize(account_details = {}, razorpay_account_id = "")
      @account_details = account_details
      @account_id = razorpay_account_id

      setup_razorpay
      set_razorpay_headers
    end

    def create_account
      request.post("/", account_details.to_json)
    end

    def fetch_account
      request.fetch(account_id)
    end


    private

      def request
        Razorpay::Request.new('beta/accounts')
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