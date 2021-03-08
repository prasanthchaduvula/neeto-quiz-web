# frozen_string_literal: true

json.instructors @organization.instructors do |instructor|
  json.name instructor.name
  json.phone_number instructor.phone_number
  json.id instructor.id
  json.joined_on instructor.created_at
end