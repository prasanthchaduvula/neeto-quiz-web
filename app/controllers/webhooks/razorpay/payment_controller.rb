# frozen_string_literal: true

require 'razorpay'

module Webhooks::Razorpay
  class PaymentController < ApplicationController
    def verify
      load_order

      if @order
        update_order_status
        send_response_to_razorpay
      end
    end

    private

      def event
        params["event"]
      end

      def razorpay_order_id
        params["payload"]["payment"]["entity"]["order_id"]
      end

      def load_order
        @order = Order.find_by(razorpay_order_id: razorpay_order_id)
      end

      def update_order_status
        case event
        when "payment.captured"
          @order.payment_captured!
          # TODO: Initiate fund transfer to the razporpay_account_id associated with course creator
          # Issue: https://github.com/bigbinary/nitroacademy-web/issues/54
          # TODO: Add the order's user to join the order's course and send a text for confirmation
          # Issue: https://github.com/bigbinary/nitroacademy-web/issues/43
        when "payment.failed"
          # TODO: Send a text notifying the failure of payment
          @order.payment_failed!
        end
      end

      def send_response_to_razorpay
        render status: :ok
      end
  end
end
