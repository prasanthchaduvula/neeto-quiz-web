# frozen_string_literal: true

json.isCreator @course.user == current_user
json.isStudent @course.joined_student_ids.include?(current_user.id)
json.isMember @course.user == current_user || @course.joined_student_ids.include?(current_user.id)

json.course do
  json.id @course.id
  json.name @course.name
  json.description @course.description
  json.price @course.price.to_i
  json.published @course.published
  json.invitation_code @course.invitation_code
  json.is_explored @course.is_explored
end
json.creator do
  json.id @course.user.id
  json.first_name @course.user.first_name
  json.last_name @course.user.last_name
  json.name @course.user.name
  json.phone_number @course.user.phone_number
  json.payment_details @course.user.payment_details.present?
end

json.chapters @course.chapters.map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file_url) }
end

json.students @course.joined_students.map do |student|
  json.name student.name
  json.phone_number student.phone_number
  json.id student.id
end
