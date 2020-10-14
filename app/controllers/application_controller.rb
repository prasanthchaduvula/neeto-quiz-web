# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  before_action :set_layout_carrier
  # before_action :set_honeybadger_context

  private

    def set_layout_carrier
      @layout_carrier = LayoutCarrier.new
    end

  # def set_honeybadger_context
  #   hash = { uuid: request.uuid }
  #   hash.merge!(user_id: current_user.id, user_email: current_user.email) if current_user
  #   Honeybadger.context hash
  # end
end
