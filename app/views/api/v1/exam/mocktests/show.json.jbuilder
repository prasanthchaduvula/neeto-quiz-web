# frozen_string_literal: true

json.isCreator @mocktest.user == current_user

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
end

json.questions @mocktest.questions.map do |question|
  json.id question.id
  json.description question.description

  json.options question.options.map do |option|
    json.id option.id
    json.name option.name
    json.is_correct option.is_correct
  end
end

json.creator do
  json.id @mocktest.user.id
  json.name @mocktest.user.name
  json.payment_details @mocktest.user.payment_details.present?
end