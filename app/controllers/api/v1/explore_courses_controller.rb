# frozen_string_literal: true

class Api::V1::ExploreCoursesController < Api::V1::BaseController
  before_action :find_course, only: [:update]
  before_action :ensure_course_is_published, only: [:update]

  def index
    @courses = Course.where(published: true, is_explored: true)
    respond_to do |format|
      format.json
    end
  end

  def update
    if @course.update(course_params)
      render status: :ok, json: { notice: "Course Added to explore section successfully", course: @course, chapters: @course.chapters, joined_students: @course.joined_students }
    else
      render status: :unprocessable_entity, json: { errors: course.errors.full_messages }
    end
  end

  private
    def course_params
      params.require(:course).permit(:is_explored)
    end

    def ensure_course_is_published
      unless @course.published
        render status: :unprocessable_entity, json: { error: "Make sure that course is published" }
      end
    end
end