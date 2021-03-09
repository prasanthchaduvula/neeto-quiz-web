# frozen_string_literal: true


json.courses current_user.my_courses.map do |course|
  json.course do
    json.id course.id
    json.name course.name
    json.description course.description
    json.price course.price.to_i
    json.published course.published
    json.invitation_code course.invitation_code
  end

  json.creator do
    json.id course.user.id
    json.name course.user.name
  end
end
