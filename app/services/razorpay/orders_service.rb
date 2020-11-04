# frozen_string_literal: true

require "razorpay"
require "json"

class Razorpay::OrdersService
  attr_reader :order_details, :response

  def initialize(order_details = {})
    @order_details = order_details
  end

  def create_order
    create_service_response
  end

  private

    def create_service_response
      setup_razorpay
      create_razorpay_order
      serialize_response
    end

    def setup_razorpay
      Razorpay.setup('rzp_test_mmqLGnTt8AkXIJ', 'zDt0nX3LM8WyxXH5uMNOdlJk')
    end

    def create_razorpay_order
      @response = Razorpay::Order.create order_details
    end

    def serialize_response
      response.to_json
    end
end