# frozen_string_literal: true

json.course @course
json.chapters @course.chapters.map do |chapter|
  json.chapter chapter
  json.lessons chapter.lessons.includes([:file_attachment]).map { |l| l.attributes.merge(file: l.file.present? && Rails.application.routes.url_helpers.polymorphic_path(l.file)) }
end