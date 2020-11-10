# frozen_string_literal: true

require "razorpay"
require "json"

class CreateOrderService
  attr_reader :course, :student, :razorpay_response, :order
  attr_accessor :errors, :status, :response

  def initialize(course = {}, student = {})
    @course = course
    @student = student
    @errors = []
  end

  def process
    create_service_response
  end

  private

    def create_service_response
      fetch_razorpay_order_id && create_order
    end

    def fetch_razorpay_order_id
      begin
        @razorpay_response = Razorpay::OrdersService.new(order_payload).create_order
      rescue Razorpay::BadRequestError => e
        set_errors_and_status(e, :bad_request)
        false
      end
    end

    def create_order
      Order.transaction do
        @order = Order.create!(
          razorpay_order_id: razorpay_order_id,
          amount: course.price,
          merchant_name: merchant_name,
          course_id: course.id,
          user_id: student.id
        )

        @response = json_response
        @status = :ok

        true
      rescue ActiveRecord::RecordInvalid => invalid
        set_errors_and_status(invalid.record.errors.full_messages, :unprocessable_entity)
        false
      end
    end

    def set_errors_and_status(message, status)
      errors << message
      @status = status
    end

    def json_response
      { notice: "Order created successfully", order: order, key: 'rzp_test_mmqLGnTt8AkXIJ' }
    end

    def order_payload
      {
        amount: order_amount,
        currency: "INR"
      }
    end

    def order_amount
      course.price.to_i * 100
    end

    def razorpay_order_id
      response = JSON.parse(razorpay_response)
      response["id"]
    end

    def merchant_name
      course.user.name
    end
end