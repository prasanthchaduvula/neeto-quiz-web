# frozen_string_literal: true

class Api::V1::CourseStudentsController < Api::V1::BaseController
  before_action :find_course, only: :create

  def create
    if ensure_not_course_student
      @course.course_students.create!(user: current_user)
      render json: { notice: "Joined course successfully", course: @course, joined_students: @course.joined_students }, status: :ok
    else
      render json: { notice: "You are already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
    end
  end


  private

    def ensure_not_course_student
      current_user != @course.user && @course.joined_student_ids.exclude?(current_user.id)
    end
end