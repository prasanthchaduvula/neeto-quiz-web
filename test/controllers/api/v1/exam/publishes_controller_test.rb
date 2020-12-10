# frozen_string_literal: true

require "test_helper"

class Api::V1::Exam::PublishesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:oliver)
    @mocktest = exam_mocktests(:solar_system)
    @question = @mocktest.questions.create!(description: "Sample question",
      options_attributes: [{ "name": "sample 1" }, { "name": "sample 2", "is_correct": true }, { "name": "sample 3" }, { "name": "sample 4" }])
  end

  test "publish a mocktest" do
    patch api_v1_exam_mocktest_publish_path(@mocktest.id), params: { mocktest: { is_published: true } }, headers: headers(@user)
    assert_response :success
    assert_equal true, @mocktest.reload.is_published
  end

  test "unpublish a mocktest" do
    patch api_v1_exam_mocktest_publish_path(@mocktest.id), params: { mocktest: { is_published: false } }, headers: headers(@user)
    assert_response :success
    assert_equal false, @mocktest.reload.is_published
  end

  test "mocktest is unpublishable" do
    @mocktest.is_published = true
    @mocktest.save
    @mocktest.exam_students.create!(user: users(:samuel))
    patch api_v1_exam_mocktest_publish_path(@mocktest.id), params: { mocktest: { is_published: false } }, headers: headers(@user)
    assert_response :unprocessable_entity
    assert_equal true, @mocktest.reload.is_published
  end

  test "ensure at least one question is present" do
    new_mocktest = exam_mocktests(:general_knowledge)
    patch api_v1_exam_mocktest_publish_path(new_mocktest.id), params: { mocktest: { is_published: true } }, headers: headers(@user)
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal "Make sure at least one question is present in the mocktest", json_response["error"]
  end
end