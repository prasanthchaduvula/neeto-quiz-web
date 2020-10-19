# frozen_string_literal: true

module ApiException
  extend ActiveSupport::Concern

  included do
    protect_from_forgery with: :exception

    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActionController::ParameterMissing, with: :handle_api_error

    def handle_validation_error(exception)
      render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def handle_record_not_found(exception)
      render json: { errors: exception.message }, status: :not_found
    end

    def handle_api_error(exception)
      render json: { error: exception.message }, status: :internal_server_error
    end
  end
end
