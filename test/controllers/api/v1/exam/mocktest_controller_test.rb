# frozen_string_literal: true

require "test_helper"

class Api::V1::Exam::MocktestControllerTest < ActionDispatch::IntegrationTest
  def setup
    @mocktest = exam_mocktests(:solar_system)
    @user = users(:oliver)
  end

  test "should get index and list of all mocktest by the current user" do
    get api_v1_exam_mocktests_path, headers: headers(@user)
    assert_response :success
  end

  test "should get show action response" do
    get api_v1_exam_mocktest_path(@mocktest.id), headers: headers(@user)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal @mocktest.name, json_response["mocktest"]["name"]
  end

  test "should not create mocktest without authentication" do
    assert_difference "Exam::Mocktest.count", 0 do
      post api_v1_exam_mocktests_path, params: { mocktest: { name: "Test mocktest one" } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "should create a new mocktest" do
    assert_difference "Exam::Mocktest.count", 1 do
      post api_v1_exam_mocktests_path, params: { mocktest: { name: "Test mocktest one" } }, headers: headers(@user)
      assert_response :success
    end
  end

  test "should not update without authentication" do
    assert_difference "Exam::Mocktest.count", 0 do
      patch api_v1_exam_mocktest_path(@mocktest.id), params: { mocktest: { name: "Test mocktest one" } }

      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should update mocktest" do
    patch api_v1_exam_mocktest_path(@mocktest.id), params: { mocktest: { name: "Test mocktest updated" } }, headers: headers(@user)
    assert_response :success
  end

  test "should not destroy mocktest without authentication" do
    assert_difference "Exam::Mocktest.count", 0 do
      delete api_v1_exam_mocktest_path(@mocktest)
      assert_response :unauthorized

      json_response = JSON.parse(response.body)
      assert_equal "Could not authenticate with the provided credentials", json_response["error"]
    end
  end

  test "Should destroy mocktest" do
    assert_difference "Exam::Mocktest.count", -1 do
      delete api_v1_exam_mocktest_path(exam_mocktests(:general_knowledge)), headers: headers(@user)
      assert_response :success
    end
  end

  test "Should not destroy published mocktest" do
    assert_difference "Exam::Mocktest.count", 0 do
      delete api_v1_exam_mocktest_path(@mocktest), headers: headers(@user)
      assert_response :unprocessable_entity
      json_response = JSON.parse(response.body)
      assert_equal "You cannot delete a published mocktest", json_response["error"]
    end
  end

  test "Should not create mocktest with invalid params" do
    assert_difference "Exam::Mocktest.count", 0 do
      post api_v1_exam_mocktests_path, params: { mocktest: {} }, headers: headers(@user)

      assert_response :internal_server_error

      json_response = JSON.parse(response.body)
      assert_equal "param is missing or the value is empty: mocktest", json_response["error"]
    end
  end
end
