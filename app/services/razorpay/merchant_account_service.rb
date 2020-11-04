# frozen_string_literal: true

require "razorpay"
require "json"

module Razorpay
  class MerchantAccountService
    attr_accessor :account_details

    def initialize(payment_details = {})
      @account_details = payment_details
    end

    def create_account
      parsed_response
    end

    private

      def entity
        Razorpay::AccountsService.new(account_details).create_account
      end

      def parsed_response
        JSON.parse(entity.to_json)
      end
  end
end