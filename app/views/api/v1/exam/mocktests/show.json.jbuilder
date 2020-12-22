# frozen_string_literal: true

json.isCreator @mocktest.user == current_user
json.isStudent @mocktest.student_ids.include?(current_user.id)
json.isAttempt @attempt.present?
json.isMember @mocktest.user == current_user || @mocktest.student_ids.include?(current_user.id)

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
end

if @mocktest.user == current_user

  json.creator do
    json.id @mocktest.user.id
    json.name @mocktest.user.name
    json.payment_details @mocktest.user.payment_details.present?
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
    json.attempter_name @attempt.user.name
    json.correct_answers_count @attempt.correct_answers_count
    json.incorrect_answers_count @attempt.incorrect_answers_count
    json.unattempted_questions_count @attempt.unattempted_questions_count
  end

  json.questions @mocktest.questions.map do |question|
    json.id question.id
    json.description question.description
    json.options question.options.map do |option|
      json.id option.id
      json.name option.name
      json.is_correct option.is_correct
      json.is_selected @attempt.selected_option(question.id, option.id) ? true : false
    end
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