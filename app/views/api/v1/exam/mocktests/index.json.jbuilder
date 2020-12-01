# frozen_string_literal: true

json.created_mocktests current_user.mocktests.map do |mocktest|
  json.mocktest do
    json.id mocktest.id
    json.name mocktest.name
    json.price mocktest.price.to_i
    json.is_published mocktest.is_published
    json.invitation_code mocktest.invitation_code
    json.isMember mocktest.user == current_user
  end

  json.creator do
    json.id mocktest.user.id
    json.name mocktest.user.name
  end
end
