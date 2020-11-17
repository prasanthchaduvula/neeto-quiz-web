# frozen_string_literal: true

json.isCreator @course.user == current_user
json.isStudent @course.joined_student_ids.include?(current_user.id)
json.isMember @course.user == current_user || @course.joined_student_ids.include?(current_user.id)

json.course @course
json.user @course.user

json.chapters @course.chapters.map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file_url) }
end

json.students @course.joined_students.map do |student|
  json.name student.name
  json.phone_number student.phone_number
  json.id student.id
end
