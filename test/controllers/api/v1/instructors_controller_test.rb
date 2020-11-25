# frozen_string_literal: true

require "test_helper"

class Api::V1::InstructorsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @instructor = users(:oliver)
  end

  test "Show Instructor" do
    get api_v1_instructor_path(@instructor.id), params: { format: :json }, headers: headers(@instructor)

    @instructor_courses =  Course.where(user_id: @instructor.id, published: true)

    jbuilder_response = { "instructor"=>{ "id"=>@instructor.id, "name"=>@instructor.name }, "courses"=>@instructor_courses }

    assert_response :success
    assert_equal jbuilder_response, JSON.parse(response.body)
  end
end
