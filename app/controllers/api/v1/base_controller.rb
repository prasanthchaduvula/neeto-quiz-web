# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :authenticate_user!

  respond_to :json

  private

    def respond_with_error(message, status = 500)
      render json: { error: message }, status: status
    end

    def log_exception(exception)
      Rails.logger.info exception.class.to_s
      Rails.logger.info exception.to_s
      Rails.logger.info exception.backtrace.join("\n")
    end

    def authenticate_user_using_x_auth_token
      user_phone_number = request.headers["X-Auth-Phone"]
      auth_token = request.headers["X-Auth-Token"].presence

      user = user_phone_number && User.find_for_database_authentication(phone_number: user_phone_number)
      if user && Devise.secure_compare(user.authentication_token, auth_token)
        sign_in user, store: false
      else
        respond_with_error("Could not authenticate with the provided credentials", 401)
      end
    end
end
