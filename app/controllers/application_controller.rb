# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include ApiException
  include ApiResponders

  protect_from_forgery with: :null_session
  before_action :set_layout_carrier
  before_action :set_honeybadger_context
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

    def set_layout_carrier
      @layout_carrier = LayoutCarrier.new
    end

    def set_honeybadger_context
      hash = { uuid: request.uuid }
      hash.merge!(user_id: current_user.id, user_phone_number: current_user.phone_number) if current_user
      Honeybadger.context hash
    end

    def record_not_found
      render status: :not_found, json: { errors: I18n.t(["not_found"]) }
    end
end
