# frozen_string_literal: true

class Api::V1::AddStudentsController < Api::V1::BaseController
  before_action :load_course, only: :create
  before_action :ensure_can_manage_course, only: :create
  before_action :ensure_course_published, only: :create
  before_action :load_user, only: :create
  before_action :ensure_not_course_student, only: :create


  def create
    if params[:is_paid] == false
      send_invitation
    else
      add_student
    end
  end

  private

    def load_course
      @course = Course.find_by!(id: params[:course_id])
    end

    def load_user
      @user = User.find_by(phone_number: params[:phone_number], organization_id: current_user.organization_id)
      if @user.nil?
        create_user
      end
    end

    def ensure_can_manage_course
      unless current_user.can_manage_course?(@course)
        render json: { error: "Should be the admin or instructor of the organization" }, status: :unprocessable_entity
      end
    end

    def ensure_not_course_student
      if current_user == @user || @user.instructor? || @course.student?(@user.id)
        already_course_student
      end
    end

    def add_student
      AddCourseStudentService.new(@course, @user, params[:phone_number]).add_student
      render json: { notice: "Added student to course successfully", course: @course, joined_students: @course.students }, status: :ok
    end

    def already_course_student
      render json: { notice: "This student is already a member of course", course: @course, joined_students: @course.students }, status: :ok
    end

    def send_invitation
      AddCourseStudentService.new(@course, @user, params[:phone_number]).send_invitation
      render json: { notice: "Invitation sent successfully" }, status: :ok
    end

    def create_user
      @user = User.create!(phone_number: params[:phone_number], organization_id: current_user.organization_id, role: "student")
    end

    def ensure_course_published
      unless @course.published
        render json: { error: "You cannot add students without publishing course" }, status: :unprocessable_entity
      end
    end
end