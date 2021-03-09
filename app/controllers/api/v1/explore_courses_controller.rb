# frozen_string_literal: true

class Api::V1::ExploreCoursesController < Api::V1::BaseController
  before_action :load_course, only: [:update]
  before_action :ensure_course_admin, only: [:update]
  before_action :ensure_course_is_published, only: [:update]

  def index
    @courses = current_user.organization.marketplace_courses
    respond_to do |format|
      format.json
    end
  end

  def update
    @course.update!(course_params)
    render json: { notice: "Course Added to explore section successfully", course: @course }, status: :ok
  end

  private

    def course_params
      params.require(:course).permit(:is_explored)
    end

    def load_course
      @course = Course.find_by!(id: params[:id])
    end

    def ensure_course_is_published
      unless @course.published
        render json: { error: "Make sure that course is published" }, status: :unprocessable_entity
      end
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { error: "You are not the creator of course" }, status: :bad_request
      end
    end
end