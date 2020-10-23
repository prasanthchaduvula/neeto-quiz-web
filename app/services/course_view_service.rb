# frozen_string_literal: true

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
          "lessons" => chapter.lessons
        }
      end
    }
  end
end