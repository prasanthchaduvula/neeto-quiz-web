# frozen_string_literal: true

json.my_courses current_user.my_courses.map do |course|
  json.course do
    json.id course.id
    json.name course.name
    json.description course.description
    json.price course.price.to_i
    json.published course.published
    json.invitation_code course.invitation_code
    json.isMember course.user == current_user || course.joined_student_ids.include?(current_user.id)
  end

  json.creator do
    json.id course.user.id
    json.name course.user.name
  end
end

json.courses_created current_user.courses.map do |course|
  json.course do
    json.id course.id
    json.name course.name
    json.description course.description
    json.price course.price.to_i
    json.published course.published
    json.invitation_code course.invitation_code
    json.isMember course.user == current_user || course.joined_student_ids.include?(current_user.id)
  end

  json.creator do
    json.id course.user.id
    json.name course.user.name
  end
end


json.courses_joined current_user.joined_courses.map do |course|
  json.course do
    json.id course.id
    json.name course.name
    json.description course.description
    json.price course.price.to_i
    json.published course.published
    json.invitation_code course.invitation_code
    json.isMember course.user == current_user || course.joined_student_ids.include?(current_user.id)
  end

  json.creator do
    json.id course.user.id
    json.name course.user.name
  end
end

