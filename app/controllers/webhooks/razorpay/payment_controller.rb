# frozen_string_literal: true

require 'razorpay'

module Webhooks::Razorpay
  class PaymentController < ApplicationController
    def verify
      update_order_status
      send_response_to_razorpay
    end

    private

      def event
        params.dig("event")
      end

      def load_payment_id
        @payment_id = params.dig("payload", "payment", "entity", "id")
      end

      def load_razorpay_order_id_from_payments_entity
        @razorpay_order_id = params.dig("payload", "payment", "entity", "order_id")
      end

      def load_razorpay_order_id_from_transfers_entity
        @razorpay_order_id = params.dig("payload", "transfer", "entity", "notes", "razorpay_order_id")
      end

      def load_order
        @order = Order.find_by!(razorpay_order_id: @razorpay_order_id)
      end

      def update_order_status
        case event
        when "payment.captured"
          load_payment_id
          load_razorpay_order_id_from_payments_entity
          load_order

          @order.payment_captured!
          AddStudentService.new(@order.course, @order.user, @order.user.phone_number).add_student
          Razorpay::TransferService.new(@order, @payment_id).transfer_funds_to_merchant
        when "payment.failed"
          load_razorpay_order_id_from_payments_entity
          load_order

          @order.payment_failed!
          # TODO: Send notification (https://github.com/bigbinary/neeto-academy-web/issues/62)
        when "transfer.processed"
          load_razorpay_order_id_from_transfers_entity
          load_order

          @order.transfer_processed!
        when "transfer.processed.settled"
          load_razorpay_order_id_from_transfers_entity
          load_order

          @order.transfer_settled!
        end
      end

      def send_response_to_razorpay
        render status: :ok, json: { status: "success" }
      end
  end
end
