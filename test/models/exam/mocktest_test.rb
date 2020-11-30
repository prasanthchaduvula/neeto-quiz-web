# frozen_string_literal: true

require 'test_helper'

class Exam::MocktestTest < ActiveSupport::TestCase
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @user = users(:oliver)
  end

  test "Mocktest is valid" do
    assert @mocktest.valid?
  end

  test "Mocktest has valid name" do
    @mocktest.name = "   "
    assert_not @mocktest.valid?
  end

  test "Mocktest has a instructor" do
    @mocktest.user_id = "   "
    assert_not @mocktest.valid?
  end

  test "Mocktest is publishable" do
    @mocktest.is_published = true
    @mocktest.save
    assert @mocktest.valid?
  end

  test "Unpublish mocktest" do
    @mocktest.is_published = true
    @mocktest.save
    @mocktest.is_published = false
    @mocktest.save
    assert @mocktest.valid?
  end

  test "Mocktest has an invitation code" do
    @mocktest.invitation_code = " "
    assert_not @mocktest.valid?
  end

  test "Mocktest should have an unique invitation code" do
    new_mocktest = Exam::Mocktest.create(name: "Sample Mocktest", user: @user)
    new_mocktest.invitation_code = @mocktest.invitation_code
    new_mocktest.save
    assert_equal ["Invitation code has already been taken"], new_mocktest.errors.full_messages
  end
end