# frozen_string_literal: true

module ApiResponders
  extend ActiveSupport::Concern

  def respond_with_error(message, status = 422, errors = nil)
    response = { error: message }
    response.merge({ errors: errors }) if errors.present?
    render json: response, status: status
  end

  def respond(message)
    render json: { notice: message }
  end

  def respond_success
    render json: {}, status: :ok
  end
end