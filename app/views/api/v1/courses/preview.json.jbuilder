# frozen_string_literal: true

json.course do
  json.id @course.id
  json.name @course.name
  json.description @course.description
end

json.creator do
  json.name @course.user.name
end

if @course.user == current_user
  json.chapters @course.chapters_with_lessons.map do |chapter|
    json.chapter chapter
    json.lessons chapter.lessons
  end

  json.lessons @course.lessons
else
  json.chapters @course.published_chapters.map do |chapter|
    json.chapter chapter
    json.lessons chapter.lessons.select { |lesson| lesson.is_published }
  end

  json.lessons @course.lessons.published
end