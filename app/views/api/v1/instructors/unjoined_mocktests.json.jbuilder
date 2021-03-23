# frozen_string_literal: true

json.mocktests @mocktests.map do |mocktest|
  unless @instructor.can_manage_mocktest?(mocktest)
    json.mocktest do
      json.id mocktest.id
      json.name mocktest.name
      json.price mocktest.price.to_i
      json.is_published mocktest.is_published
      json.invitation_code mocktest.invitation_code
    end
  end
end