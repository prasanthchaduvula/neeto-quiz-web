# frozen_string_literal: true

json.student do
  json.name @student.name
  json.first_name @student.first_name
  json.last_name @student.last_name
  json.phone_number @student.phone_number
  json.id @student.id
  json.joined_on @student.created_at
  json.role @student.role

  json.courses @student.my_courses.map do |course|
    json.course do
      json.id course.id
      json.name course.name
    end
  end

  json.mocktests @student.my_mocktests.map do |mocktest|
    json.mocktest do
      json.id mocktest.id
      json.name mocktest.name
    end
  end
end