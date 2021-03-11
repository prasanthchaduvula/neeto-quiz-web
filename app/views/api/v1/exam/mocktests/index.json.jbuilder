# frozen_string_literal: true

json.mocktests current_user.my_mocktests.map do |mocktest|
  json.mocktest do
    json.id mocktest.id
    json.name mocktest.name
    json.price mocktest.price.to_i
    json.is_published mocktest.is_published
    json.invitation_code mocktest.invitation_code
    json.isMember current_user.mocktest_member?(mocktest)
  end

  json.creator do
    json.id mocktest.user.id
    json.name mocktest.user.name
  end
end