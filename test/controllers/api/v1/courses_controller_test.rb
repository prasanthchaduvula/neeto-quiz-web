# frozen_string_literal: true

require "test_helper"

class Api::V1::CoursesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:oliver)
    @course = courses(:ruby_on_rails)
  end

  test "Course is valid" do
    assert @course.valid?
  end

  test "should get index and list of all courses by the current user" do
    get api_v1_courses_path, headers: headers(@user)
    assert_response :success
  end

  test "should get show action response" do
    get api_v1_course_path(@course.id), headers: headers(@user)
    assert_response :success
  end

  test "should not create course without authentication" do
    assert_difference "Course.count", 0 do
      post api_v1_courses_path, params: { course: { name: "Sample course", description: "This is sample" } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "should create a new course" do
    assert_difference "Course.count", 1 do
      post api_v1_courses_path, params: { course: { name: "Sample course", description: "This is sample" } }, headers: headers(@user)
      assert_response :success
    end
  end

  test "should not update without authentication" do
    assert_difference "Course.count", 0 do
      patch api_v1_course_path(@course.id), params: { course: { name: "Sample course", description: "This is sample" } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should update course" do
    patch api_v1_course_path(@course.id), params: { course: { name: "Sample course", description: "This is sample" } }, headers: headers(@user)
    assert_response :success
  end

  test "should not destroy course without authentication" do
    assert_difference "Course.count", 0 do
      delete api_v1_course_path(@course.id)

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should destroy course" do
    new_course = courses(:next_js)
    assert_difference "Course.count", -1 do
      delete api_v1_course_path(new_course.id), headers: headers(@user)
      assert_response :success
    end
  end

  test "Should not delete a published course" do
    assert_difference "Course.count", 0 do
      delete api_v1_course_path(@course.id), headers: headers(@user)
      assert_response :unprocessable_entity

      json_response = JSON.parse(response.body)
      assert_equal "You cannot delete a published course", json_response["error"]
    end
  end

  test "publish a course" do
    put publish_api_v1_course_path(@course.id), headers: headers(@user)
    assert_response :success
    assert_equal true, @course.reload.published
  end

  test "unpublish a course" do
    put unpublish_api_v1_course_path(@course.id), headers: headers(@user)
    assert_response :success
    assert_equal false, @course.reload.published
  end

  test "course is unpublishable" do
    @course.published = true
    @course.save
    @course.course_students.create!(user: users(:samuel))
    put unpublish_api_v1_course_path(@course.id), headers: headers(@user)
    assert_response :unprocessable_entity
    assert_equal true, @course.reload.published
  end

  test "ensure at least one lesson is published" do
    new_course = courses(:react_js)
    put publish_api_v1_course_path(new_course.id), headers: headers(@user)
    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert_equal "Make sure at least one lesson is published", json_response["error"]
  end
end