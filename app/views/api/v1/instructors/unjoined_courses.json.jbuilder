# frozen_string_literal: true


json.courses @courses.map do |course|
  unless @instructor.can_manage_course?(course)
    json.course do
      json.id course.id
      json.name course.name
      json.description course.description
      json.price course.price.to_i
      json.published course.published
      json.invitation_code course.invitation_code
    end
  end
end
