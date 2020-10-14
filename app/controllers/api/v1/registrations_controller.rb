# frozen_string_literal: true

class Api::V1::RegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user!, only: [:new, :create]
  skip_before_action :authenticate_user_using_x_auth_token, only: [:new, :create]

  before_action :verify_otp, only: [:create]
  before_action :load_user, only: [:create]

  require 'uri'
  require 'net/http'

  def new
    send_otp
  end

  def create
    puts @response["type"]
    if @response["type"] == "success"
      puts "enter success"
      if @user.nil?
        @user = User.new(user_params)
        if @user.save
          sign_in(@user)
          render json: { notice: "Registration successful", user: @user }
        else
          render json: { notice: "Registration failed", user: @user.errors.full_messages }
        end
      else
        sign_in(@user)
        render json: { notice: "user exists we should log in", user: @user }
      end
    else
      puts "enter error"
      render json: { notice: @response }
    end
  end

  private

    def send_otp
      url = URI("https://api.msg91.com/api/v5/otp?authkey=344320ADzUdaWyKVf5f8684dbP1&template_id=5f868692317bbf40b878216c&mobile=#{params[:user][:phone_number]}")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      render json: { notice: JSON.parse(response.body) }
    end

    def verify_otp
      url = URI("https://api.msg91.com/api/v5/otp/verify?mobile=#{params[:user][:phone_number]}&otp=#{params[:user][:otp]}&authkey=344320ADzUdaWyKVf5f8684dbP1")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      request = Net::HTTP::Post.new(url)
      reqres = http.request(request)
      @response = JSON.parse(reqres.body)
    end

    def user_params
      params.require(:user).permit(:phone_number)
    end

    def load_user
      @user = User.find_by(phone_number: params[:user][:phone_number])
    end
end