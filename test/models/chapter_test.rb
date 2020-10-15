# frozen_string_literal: true

require 'test_helper'

class ChapterTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(first_name: "tester", last_name: "ronald", phone_number: "+919411101050")
    @course = Course.create!(name: "Learn RRuby on Rails", description: "A comprehensive guide to Rails with indepth understanding of interview problems", user_id: @user.id)
    @chapter = @course.chapters.create!(name: "Introduction to Rails")
  end

  test "chapter is valid" do
    assert @chapter.valid?
  end

  test "chapter must have a valid name" do
    @chapter.name = "  "
    assert_not @chapter.valid?
  end

  test "chapter must belong to a course" do
    @chapter.course_id = "   "
    assert_not @chapter.valid?
  end
end
