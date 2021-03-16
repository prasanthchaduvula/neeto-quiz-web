# frozen_string_literal: true

json.instructor do
  json.name @instructor.name
  json.first_name @instructor.first_name
  json.last_name @instructor.last_name
  json.phone_number @instructor.phone_number
  json.id @instructor.id
  json.joined_on @instructor.created_at
  json.role @instructor.role

  json.courses @instructor.my_courses.map do |course|
    json.course do
      json.id course.id
      json.name course.name
    end
  end

  json.mocktests @instructor.my_mocktests.map do |mocktest|
    json.mocktest do
      json.id mocktest.id
      json.name mocktest.name
    end
  end
end