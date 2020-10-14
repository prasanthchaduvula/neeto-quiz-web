# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController
  def send_otp
    Msg91MessageService.new.send_sms(params[:user][:phone_number])
  end
end


