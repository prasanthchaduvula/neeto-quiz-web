# frozen_string_literal: true

class Api::V1::LoginController  < Api::V1::BaseController
  skip_before_action :authenticate_user!
  skip_before_action :authenticate_user_using_x_auth_token

  before_action :load_organization
  before_action :ensure_organization
  before_action :ensure_organization_member
  before_action :verify_otp, only: [:verifyotp]

  def sendotp
    unless ENV["DEFAULT_OTP"].present?
      send_otp = Msg91MessageService.new.send_otp(params[:phone_number])
      render json: { notice: send_otp["type"] }, status: :ok
    else
      render json: { notice: "Success" }, status: :ok
    end
  end

  def verifyotp
    if @response["type"] == "success"
      render json: { notice: "Verified", organization: @organization, user: @user }, status: :ok
    else
      render json: { notice: @response["message"] }, status: :unprocessable_entity
    end
  end

  private

    def verify_otp
      if ENV["DEFAULT_OTP"].nil?
        @response = Msg91MessageService.new.verify_otp(params[:phone_number], params[:otp])
      elsif ENV["DEFAULT_OTP"].to_i == params[:otp]
        @response = { "type" => "success" }
      else
        @response = { "type" => "failed", message: "Invalid OTP" }
      end
    end

    def load_organization
      @organization = Organization.find_by(subdomain: params[:subdomain])
    end

    def ensure_organization
      unless @organization
        render json: { error: "No organization exist with this subdomain" }, status: :unprocessable_entity
      end
    end

    def ensure_organization_member
      @user = User.find_by(organization_id: @organization.id, phone_number: params[:phone_number])
      unless @user
        render json: { error: "You are not the member of this organization" }, status: :unprocessable_entity
      end
    end
end