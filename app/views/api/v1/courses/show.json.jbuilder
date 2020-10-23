# frozen_string_literal: true

json.course @course
<<<<<<< HEAD
json.chapters @course.chapters.map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file.present? && Rails.application.routes.url_helpers.polymorphic_path(l.file)) }
=======
json.chapters @course.chapters.includes(:lessons).map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons
>>>>>>> Removed course view service and updated with jbuilder
endjson.students @course.joined_students.map do |student|
  json.name student.name
  json.phone_number student.phone_number
  json.id student.id
  
end
