# frozen_string_literal: true

require "test_helper"

class Api::V1::Exam::AttemptsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @user = users(:oliver)
    @question = @mocktest.questions.create!(description: "Sample question",
      options_attributes: [{ "name": "sample 1" }, { "name": "sample 2", "is_correct": true }, { "name": "sample 3" }, { "name": "sample 4" }])
    @attempt = @mocktest.attempts.create!(user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }])
  end

  test "Should be member of mocktest to get all mocktest attempts either student or instructor" do
    new_user = users(:samuel)
    get api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), headers: headers(new_user)

    assert_response :bad_request
    json_response = JSON.parse(response.body)
    assert_equal "You are not the member of mocktest", json_response["notice"]
  end

  test "Get all mocktest attempts either student or instructor" do
    get api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), headers: headers(@user)
    assert_response :success
  end

  test "should get show action response" do
    get api_v1_exam_mocktest_attempt_path(mocktest_id: @mocktest.id, id: @attempt.id), headers: headers(@user)
    assert_response :success
  end

  test "Should not create attempt without authentication" do
    assert_difference "Exam::Attempt.count", 0 do
      post api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), params: { attempt: { user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }] } }

      assert_response :unauthorized
      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should not be creator of the mocktest to make attempt" do
    assert_difference "Exam::Attempt.count", 0 do
      post api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), params: { attempt: { user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }] } }, headers: headers(@user)

      assert_response :unprocessable_entity
      json_response = JSON.parse(response.body)
      assert_equal "You are the creator of this mocktest", json_response["notice"]

    end
  end

  test "Should be the member of mocktest to make attempt" do
    new_user = users(:samuel)
    assert_difference "Exam::Attempt.count", 0 do
      post api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), params: { attempt: { user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }] } }, headers: headers(new_user)

      assert_response :bad_request
      json_response = JSON.parse(response.body)
      assert_equal "You are not the member of mocktest", json_response["notice"]
    end
  end

  test "Create a mocktest attempt" do
    new_user = users(:samuel)
    @mocktest.exam_students.create!(user: new_user)
    assert_difference "Exam::Attempt.count", 1 do
      post api_v1_exam_mocktest_attempts_path(mocktest_id: @mocktest.id), params: { attempt: { user_id: @user.id, mocktest_id: @mocktest.id, attempt_answers_attributes: [{ option_id: @question.options.first.id, question_id: @question.id }] } }, headers: headers(new_user)

      assert_response :success
      json_response = JSON.parse(response.body)
      assert_equal "Attempted successfully", json_response["notice"]
    end
  end
end