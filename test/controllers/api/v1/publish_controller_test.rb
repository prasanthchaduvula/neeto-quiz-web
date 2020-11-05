# frozen_string_literal: true

require "test_helper"

class Api::V1::PublishControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:oliver)
    @course = courses(:ruby_on_rails)
  end

  test "publish a course" do
    patch api_v1_publish_path(@course.id), params: { course: { published: true } }, headers: headers(@user)
    assert_response :success
    assert_equal true, @course.reload.published
  end

  test "unpublish a course" do
    patch api_v1_publish_path(@course.id), params: { course: { published: false } }, headers: headers(@user)
    assert_response :success
    assert_equal false, @course.reload.published
  end

  test "course is unpublishable" do
    @course.published = true
    @course.save
    @course.course_students.create!(user: users(:samuel))
    patch api_v1_publish_path(@course.id), params: { course: { published: false } }, headers: headers(@user)
    assert_response :unprocessable_entity
    assert_equal true, @course.reload.published
  end
end