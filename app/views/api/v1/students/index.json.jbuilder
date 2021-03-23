# frozen_string_literal: true

json.students @organization.students do |student|
  json.name student.name
  json.first_name student.first_name
  json.last_name student.last_name
  json.phone_number student.phone_number
  json.id student.id
  json.joined_on student.created_at
  json.status student.status
end