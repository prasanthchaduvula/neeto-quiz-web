# frozen_string_literal: true

# TDOD: plese go with json builder
class CourseViewService
  def initialize(course)
    @course = course
  end

  def course_view
    {
      "course" => @course,
      "chapters" => @course.chapters.includes(:lessons).map do |chapter|
        {
          "chapter" => chapter,
          "lessons" => chapter.lessons.map { |l| l.attributes.merge(file: l.file.present? && Rails.application.routes.url_helpers.polymorphic_path(l.file)) }
        }
      end
    }
  end
end
