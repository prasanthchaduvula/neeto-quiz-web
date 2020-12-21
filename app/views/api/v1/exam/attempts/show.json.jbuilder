# frozen_string_literal: true

json.isCreator @mocktest.user == current_user
json.isStudent @mocktest.student_ids.include?(current_user.id)

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
    json.is_selected @attempt.selected_option(question.id, option.id) ? true : false
  end
end

json.attempt do
  json.id @attempt.id
  json.attempter_name @attempt.user.name
  json.correct_answers_count @attempt.correct_answers_count
  json.incorrect_answers_count @attempt.incorrect_answers_count
  json.unattempted_questions_count @attempt.unattempted_questions_count
end
