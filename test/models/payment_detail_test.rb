# frozen_string_literal: true

require "test_helper"

class PaymentDetailTest < ActiveSupport::TestCase
  attr_accessor :payment_detail

  def setup
    @payment_detail = payment_details(:one)
  end

  test "payment_detail_should_be_valid" do
    assert payment_detail.valid?
  end

  test "razorpay_account_id_should_be_present" do
    payment_detail.update razorpay_account_id: ""
    assert_empty payment_detail[:razorpay_account_id]
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:razorpay_account_id], "can't be blank"
  end

  test "razorpay_account_id_should_be_unique" do
    new_payment_detail = PaymentDetail.new(
      razorpay_account_id: payment_detail[:razorpay_account_id],
      ifsc: "AXIN0012021",
      business_name: "Acme Corp",
      account_number: 1234567890123456789,
      email_id: "email@example.com",
      user: users(:samuel)
    )
    assert_not new_payment_detail.valid?
    assert_includes new_payment_detail.errors[:razorpay_account_id], "has already been taken"
  end

  test "ifsc_should_be_present" do
    payment_detail.update ifsc: ""
    assert_empty payment_detail[:ifsc]
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:ifsc], "can't be blank"
  end

  test "ifsc_should_be_eleven_characters_long" do
    payment_detail.update ifsc: "AXIN0"
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:ifsc], "is the wrong length (should be 11 characters)"

    payment_detail.update ifsc: "AXIN1278902"
    assert payment_detail.valid?
  end

  test "account_number_should_be_present" do
    payment_detail.update(account_number: nil)
    assert_nil payment_detail[:account_number]
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:account_number], "can't be blank"
  end

  test "account_number_should_be_less_than_sixteen_characters" do
    new_payment_detail = PaymentDetail.new(
      razorpay_account_id: "acc_Fwd12dXat4w44KUk",
      ifsc: "AXIN0012021",
      account_number: 1234567890123456789,
      email_id: "email@example.com",
      user: users(:samuel)
    )

    assert_not new_payment_detail.valid?
    assert_includes new_payment_detail.errors[:account_number], "is too long (maximum is 16 characters)"
  end

  test "account_number_should_be_more_than_eleven_characters" do
    new_payment_detail = PaymentDetail.new(
      razorpay_account_id: "acc_Fwdxkxat4w44KUk",
      ifsc: "AXIN0012021",
      account_number: 123456,
      email_id: "email@example.com",
      user: users(:samuel)
    )

    assert_not new_payment_detail.valid?
    assert_includes new_payment_detail.errors[:account_number], "is too short (minimum is 11 characters)"
  end

  test "account_number_should_be_integer" do
    new_payment_detail = PaymentDetail.new(
      razorpay_account_id: "acc_FwdxHdac4w44KUk",
      ifsc: "AXIN0012021",
      account_number: "12345678901ANX",
      email_id: "email@example.com",
      user: users(:samuel)
    )

    assert_not new_payment_detail.valid?
    assert_includes new_payment_detail.errors[:account_number], "is not a number"
  end

  test "email_id_is_downcased_before_validation" do
    payment_detail.update(email_id: "sHOulDBeDowNCased@mail.com")
    assert_equal payment_detail[:email_id], "shouldbedowncased@mail.com"
  end

  test "email_id_should_be_present" do
    payment_detail.update email_id: ""
    assert_empty payment_detail[:email_id]
    assert_not payment_detail.valid?
    assert_includes payment_detail[:email_id], ""
  end

  test "email_id_should_be_unique" do
    new_payment_detail = PaymentDetail.new(
      razorpay_account_id: "acc_Foodocat4w44KUk",
      ifsc: "AXIN0012021",
      account_number: 123456789111,
      business_name: "Acme Corp",
      email_id: payment_detail[:email_id],
      user: users(:samuel)
    )

    assert_equal new_payment_detail[:email_id], payment_detail[:email_id]
    assert_not new_payment_detail.valid?
    assert_includes new_payment_detail.errors[:email_id], "has already been taken"

    new_payment_detail[:email_id] = "email@example.com"
    assert new_payment_detail.valid?
  end

  test "email_id_should_have_a_valid_format" do
    payment_detail.update email_id: "invalid@mail"
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:email_id], "is not a valid email address"

    payment_detail.update email_id: "invalidmail.com"
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:email_id], "is not a valid email address"

    payment_detail.update email_id: "invalid@email,com"
    assert_not payment_detail.valid?
    assert_includes payment_detail.errors[:email_id], "is not a valid email address"
  end
end