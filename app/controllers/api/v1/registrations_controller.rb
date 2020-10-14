# frozen_string_literal: true

class Api::V1::RegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:new, :create]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:new, :create]

  before_action :verify_otp, only: [:create]
  before_action :load_user, only: [:create]

  def new
    send_otp = Msg91MessageService.new.send_otp(params[:user][:phone_number])
    render json: { notice: send_otp }
  end

  def create
    if @response["type"] == "success"
      register_user
    else
      render json: { notice: @response }
    end
  end

  private

    def verify_otp
      @response = Msg91MessageService.new.verify_otp(params[:user][:phone_number], params[:user][:otp])
    end

    def register_user
      if @user.nil?
        @user = User.new(user_params)
        if @user.save
          render json: { notice: "Registration successful", user: @user }
        else
          render json: { notice: "Registration failed", user: @user.errors.full_messages }
        end
      else
        render json: { notice: "User exists, use user token and phone number for login", user: @user }
      end
    end

    def user_params
      params.require(:user).permit(:phone_number)
    end

    def load_user
      @user = User.find_by(phone_number: params[:user][:phone_number])
    end
end