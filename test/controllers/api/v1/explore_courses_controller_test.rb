# frozen_string_literal: true

require "test_helper"

class Api::V1::ExploreCoursesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:oliver)
    @course = courses(:ruby_on_rails)
  end

  test "Add course to market place" do
    patch api_v1_explore_course_path(@course.id), params: { course: { is_explored: true } }, headers: headers(@user)
    assert_response :success
    assert_equal true, @course.reload.is_explored
  end

  test "Make sure course is published to add to the market place" do
    new_course = courses(:react_js)
    patch api_v1_explore_course_path(new_course.id), params: { course: { is_explored: true } }, headers: headers(@user)
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal "Make sure that course is published", json_response["error"]
  end

  test "Remove course from market place" do
    new_course = courses(:react_js)
    patch api_v1_explore_course_path(@course.id), params: { course: { is_explored: false } }, headers: headers(@user)
    assert_response :success
    assert_equal false, @course.reload.is_explored
  end
end
