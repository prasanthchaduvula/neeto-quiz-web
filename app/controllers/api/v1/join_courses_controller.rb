# frozen_string_literal: true

class Api::V1::JoinCoursesController < Api::V1::BaseController
  before_action :load_course_with_invitation_code, only: :show
  before_action :load_course, only: :create
  before_action :ensure_organization_member
  before_action :ensure_course_is_published
  before_action :ensure_not_course_student

  def show
    render template: "api/v1/courses/preview"
  end

  def create
    add_student
  end

  private

    def load_course_with_invitation_code
      @course = Course.find_by!(invitation_code: params[:invitation_code])
    end

    def load_course
      @course = Course.find_by!(id: params[:course_id])
    end

    def ensure_organization_member
      if current_user.organization.subdomain != @course.user.organization.subdomain
        render json: { error: "You are not the member of organization where this course belongs to" }, status: :unprocessable_entity
      end
    end

    def ensure_course_is_published
      unless @course.published
        render json: { error: "Course is not yet published by the course creator" }, status: :unprocessable_entity
      end
    end

    def ensure_not_course_student
      if current_user.course_member?(@course)
        render json: { notice: "You are already a member of course", course: @course, joined_students: @course.students }, status: :ok
      end
    end

    def add_student
      AddCourseStudentService.new(@course, current_user, current_user.phone_number).add_student
      render json: { notice: "Joined course successfully", course: @course, joined_students: @course.students }, status: :ok
    end
end