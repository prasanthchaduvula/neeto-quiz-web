# frozen_string_literal: true

require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  def setup
    @lesson = lessons(:rails_migration)
  end

  test "lesson should be valid" do
    assert @lesson.valid?
  end

  test "lesson_name_should_be_present" do
    @lesson.name = ""
    assert_not @lesson.valid?
    assert_equal ["Name can't be blank"], @lesson.errors.full_messages
  end

  test "lesson_content_should_be_present" do
    @lesson.content = ""
    assert_not @lesson.valid?
    assert_equal ["Content can't be blank"], @lesson.errors.full_messages
  end

  test "chapter_must_exist" do
    @lesson.chapter_id = ""
    assert_not @lesson.valid?
    assert_equal ["Chapter must exist"], @lesson.errors.full_messages
  end

  test "lesson_type_must_exist" do
    @lesson.lesson_type = ""
    assert_not @lesson.valid?
  end

  test "lesson_name_should_be_unique_within_the_same_chapter" do
    @chapter = chapters(:getting_started)
    @lesson = @chapter.lessons.new(name: "Rails Migration", content: "https://youtu.be/G-B_KUFNkQQ", lesson_type: "youtube")
    @lesson.save
    assert_not @lesson.valid?
    assert_equal ["Name has already been taken"], @lesson.errors.full_messages
  end
end
