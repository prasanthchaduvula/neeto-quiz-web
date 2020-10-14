# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(phone_number: "+917680918423", first_name: "Eve", last_name: "Smith")
  end

  test "user should be valid" do
    assert @user.valid?
  end

  test "first name should be present" do
    @user.first_name = ""
    assert_not @user.valid?
  end

  test "last name should be present" do
    @user.last_name = ""
    assert_not @user.valid?
  end

  test "phone number should be present" do
    @user.phone_number = ""
    assert_not @user.valid?
  end

  test "phone number should be of valid length" do
    @user.phone_number = "+91" * 15
    assert_not @user.valid?
  end

  test "phone number should be unique" do
    new_user = User.new(first_name: "sample", last_name: "user", phone_number: @user.phone_number)
    new_user.save
    assert_not new_user.valid?
  end

  test "phone number should be numerical" do
    @user.phone_number = "+qw76809184"
    assert_not @user.valid?
  end
end
