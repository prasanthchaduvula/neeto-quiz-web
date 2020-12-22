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
      set_razorpay_headers
      create_razorpay_order
      serialize_response
    end

    def setup_razorpay
      Razorpay.setup(
        ENV["RAZORPAY_API_KEY_ID"] || Rails.application.credentials.dig(:razorpay_api_key_id),
        ENV["RAZORPAY_API_KEY_SECRET"] || Rails.application.credentials.dig(:razorpay_api_key_secret)
      )
    end

    def create_razorpay_order
      @response = request.create order_details.to_json
    end

    def request
      Razorpay::Request.new('orders')
    end

    def set_razorpay_headers
      Razorpay.headers=custom_header
    end

    def custom_header
      { "Content-type": "application/json" }
    end

    def serialize_response
      response.to_json
    end
end