# frozen_string_literal: true

class Api::V1::RegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:create, :update]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:create, :update]

  before_action :verify_otp, only: [:update]

  def create
    unless ENV["DEFAULT_OTP"].present?
      send_otp = Msg91MessageService.new.send_otp(params[:user][:phone_number])
      render json: { notice: send_otp["type"] }, status: :ok
    else
      render json: { notice: "Success" }, status: :ok
    end
  end

  def update
    if @response["type"] == "success"
      render json: { notice: "Verified" }, status: :ok
    else
      render json: { notice: @response["message"] }, status: :unprocessable_entity
    end
  end

  private

    def verify_otp
      if ENV["DEFAULT_OTP"].nil?
        @response = Msg91MessageService.new.verify_otp(params[:user][:phone_number], params[:user][:otp])
      elsif ENV["DEFAULT_OTP"].to_i == params[:user][:otp]
        @response = { "type" => "success" }
      else
        @response = { "type" => "failed", message: "Invalid OTP" }
      end
    end
end