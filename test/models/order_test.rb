# frozen_string_literal: true

require "test_helper"

class OrderTest < ActiveSupport::TestCase
  attr_accessor :order

  def setup
    @order = orders(:one)
  end

  test "order should be valid" do
    assert order.valid?
  end

  test "razorpay order id should be present" do
    order.update razorpay_order_id: ""
    assert_empty order[:razorpay_order_id]
    assert_not order.valid?
    assert_includes order.errors[:razorpay_order_id], "can't be blank"
  end

  test "razorpay order id should be unique" do
    new_order = Order.new(
      razorpay_order_id: order[:razorpay_order_id],
      amount: 30,
      course: courses(:react_js),
      merchant_name: "Oliver Smith",
      user: users(:oliver),
    )
    assert_not new_order.valid?
    assert_includes new_order.errors[:razorpay_order_id], "has already been taken"
  end

  test "amount should be present" do
    order.update amount: nil
    assert_nil order[:amount]
    assert_not order.valid?
    assert_includes order.errors[:amount], "can't be blank"
  end

  test "merchant name should be present" do
    order.update merchant_name: ""
    assert_empty order[:merchant_name]
    assert_not order.valid?
    assert_includes order.errors[:merchant_name], "can't be blank"
  end

  test "course should be present" do
    order.update course_id: nil
    assert_nil order[:course_id]
    assert_not order.valid?
    assert_includes order.errors[:course], "must exist"
  end

  test "user should be present" do
    order.update user_id: nil
    assert_nil order[:user_id]
    assert_not order.valid?
    assert_includes order.errors[:user], "must exist"
  end

  test "orders whose payment has been initiated should be scoped under paid orders" do
    assert_equal "order_created", order.status
    assert_empty Order.paid

    assert_difference "Order.paid.count", +1 do
      order.payment_initiated!
    end
  end
end