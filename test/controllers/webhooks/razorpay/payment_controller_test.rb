# frozen_string_literal: true

require "test_helper"

class Webhooks::Razorpay::PaymentControllerTest < ActionDispatch::IntegrationTest
  attr_reader :order, :payment_id

  def setup
    @order = orders(:one)
    @payment_id = "pay_random_id"
  end

  test "payment captured event" do
    stub_post(transfer_url, transfer_payload)
    post webhooks_razorpay_verify_url, params: payment_captured_event

    assert_response :ok
    assert_equal "verify", @controller.action_name

    assert_equal order.razorpay_order_id, @controller.send(:load_razorpay_order_id_from_payments_entity)
    assert_equal order, @controller.send(:load_order)

    assert_equal "success", JSON.parse(response.body)["status"]
  end

  test "payment captured event with invalid params" do
    stub_post(transfer_url, transfer_payload)
    post webhooks_razorpay_verify_url, params: event_with_invalid_params

    assert_response :ok
    assert_equal "verify", @controller.action_name

    assert_nil @controller.send(:load_razorpay_order_id_from_payments_entity)
    assert_raises "ActiveRecord::RecordNotFound" do
      @controller.send(:load_order)
    end
  end

  test "payment failed event" do
    post webhooks_razorpay_verify_url, params: payment_failed_event

    assert_response :ok
    assert_equal "verify", @controller.action_name

    assert_equal order.razorpay_order_id, @controller.send(:load_razorpay_order_id_from_payments_entity)
    assert_equal order, @controller.send(:load_order)

    assert_equal "success", JSON.parse(response.body)["status"]
  end

  test "payment failed event with invalid params" do
    post webhooks_razorpay_verify_url, params: event_with_invalid_params

    assert_response :ok
    assert_equal "verify", @controller.action_name

    assert_nil @controller.send(:load_razorpay_order_id_from_payments_entity)
    assert_raises "ActiveRecord::RecordNotFound" do
      @controller.send(:load_order)
    end
  end

  test "transfer processed event" do
    post webhooks_razorpay_verify_url, params: transfer_processed_event

    assert_response :ok
    assert_equal "verify", @controller.action_name

    assert_equal order.razorpay_order_id, @controller.send(:load_razorpay_order_id_from_transfers_entity)
    assert_equal order, @controller.send(:load_order)

    assert_equal "success", JSON.parse(response.body)["status"]
  end

  test "transfer processed event with invalid razorpay order id" do
    post webhooks_razorpay_verify_url, params: transfer_processed_event_with_invalid_rzp_order_id

    assert_response :not_found
    assert_equal "verify", @controller.action_name

    assert_equal "ord_invalid", @controller.send(:load_razorpay_order_id_from_transfers_entity)
    assert_raises ActiveRecord::RecordNotFound do
      @controller.send(:load_order)
    end

    assert_includes JSON.parse(response.body)["errors"], "Record not found"
  end

  test "transfer settled event" do
    post webhooks_razorpay_verify_url, params: transfer_settled_event

    assert_response :ok
    assert_equal "verify", @controller.action_name
    assert_equal order.razorpay_order_id, @controller.send(:load_razorpay_order_id_from_transfers_entity).to_s
    assert_equal order, @controller.send(:load_order)
    assert_equal "success", JSON.parse(response.body)["status"]
  end

  private

    def event_with_invalid_params
      { "event": { "params": "invalid" } }
    end

    def transfer_url
      "https://api.razorpay.com/v1/payments/#{payment_id}/transfers"
    end

    def transfer_payload
      {
        "transfers": [
          {
            "account": "acc_FwdxHdXat4w44KUk",
            "amount": 2000,
            "currency": "INR",
            "notes": {
              "name":  "Samuel Smith",
              "razorpay_order_id": order.razorpay_order_id,
            },
            "linked_account_notes": [
              "razorpay_order_id"
            ],
            "on_hold": false
          }
        ]
      }
    end

    def payment_captured_event
      {
        "event": "payment.captured",
        "payload": {
          "payment": {
            "entity": {
              "id": payment_id,
              "entity": "payment",
              "amount": 100,
              "currency": "INR",
              "status": "captured",
              "order_id": order.razorpay_order_id,
              "international": false,
              "method": "netbanking",
              "amount_refunded": 0,
              "amount_transferred": 0,
              "captured": true,
              "bank": "HDFC",
              "email": "eve.smith@example.com",
              "fee": 2,
              "tax": 0
            }
          }
        }
      }
    end

    def payment_failed_event
      {
        "event": "payment.failed",
        "payload": {
          "payment": {
            "entity": {
              "id": payment_id,
              "entity": "payment",
              "amount": 100,
              "currency": "INR",
              "status": "failed",
              "order_id": order.razorpay_order_id,
              "international": false,
              "method": "netbanking",
              "amount_refunded": 0,
              "amount_transferred": 0,
              "captured": true,
              "bank": "HDFC",
              "email": "eve.smith@example.com",
              "fee": 2,
              "tax": 0
            }
          }
        }
      }
    end

    def transfer_processed_event
      {
        "entity": "event",
        "event": "transfer.processed",
        "payload": {
          "transfer": {
            "entity": {
              "amount": 100,
              "currency": "INR",
              "notes": {
                "name": "Eve Smith",
                "razorpay_order_id": order.razorpay_order_id
              }
            }
          }
        }
      }
    end

    def transfer_settled_event
      {
        "entity": "event",
        "event": "transfer.settled",
        "payload": {
          "transfer": {
            "entity": {
              "amount": 100,
              "currency": "INR",
              "notes": {
                "name": "Eve Smith",
                "razorpay_order_id": order.razorpay_order_id
              }
            }
          }
        }
      }
    end

    def transfer_processed_event_with_invalid_rzp_order_id
      {
        "entity": "event",
        "event": "transfer.processed",
        "payload": {
          "transfer": {
            "entity": {
              "amount": 100,
              "currency": "INR",
              "notes": {
                "name": "Eve Smith",
                "razorpay_order_id": "ord_invalid"
              }
            }
          }
        }
      }
    end
end
