# frozen_string_literal: true

json.isMember @mocktest.user == current_user || @mocktest.student_ids.include?(current_user.id)

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
  json.total_questions_count @mocktest.questions.count
end

json.questions @mocktest.questions.map do |question|
  json.id question.id
  json.description question.description
  json.is_correct @attempt.correct_answer(question.id)
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
  json.percentile @attempt.percentile.round(2)
end
