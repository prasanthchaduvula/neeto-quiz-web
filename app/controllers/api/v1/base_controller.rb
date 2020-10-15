# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :authenticate_user!

  respond_to :json

  rescue_from Exception, with: :handle_api_exceptions

  private

    def handle_api_exceptions(exception)
      log_exception exception

      error_message = "Something went wrong. Please try again later."
      respond_with_error(error_message, 500)
    end

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
    # def find_quiz
    #   @quiz = Quiz.find(params[:quiz_id] || params[:id])
    # rescue ActiveRecord::RecordNotFound
    #   render status: :not_found, json:{errors: ["Quiz not found"]}
    # end

    def find_course
      @course = Course.find_by_id(params[:course_id] || params[:id])
    end
end
