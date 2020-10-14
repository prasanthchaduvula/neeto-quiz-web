# frozen_string_literal: true

class Msg91MessageService
  def send_otp(phone_number)
    url = URI("https://api.msg91.com/api/v5/otp?authkey=344320ADzUdaWyKVf5f8684dbP1&template_id=5f868692317bbf40b878216c&mobile=#{phone_number}")

    send_response(url)
  end

  def verify_otp(phone_number, otp)
    url = URI("https://api.msg91.com/api/v5/otp/verify?mobile=#{phone_number}&otp=#{otp}&authkey=344320ADzUdaWyKVf5f8684dbP1")

    send_response(url)
  end

  def send_response(url)
    response = Typhoeus::Request.new(
      url,
    ).run
    JSON.parse(response.body)
  end
end