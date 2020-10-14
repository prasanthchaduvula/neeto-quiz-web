# frozen_string_literal: true

class Msg91MessageService
  def send_otp(phone_number)
    url = URI("https://api.msg91.com/api/v5/otp?authkey=344320ADzUdaWyKVf5f8684dbP1&template_id=5f868692317bbf40b878216c&mobile=#{phone_number}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    JSON.parse(response.body)
  end

  def verify_otp(phone_number, otp)
    url = URI("https://api.msg91.com/api/v5/otp/verify?mobile=#{phone_number}&otp=#{otp}&authkey=344320ADzUdaWyKVf5f8684dbP1")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Post.new(url)
    reqres = http.request(request)
    JSON.parse(reqres.body)
  end
end