# frozen_string_literal: true

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  def setup
    @course = Course.create!(name: "Learn RRuby on Rails", description: "A comprehensive guide to Rails with indepth understanding of interview problems")
  end

  test "course is valid" do
    @course.name = "   "
    assert_not @course.valid?
  end

  test "course validation with empty description" do
    @course.description = "   "
    assert_not @course.valid?
  end
end
