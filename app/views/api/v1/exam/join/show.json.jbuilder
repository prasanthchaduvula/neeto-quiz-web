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
