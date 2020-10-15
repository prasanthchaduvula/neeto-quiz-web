# frozen_string_literal: true

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(first_name: "tester", last_name: "ronald", phone_number: "+919411101050")
    @course = Course.create!(name: "Learn RRuby on Rails", description: "A comprehensive guide to Rails with indepth understanding of interview problems", user_id: @user.id)
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

  test "course has an author" do
    @course.user_id = "   "
    assert_not @course.valid?
  end
end
