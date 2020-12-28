# frozen_string_literal: true

json.isMember @mocktest.user == current_user || @mocktest.student_ids.include?(current_user.id)

json.mocktest do
  json.id @mocktest.id
  json.name @mocktest.name
  json.price @mocktest.price.to_i
  json.is_published @mocktest.is_published
  json.invitation_code @mocktest.invitation_code
  json.total_questions @mocktest.questions.count
end
