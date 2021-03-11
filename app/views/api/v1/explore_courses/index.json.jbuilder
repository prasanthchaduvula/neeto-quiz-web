# frozen_string_literal: true

json.courses @courses.map do |course|
  json.course do
    json.id course.id
    json.name course.name
    json.description course.description
    json.price course.price.to_i
    json.published course.published
    json.invitation_code course.invitation_code
    json.isMember current_user.course_member?(course)
  end

  json.creator do
    json.id course.user.id
    json.name course.user.name
  end

  json.chapters course.chapters.map do |chapter|
    json.chapter chapter
    json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file_url) }
  end
end