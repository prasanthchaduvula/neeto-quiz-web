# frozen_string_literal: true

json.my_mocktests current_user.my_mocktests.map do |mocktest|
  json.mocktest do
    json.id mocktest.id
    json.name mocktest.name
    json.price mocktest.price.to_i
    json.is_published mocktest.is_published
    json.invitation_code mocktest.invitation_code
    json.isMember mocktest.user == current_user || mocktest.student_ids.include?(current_user.id)
  end

  json.creator do
    json.id mocktest.user.id
    json.name mocktest.user.name
  end
end

json.created_mocktests current_user.mocktests.map do |mocktest|
  json.mocktest do
    json.id mocktest.id
    json.name mocktest.name
    json.price mocktest.price.to_i
    json.is_published mocktest.is_published
    json.invitation_code mocktest.invitation_code
    json.isMember mocktest.user == current_user || mocktest.student_ids.include?(current_user.id)
  end

  json.creator do
    json.id mocktest.user.id
    json.name mocktest.user.name
  end
end

json.joined_mocktests current_user.joined_mocktests.map do |mocktest|
  json.mocktest do
    json.id mocktest.id
    json.name mocktest.name
    json.price mocktest.price.to_i
    json.is_published mocktest.is_published
    json.invitation_code mocktest.invitation_code
    json.isMember mocktest.user == current_user || mocktest.student_ids.include?(current_user.id)
  end

  json.creator do
    json.id mocktest.user.id
    json.name mocktest.user.name
  end
end
