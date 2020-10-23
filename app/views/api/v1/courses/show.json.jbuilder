# frozen_string_literal: true

json.course @course
json.chapters @course.chapters.includes(:lessons).map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons
end