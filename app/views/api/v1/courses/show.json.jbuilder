# frozen_string_literal: true

json.course @course
json.user @course.user
json.chapters @course.chapters.map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file.present? && Rails.application.routes.url_helpers.polymorphic_path(l.file)) }
end
json.students @course.joined_students.map do |student|
  json.name student.name
  json.phone_number student.phone_number
  json.id student.id

end
