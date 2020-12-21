# frozen_string_literal: true

require 'test_helper'

class Exam::AttemptTest < ActiveSupport::TestCase
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @user = users(:samuel)
    @question = @mocktest.questions.create!(description: "Sample question",
      options_attributes: [{ "name": "sample 1" }, { "name": "sample 2", "is_correct": true }, { "name": "sample 3" }, { "name": "sample 4" }])
    @attempt = @mocktest.attempts.create!(user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }])
  end

  test "Attempt is valid" do
    assert @attempt.valid?
  end

  test "Attempt can have zero answers " do
    new_attempt = @mocktest.attempts.new(user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [])
    new_attempt .save
    assert new_attempt.valid?
  end
end