# frozen_string_literal: true

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  def setup
    @course = courses(:ruby_on_rails)
    @user = users(:oliver)
  end

  test "course is valid" do
    assert @course.valid?
  end

  test "course has valid name" do
    @course.name = "   "
    assert_not @course.valid?
  end

  test "course validation with empty description" do
    @course.description = "   "
    assert_not @course.valid?
  end

  test "course has a teacher" do
    @course.user_id = "   "
    assert_not @course.valid?
  end

  test "course is publishable" do
    @course.published = true
    @course.save
    assert @course.valid?
  end

  test "unpublish course" do
    @course.published = true
    @course.save
    @course.published = false
    @course.save
    assert @course.valid?
  end

  test "Course has an invitation code" do
    @course.invitation_code = " "
    assert_not @course.valid?
  end

  test "Course should have an unique invitation code" do
    new_course = Course.create(name: "Test course", description: "This is description", user: @user)
    new_course.invitation_code = @course.invitation_code
    new_course.save
    assert_equal ["Invitation code has already been taken"], new_course.errors.full_messages
  end
end
