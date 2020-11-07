# frozen_string_literal: true

class Api::V1::JoinCoursesController < Api::V1::BaseController
  before_action :load_course
  before_action :ensure_not_course_admin
  before_action :ensure_not_course_student

  def show
    render template: "api/v1/courses/show"
  end

  private

    def load_course
      @course = Course.find_by!(invitation_code: params[:invitation_code])
    end

    def ensure_not_course_admin
      if current_user == @course.user
        already_course_member
      end
    end

    def ensure_not_course_student
      if @course.joined_student_ids.include?(current_user.id)
        already_course_member
      end
    end

    def already_course_member
      render json: { notice: "You are already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
    end
end