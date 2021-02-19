# frozen_string_literal: true

require 'test_helper'

class Exam::QuestionTest < ActiveSupport::TestCase
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @question = @mocktest.questions.create!(description: "Sample question",
      options_attributes: [{ "name": "sample 1" }, { "name": "sample 2", "is_correct": true }, { "name": "sample 3" }, { "name": "sample 4" }])
  end

  test "Question is valid" do
    assert @question.valid?
  end

  test "Question has valid description" do
    @question.description = "   "
    assert_not @question.valid?
  end

  test "Question should have options" do
    new_question = @mocktest.questions.new(description: "New question",
      options_attributes: [])
    new_question.save
    assert_not new_question.valid?
    assert_equal [ "Options 4 required", "Options At least one option should be correct"], new_question.errors.full_messages
  end

  test "Question should have at least one correct option" do
    new_question = @mocktest.questions.new(description: "New question",
      options_attributes: [{ "name": "new 1" }, { "name": "new 2" }, { "name": "new 3" }, { "name": "new 4" }])
    new_question.save
    assert_not new_question.valid?
    assert_equal ["Options At least one option should be correct"], new_question.errors.full_messages
  end

  test "Question should not have more than one correct option" do
    new_question = @mocktest.questions.new(description: "New question",
      options_attributes: [{ "name": "new 1", "is_correct": true }, { "name": "new 2", "is_correct": true }, { "name": "new 3" }, { "name": "new 4" }])
    new_question.save
    assert_not new_question.valid?
    assert_equal ["Options Only one option should be correct"], new_question.errors.full_messages
  end

  test "Question should have 4 options" do
    new_question = @mocktest.questions.new(description: "New question",
      options_attributes: [{ "name": "new 1", "is_correct": true }, { "name": "new 2" }])
    new_question.save
    assert_not new_question.valid?
    assert_equal ["Options 4 required"], new_question.errors.full_messages
  end

  test "Question option should have name" do
    new_question = @mocktest.questions.new(description: "New question",
      options_attributes: [{ "is_correct": true }, { "name": "new 2" }, { "name": "new 3" }, { "name": "new 4" }])
    new_question.save
    assert_not new_question.valid?
    assert_equal ["Options name can't be blank", "Options name is too short (minimum is 1 character)"], new_question.errors.full_messages
  end
end