# frozen_string_literal: true

json.isCreator current_user.can_manage_mocktest?(@mocktest)

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
end

json.attempts @attempts.map do |attempt|
  json.id attempt.id
  json.attempter_name attempt.user.name
  json.correct_answers_count attempt.correct_answers_count
  json.incorrect_answers_count attempt.incorrect_answers_count
  json.unattempted_questions_count attempt.unattempted_questions_count
  json.percentile attempt.percentile.round(2)
  json.total_questions_count @mocktest.questions.count
end
