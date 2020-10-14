# frozen_string_literal: true

class Msg91MessageService
  def send_sms(to_number)
    require 'send_otp'
    sendotp = SendOtp::Otp.new('344320ADzUdaWyKVf5f8684dbP1')
    sendotp.send_otp(to_number, "NITROA")
  end
end