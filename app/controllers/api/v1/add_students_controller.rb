# frozen_string_literal: true

class Api::V1::AddStudentsController < Api::V1::BaseController
  before_action :find_course, only: :create
  before_action :ensure_course_admin, only: :create
  before_action :load_student, only: :create


  def create
    if @user.nil? || params[:paid] == false
      send_invitation
    elsif ensure_not_course_student
      add_student
    else
      already_course_student
    end
  end

  private

    def load_student
      @user = User.find_by(phone_number: params[:phone_number])
    end

    def ensure_course_admin
      if current_user != @course.user
        render json: { notice: "You are not the creator of course" }, status: :unprocessable_entity
      end
    end

    def ensure_not_course_student
      current_user != @user && @course.joined_student_ids.exclude?(@user.id)
    end

    def add_student
      AddStudentService.new(current_user, @course, @user, params[:phone_number]).add_student
      render json: { notice: "Added student to course successfully", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def already_course_student
      render json: { notice: "This student is already a member of course", course: @course, joined_students: @course.joined_students }, status: :ok
    end

    def send_invitation
      AddStudentService.new(current_user, @course, @user, params[:phone_number]).send_invitation
      render json: { notice: "Invitation send successfully" }, status: :ok
    end
end