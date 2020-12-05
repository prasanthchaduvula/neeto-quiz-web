# frozen_string_literal: true

require "test_helper"

class Api::V1::Exam::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @question = @mocktest.questions.create!(description: "Sample question",
      options_attributes: [{ "name": "sample 1" }, { "name": "sample 2", "is_correct": true }, { "name": "sample 3" }, { "name": "sample 4" }])
    @user = users(:oliver)
  end

  test "should get index and list of all questions in the mocktest" do
    get api_v1_exam_mocktest_questions_path(mocktest_id: @mocktest.id), headers: headers(@user)
    assert_response :success
  end

  test "should get show action response" do
    get api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id), headers: headers(@user)
    assert_response :success
  end

  test "should not create question without authentication" do
    assert_difference "Exam::Question.count", 0 do
      post api_v1_exam_mocktest_questions_path(mocktest_id: @mocktest.id), params: { question: { description: "Test question one" } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "should create a new question" do
    assert_difference "Exam::Question.count", 1 do
      post api_v1_exam_mocktest_questions_path(mocktest_id: @mocktest.id), params: { question: { description: "New question",
        options_attributes: [{ "name": "new 1" }, { "name": "new 2", "is_correct": true }, { "name": "new 3" }, { "name": "new 4" }] } }, headers: headers(@user)
      assert_response :success
    end
  end

  test "should not update without authentication" do
    assert_difference "Exam::Question.count", 0 do
      patch api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id), params: { question: { description: "New question",
        options_attributes: [{ "name": "new 1" }, { "name": "new 2", "is_correct": true }, { "name": "new 3" }, { "name": "new 4" }] } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should update question desciption" do
    patch api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id), params: { question: { description: "New question description" } }, headers: headers(@user)
    assert_response :success
  end

  test "Should update question option" do
    patch api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id), params: { question: { options_attributes: [{ id: @question.options.first.id, "name": "first option updated" }] } }, headers: headers(@user)
    assert_response :success
  end

  test "should not destroy question without authentication" do
    assert_difference "Exam::Question.count", 0 do
      delete api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id)
      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should destroy question" do
    assert_difference "Exam::Question.count", -1 do
      delete api_v1_exam_mocktest_question_path(mocktest_id: @mocktest.id, id: @question.id), headers: headers(@user)
      assert_response :success
    end
  end

  test "Should not create question with invalid params" do
    assert_difference "Exam::Question.count", 0 do
      post api_v1_exam_mocktest_questions_path(mocktest_id: @mocktest.id), params: { question: {} }, headers: headers(@user)

      assert_response :internal_server_error

      json_response = JSON.parse(response.body)
      assert_equal "param is missing or the value is empty: question", json_response["error"]
    end
  end

  test "Should not have two options with the same name" do
    assert_difference "Exam::Question.count", 0 do
      post api_v1_exam_mocktest_questions_path(mocktest_id: @mocktest.id), params: { question: { description: "New question",
        options_attributes: [{ "name": "new 1" }, { "name": "new 2", "is_correct": true }, { "name": "new 3" }, { "name": "new 3" }] } }, headers: headers(@user)

      assert_response :unprocessable_entity

      json_response = JSON.parse(response.body)
      assert_equal "Same option already exists", json_response["error"]
    end
  end
end