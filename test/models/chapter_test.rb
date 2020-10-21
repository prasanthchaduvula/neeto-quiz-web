# frozen_string_literal: true

require 'test_helper'

class ChapterTest < ActiveSupport::TestCase
  def setup
    @chapter = chapters(:getting_started)
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

  test "chapter_name_should_be_unique_within_the_same_course" do
    @course = courses(:ruby_on_rails)
    @chapter = @course.chapters.new(name: "Getting Started")
    @chapter.save
    assert_not @chapter.valid?
    assert_equal ["Name has already been taken"], @chapter.errors.full_messages
  end
end
