# frozen_string_literal: true

require "test_helper"

class Api::V1::InstructorsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @instructor = users(:oliver)
  end

  test "Show Instructor" do
    get api_v1_instructor_path(@instructor.id), params: { format: :json }, headers: headers(@instructor)

    @instructor_courses =  Course.where(user_id: @instructor.id, published: true)

    assert_response :success
  end
end
