# frozen_string_literal: true

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
  json.is_explored @mocktest.is_explored
  json.isCreator current_user.can_manage_mocktest?(@mocktest)
  json.isStudent @mocktest.student?(current_user.id)
  json.isAttempt @attempt.present?

  if current_user.can_manage_mocktest?(@mocktest)
    json.creator do
      json.id @mocktest.user.id
      json.name @mocktest.user.name
      json.payment_details current_user.organization.payment_details.present?
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

    json.students @mocktest.students.map do |student|
      json.name student.name
      json.phone_number student.phone_number
      json.id student.id
    end
  elsif @attempt.present?
    json.attempt do
      json.id @attempt.id
    end
  else
    json.questions @mocktest.questions.map do |question|
      json.id question.id
      json.description question.description
      json.options question.options.map do |option|
        json.id option.id
        json.name option.name
      end
    end
  end
end
