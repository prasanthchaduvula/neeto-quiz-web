# frozen_string_literal: true

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  def setup
    @course = courses(:ruby_on_rails)
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
end
